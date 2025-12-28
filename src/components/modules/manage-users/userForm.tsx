"use client"
import { createUserService, DeleteUserImage, updateUserService, UploadStoredFile, UserWithImages, SetProfileUserImage, ToggleSpecialUserImage } from '@/actions/userAction'
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import { bodyTypeItems, dayItems, ethnicityItems, genderItems, isSmokeItems, monthItems, relationshipItems, sexualOrientationItems, yearItems } from '@/constants/selectItemList'
import { useAppContext } from '@/context/AppContext'
import UserService from '@/services/actions/userService'
import { CreateUserRequest, CreateUserResponse } from '@/services/actions/userService/type'
import { ResponseStatus } from '@/types/baseType'
import { Button, Checkbox, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { User, UserImages } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'react-toastify'
interface ImageType {
  isProfile: boolean,
  isSpecial: boolean,
  file: File
}

const UserForm = ({ user }: { user: UserWithImages }) => {
  const router = useRouter();
  const { loading, setLoading } = useAppContext();
  const [imageList, setImageList] = useState<ImageType[]>()
  const [userImages, setUserImages] = useState<UserImages[]>(user.UserImages ?? [])
  const [addedUser, setAddedUser] = useState<User>()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>(
    {
      defaultValues: user
    }
  )

  const onSubmit: SubmitHandler<UserWithImages> = async (data) => {
    setLoading(true);
    data.FullName = `${data.Name} ${data.LastName}`;
    data.UserType = 4;
    data.Gender = Number(data.Gender);
    data.MaritalStatus = Number(data.MaritalStatus);
    data.SexualOrientation = Number(data.SexualOrientation);
    // Artık UserImages alanı data'da mevcut
    delete data.UserImages;
    const res = await updateUserService({ data });
    if (res.status == ResponseStatus.Ok) {
      toast.success('User added successfully');
      setLoading(false);
      setAddedUser(res.data);
      // router.push('/dashboard/manage-users/all-user')
    } else {
      toast.error('Adding user failed');
      setLoading(false);
    }
  }
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      const arrImage = Array.from(e.target.files);
      var images: ImageType[] = [];
      arrImage.map(x => {
        images.push({
          isProfile: false,
          isSpecial: false,
          file: x
        })
      });
      setImageList(images)
      setLoading(false);
    }
  };
  const handleCheckboxChange = (index: number, field: string, checked: boolean) => {
    if (imageList) {
      const updatedItems = [...imageList];
      const value = updatedItems[index][field as keyof ImageType];
      if (typeof value === "boolean") {
        updatedItems[index][field as keyof ImageType] = checked as any;
      }
      setImageList(updatedItems);
    }
  };
  const submitImage = async () => {
    if (addedUser) {
      setLoading(true);
      const formData = new FormData();

      // Kullanıcı ID'sini ekle
      formData.append("userId", addedUser.Id.toString());

      // Her resim için ayrı entry'ler
      imageList?.forEach((img, index) => {
        formData.append(`images[${index}].file`, img.file);
        formData.append(`images[${index}].isProfile`, img.isProfile.toString());
        formData.append(`images[${index}].isSpecial`, img.isSpecial.toString());
      });
      const res = await UploadStoredFile(formData);
      if (res.status == ResponseStatus.Ok) {
        setLoading(false);
        router.push('/dashboard/manage-users/all-user')
      }
      else {
        setLoading(false);
        toast.error("Image Added Error")
      }
    }
  }

  useEffect(() => {
    const generateRandomPassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let password = '';
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };

    setValue('Password', generateRandomPassword());
  }, [setValue])

  return (
    <div>
      <PageHeader title="EDIT USER" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS', url: '/dashboard/manage-users/all-user' },
        { title: 'EDIT USER' },
      ]} />
      <div className='w-full flex align-middle justify-center'>
        <div className='w-full max-w-3xl bg-white rounded-md shadow-md dark:bg-gray-800 p-5 mb-5'>
          {
            !addedUser && <form className='flex flex-col gap-5 mt-6' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex gap-2'>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  labelPlacement='outside'
                  {...register('Name', { required: "This is required" })}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  labelPlacement='outside'
                  {...register('LastName', { required: "This is required" })}
                />
              </div>
              <div className='flex gap-2'>
                <Input
                  label="User Name"
                  placeholder="Enter your User Name"
                  labelPlacement='outside'
                  {...register('UserName', { required: "This is required" })}
                />
                <Input
                  label="Job"
                  placeholder="Enter your job"
                  labelPlacement='outside'
                  {...register('Job')}
                />
              </div>
              <div className='flex gap-2'>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  labelPlacement='outside'
                  {...register('Email', { required: "This is required" })}
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  labelPlacement='outside'
                  {...register('PhoneNumber')}
                />
              </div>

              <Input
                label="Password"
                labelPlacement='outside'
                placeholder="Enter your password"
                {...register('Password')}
                type="text"
              />

              <div className='grid grid-cols-3 gap-3'>
                <Select
                  labelPlacement='outside'
                  label="Select Birth Day"
                  placeholder="Select Birth Day"
                  {...register('BirthDay')}
                >
                  {dayItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Birth Month"
                  placeholder="Select Birth Month"
                  {...register('BirthMonth')}
                >
                  {monthItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Birth Year"
                  placeholder="Select Birth Year"
                  {...register('BirthYear')}
                >
                  {yearItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Gender"
                  placeholder="Select Gender"
                  {...register('Gender')}
                >
                  {genderItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Sexual Orientation"
                  placeholder="Select Sexual Orientation"
                  {...register('SexualOrientation')}
                >
                  {sexualOrientationItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Ethnicity"
                  placeholder="Select Ethnicity"
                  {...register('Ethnicity')}
                >
                  {ethnicityItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Body Type"
                  placeholder="Select Body Type"
                  {...register('BodyType')}
                >
                  {bodyTypeItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Relationship"
                  placeholder="Select Relationship"
                  {...register('MaritalStatus')}
                >
                  {relationshipItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement='outside'
                  label="Select Relationship"
                  placeholder="Select Relationship"
                  {...register('MaritalStatus')}
                >
                  {isSmokeItems.map((item) => (
                    <SelectItem key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Textarea
                  {...register('About')}
                  labelPlacement='outside'
                  label="About"
                  placeholder="Enter your about"
                  className="max-w-full"
                />
              </div>
              <div>
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-md">
                    <ul>
                      {Object.entries(errors).map(([key, error]) => (
                        <li key={key}>{key} - {(error as any).message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className='flex justify-end'>
                <Button color="primary" variant='flat' disabled={loading} isLoading={loading} type='submit'>
                  Save
                </Button>
              </div>
            </form>
          }

          {
            addedUser && <div>
              <div className='border-b border-gray-300 mb-2'>
                <h2 className='font-bold'>Add User Images</h2>
              </div>
              <div>
                <div>
                  <input id="file"
                    multiple
                    disabled={loading}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} />
                </div>
                <div className='mt-2'>

                  {imageList &&
                    <div className='flex align-middle items-center justify-start gap-2'>
                      {imageList.map((x, i) => {
                        return <div key={i} className='border border-gray-200 rounded-lg p-1'>
                          <div className='h-20 overflow-hidden flex align-middle items-center justify-center'>
                            <Image
                              width={120}
                              src={URL.createObjectURL(x.file)}
                              alt='preview image'
                              className='mb-1'
                            />
                          </div>
                          <div className='flex flex-col gap-1'>
                            <div className='flex gap-1'>
                              <Checkbox radius="md" size='sm' isDisabled={imageList.filter(x => x.isProfile).length > 0 && imageList.filter(x => x.isProfile)[0] != x} onChange={(e) => {
                                handleCheckboxChange(i, 'isProfile', e.target.checked);
                              }}>Profil</Checkbox>
                              <Checkbox radius="md" size='sm' isDisabled={x.isProfile} onChange={(e) => {
                                handleCheckboxChange(i, 'isSpecial', e.target.checked);
                              }}>Special</Checkbox>
                            </div>
                            <div>
                              <Button size='sm' color='danger' variant='flat' isIconOnly onPress={() => {
                                const updatedItems = imageList.filter((j) => j !== x);
                                setImageList(updatedItems);
                              }}><BsTrash /></Button>
                            </div>
                          </div>
                        </div>
                      })}
                    </div>
                  }

                  <div className='flex align-middle items-center flex-wrap justify-center gap-4'>
                    {
                      userImages?.map((x, i) => {
                        return <div key={i} className='border border-gray-200 rounded-lg p-2 relative flex flex-col items-center gap-2 min-w-[140px]'>
                          <div className='absolute top-1 right-1 flex gap-1'>
                            <Button size='sm' color='danger' variant='flat' isIconOnly onPress={() => {
                              DeleteUserImage({ id: x.Id }).then((res) => {
                                if (res.status == ResponseStatus.Ok) {
                                  toast.success("Image Deleted")
                                  setUserImages(userImages.filter((j) => j.Id != x.Id))
                                }
                                else {
                                  toast.error("Image Deletion Error")
                                }
                              })
                            }}>
                              <BsTrash />
                            </Button>
                          </div>
                          <div className='h-20 w-full overflow-hidden flex align-middle items-center justify-center'>
                            <Image
                              width={120}
                              src={x.ImageUrl}
                              alt='user image'
                              className='mb-1 object-cover'
                            />
                          </div>
                          <div className='flex flex-col gap-1 w-full'>
                            <Button size='sm' variant={x.IsProfile ? 'solid' : 'flat'} color={x.IsProfile ? 'success' : 'default'} onPress={() => {
                              if (x.IsProfile) return; // zaten profil
                              SetProfileUserImage({ imageId: x.Id }).then(res => {
                                if (res.status == ResponseStatus.Ok) {
                                  toast.success('Profil resmi güncellendi');
                                  setUserImages(userImages.map(img => ({ ...img, IsProfile: img.Id === x.Id })));
                                } else {
                                  toast.error('Profil resmi güncellenemedi');
                                }
                              })
                            }}>{x.IsProfile ? 'Profil' : 'Profil Yap'}</Button>
                            <Button size='sm' variant={x.IsSpecial ? 'solid' : 'flat'} color={x.IsSpecial ? 'warning' : 'default'} onPress={() => {
                              ToggleSpecialUserImage({ imageId: x.Id, isSpecial: !x.IsSpecial }).then(res => {
                                if (res.status == ResponseStatus.Ok) {
                                  toast.success('Special durum güncellendi');
                                  setUserImages(userImages.map(img => img.Id === x.Id ? { ...img, IsSpecial: !img.IsSpecial } : img));
                                } else {
                                  toast.error('Special durum güncellenemedi');
                                }
                              })
                            }}>{x.IsSpecial ? 'Special' : 'Special Yap'}</Button>
                          </div>
                        </div>
                      })
                    }
                  </div>
                  <div className='flex justify-end'>
                    <Button color="primary" variant='flat' disabled={loading} isLoading={loading} onPress={() => { submitImage() }} >
                      Save
                    </Button>
                  </div>
                </div>
                <div>

                </div>
              </div>
            </div>
          }


        </div>
      </div>
    </div>
  )
}

export default UserForm