import { Id } from 'react-toastify';
"use server"
import { Messages, User, UserImages } from "@prisma/client";
import prisma from '@/lib/prisma'
import { GetChatByIdResponse } from "@/services/actions/chat/type";
import { IBaseDataResponse, IBaseDatasResponse, ResponseStatus } from '@/types/baseType';
import { join } from "path";
import { promises as fs } from "fs";
import { UserStats } from '@/services/actions/userService';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf", "image/webp", "video/mp4"];


export const createUserService = async ({ data }: { data: Omit<User, 'Id'> }): Promise<IBaseDataResponse<User>> => {

  data.IsActive = true;
  data.IsDeleted = false;
  data.IsVerify = true;
  data.CreatedAt = new Date();
  data.UpdatedAt = new Date();

  const res = await prisma.user.create({
    data: data
  })
  return {
    data: res,
    message: "User created successfully",
    status: ResponseStatus.Ok
  };
}
export const updateUserService = async ({ data }: { data: User }): Promise<IBaseDataResponse<User>> => {
  const res = await prisma.user.update({
    where: {
      Id: data.Id
    },
    data: {
      ...data,
      UpdatedAt: new Date()
    }
  })
  return {
    data: res,
    message: "User updated successfully",
    status: ResponseStatus.Ok
  };
}

export interface UploadPayload {
  userId: string;
  images: {
    file: string; // Base64 string
    isProfile: boolean;
    isSpecial: boolean;
    fileName: string;
    fileType: string;
  }[];
}
export interface FileData {
  file: File;
  isProfile: boolean;
  isSpecial: boolean;
}

