import { Id } from 'react-toastify';
"use server"
import { Messages, User, UserImages } from "@prisma/client";
import prisma from '@/lib/prisma'
import { GetChatByIdResponse } from "@/services/actions/chat/type";
import { IBaseDataResponse, IBaseDatasResponse, ResponseStatus } from '@/types/baseType';
import { join } from "path";
import { promises as fs } from "fs";

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


interface UserImage {
  file: string; // Base64 string
  isProfile: boolean;
  isSpecial: boolean;
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
    const uploadDir = join(process.cwd(), "public", "uploads");
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
      message: "Dosya yükleme sırasında beklenmeyen bir hata oluştu",
      status: ResponseStatus.Error,
    };
  }
}