export async function UploadStoredFile(formData: FormData): Promise<IBaseDatasResponse<UserImages>> {
  try {
    // 1. FormData'yı parse etme
    const userId = formData.get("userId");
    const entries = Array.from(formData.entries());

    // 2. Temel Validasyonlar
    if (!userId) {
      return { data: [], message: "Kullanıcı ID'si eksik", status: ResponseStatus.Error };
    }

    // 3. Kullanıcı Kontrolü
    const userExists = await prisma.user.findUnique({
      where: { Id: Number(userId) },
      select: { Id: true },
    });

    if (!userExists) {
      return { data: [], message: "Kullanıcı bulunamadı", status: ResponseStatus.Error };
    }

    // 4. Dosyaları Gruplama
    const imageEntries = entries.filter(([key]) => key.startsWith("images["));
    const imageIndexes = Array.from(new Set(
      imageEntries.map(([key]) => key.match(/\[(\d+)\]/)?.[1])
    )).filter(Boolean);

    // 5. Dosya Validasyon ve İşleme
    // Ana dizindeki (fanly.fun) public/uploads klasörüne kaydetmek için tam path belirtin.
    // Örneğin, ana dizinin tam path'ini bir environment variable olarak .env dosyanıza ekleyin:
    // MAIN_APP_PUBLIC_PATH=/var/www/fanly.fun/public
    // Sonra burada kullanın:
    const uploadDir = process.env.MAIN_APP_PUBLIC_PATH
      ? join(process.env.MAIN_APP_PUBLIC_PATH, "uploads")
      : join(process.cwd(), "public", "uploads"); // fallback: local public/uploads

    await fs.mkdir(uploadDir, { recursive: true });

    const savedFiles: UserImages[] = [];
    const validationErrors: string[] = [];

    for (const index of imageIndexes) {
      try {
        const file = formData.get(`images[${index}].file`) as File;
        const isProfile = formData.get(`images[${index}].isProfile`) === "true";
        const isSpecial = formData.get(`images[${index}].isSpecial`) === "true";

        // Validasyonlar
        if (!file) {
          validationErrors.push(`Dosya ${index} seçilmedi`);
          continue;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          validationErrors.push(`Geçersiz dosya türü: ${file.name}`);
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          validationErrors.push(`Dosya boyutu aşıldı: ${file.name}`);
          continue;
        }

        // Dosya İşlemleri
        const safeFileName = file.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9._-]/g, "")
          .toLowerCase();

        const uniqueFileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}-${safeFileName}`;

        const filePath = join(uploadDir, uniqueFileName);
        const bytes = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(bytes));

        // Database Kaydı
        if (isProfile) {
          await prisma.user.update({
            where: { Id: Number(userId) },
            data: { ProfileImage: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/uploads/${uniqueFileName}` },
          });

        }

        const storedFile = await prisma.userImages.create({
          data: {
            ImageUrl: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/uploads/${uniqueFileName}`,
            IsProfile: isProfile,
            IsSpecial: isSpecial,
            ThumbImageUrl: uniqueFileName,
            UserId: Number(userId),
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            IsActive: true,
            IsDeleted: false,
            isSecureImage: false,
            SpecialUrl: "",
          },
        });

        savedFiles.push(storedFile);
      } catch (error) {
        console.error(`Dosya ${index} işleme hatası:`, error);
        validationErrors.push(`Dosya ${index} işlenemedi`);
      }
    }

    // 6. Hata Kontrolleri
    if (validationErrors.length > 0) {
      return {
        data: savedFiles,
        message: `Bazı dosyalar yüklenemedi: ${validationErrors.join(", ")}`,
        status: savedFiles.length > 0 ? ResponseStatus.Ok : ResponseStatus.Error,
      };
    }

    return {
      data: savedFiles,
      message: `${savedFiles.length} dosya başarıyla yüklendi`,
      status: ResponseStatus.Ok,
    };

  } catch (error) {
    console.error("Genel yükleme hatası:", error);
    return {
      data: [],
      message: "Dosya yükleme sırasında beklenmeyen bir hata oluştu" + error,
      status: ResponseStatus.Error,
    };
  }
}

export async function getAllUser(): Promise<IBaseDatasResponse<User>> {
  const users = await prisma.user.findMany({
    where: {
      IsActive: true,
      IsDeleted: false
    },
    orderBy: {
      CreatedAt: "desc"
    }
  })
  return {
    data: users,
    message: "Kullanıcılar başarıyla alındı",
    status: ResponseStatus.Ok
  }
}

export async function DeleteUser({ id }: { id: number }): Promise<IBaseDataResponse<User>> {
  const user = await prisma.user.findUnique({
    where: {
      Id: id
    },
    include: {
      UserImages: true
    }
  })
  if (!user) {
    return {
      data: {} as User,
      message: "Kullanıcı bulunamadı",
      status: ResponseStatus.Error
    };
  }
  const res = await prisma.user.delete({
    where: {
      Id: id
    }
  });

  return {
    data: res,
    message: "Kullanıcı başarıyla silindi",
    status: ResponseStatus.Ok
  }
}
export interface UserWithImages extends User {
  UserImages?: UserImages[]; // veya uygun image type'ı ile değiştirin
}
export async function getUserById(id: number): Promise<IBaseDataResponse<UserWithImages>> {
  const user = await prisma.user.findUnique({
    where: {
      Id: id
    },
    include: {
      UserImages: {
        where: {
          IsActive: true,
          IsDeleted: false
        }
      }
    }
  });

  if (!user) {
    return {
      data: {} as UserWithImages,
      message: "Kullanıcı bulunamadı",
      status: ResponseStatus.Error
    };
  }

  return {
    data: user,
    message: "Kullanıcı başarıyla alındı",
    status: ResponseStatus.Ok
  };
}

export async function DeleteUserImage({ id }: { id: number }): Promise<IBaseDataResponse<UserImages>> {
  const res = await prisma.userImages.delete({
    where: {
      Id: id
    }
  })
  return {
    data: res,
    message: "Kullanıcı resmi başarıyla silindi",
    status: ResponseStatus.Ok
  }
}

// Belirli bir resmi profil resmi olarak ayarlama
export async function SetProfileUserImage({ imageId }: { imageId: number }): Promise<IBaseDataResponse<UserImages>> {
  try {
    const image = await prisma.userImages.findUnique({ where: { Id: imageId } });
    if (!image) {
      return { data: {} as UserImages, message: "Resim bulunamadı", status: ResponseStatus.Error };
    }

    const userId = image.UserId;

    const updatedImage = await prisma.$transaction(async (tx) => {
      // Tüm diğer profil resimlerini sıfırla
      await tx.userImages.updateMany({ where: { UserId: userId, IsProfile: true }, data: { IsProfile: false } });
      // Seçilen resmi profil yap
      const newProfile = await tx.userImages.update({ where: { Id: imageId }, data: { IsProfile: true } });
      // User tablosuna yaz
      await tx.user.update({ where: { Id: userId }, data: { ProfileImage: newProfile.ImageUrl, UpdatedAt: new Date() } });
      return newProfile;
    });

    return { data: updatedImage, message: "Profil resmi güncellendi", status: ResponseStatus.Ok };
  } catch (e) {
    console.error(e);
    return { data: {} as UserImages, message: "Profil resmi güncellenemedi", status: ResponseStatus.Error };
  }
}

// Özel (special) resim atama / kaldırma
export async function ToggleSpecialUserImage({ imageId, isSpecial }: { imageId: number, isSpecial: boolean }): Promise<IBaseDataResponse<UserImages>> {
  try {
    const updated = await prisma.userImages.update({
      where: { Id: imageId },
      data: { IsSpecial: isSpecial, UpdatedAt: new Date() }
    });
    return { data: updated, message: "Special durum güncellendi", status: ResponseStatus.Ok };
  } catch (e) {
    console.error(e);
    return { data: {} as UserImages, message: "Special durum güncellenemedi", status: ResponseStatus.Error };
  }
}

export const fetchUserStats = async (): Promise<UserStats> => {
  try {
    const [
      total,
      real,
      fake,
      premium,
      online,
      verified
    ] = await Promise.all([
      // Total users (not deleted)
      prisma.user.count({
        where: {
          IsDeleted: false,
        },
      }),
      // Real users (UserType = 1)
      prisma.user.count({
        where: {
          IsDeleted: false,
          UserType: 2,
        },
      }),
      // Fake users (UserType = 2)
      prisma.user.count({
        where: {
          IsDeleted: false,
          UserType: 4,
        },
      }),
      // Premium users (have coins > 0)
      prisma.user.count({
        where: {
          IsDeleted: false,
          Coin: {
            gt: 0,
          },
        },
      }),
      // Online users
      prisma.user.count({
        where: {
          IsDeleted: false,
          IsOnline: true,
        },
      }),
      // Verified users
      prisma.user.count({
        where: {
          IsDeleted: false,
          IsVerify: true,
        },
      }),
    ]);

    return {
      total,
      real,
      fake,
      premium,
      online,
      verified,
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}