"use client"
import { createUserService, UploadStoredFile } from '@/actions/userAction'
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import { bodyTypeItems, dayItems, ethnicityItems, genderItems, isSmokeItems, monthItems, relationshipItems, sexualOrientationItems, yearItems } from '@/constants/selectItemList'
import { useAppContext } from '@/context/AppContext'
import UserImages from '@/services/actions/userImage'
import UserService from '@/services/actions/userService'
import { CreateUserRequest, CreateUserResponse } from '@/services/actions/userService/type'
import { ResponseStatus } from '@/types/baseType'
import { Button, Checkbox, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { User } from '@prisma/client'
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

const CreateUserPage = () => {
  const router = useRouter();
  const { loading, setLoading } = useAppContext();
  const [imageList, setImageList] = useState<ImageType[]>()
  const [addedUser, setAddedUser] = useState<User>()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = async (data) => {
    setLoading(true);

    data.FullName = `${data.Name} ${data.LastName}`
    data.UserType = 4;
    data.Gender = Number(data.Gender);
    data.MaritalStatus = Number(data.MaritalStatus);
    data.SexualOrientation = Number(data.SexualOrientation);
    const res = await createUserService({ data });
    if (res.status == ResponseStatus.Ok) {
      toast.success('User added successfully');
      setLoading(false);
      setAddedUser(res.data)
      // router.push('/dashboard/manage-users/all-user')
    }
    else {
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
      <PageHeader title="CREATE USER" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS', url: '/dashboard/manage-users/all-user' },
        { title: 'CREATE USER' },
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
                    <div className='flex flex-wrap align-middle items-start justify-start gap-3'>
                      {imageList.map((img, i) => {
                        const hasProfile = imageList.some(im => im.isProfile);
                        const isProfile = img.isProfile;
                        const isSpecial = img.isSpecial;
                        return (
                          <div
                            key={i}
                            className={`relative rounded-lg p-2 border transition-colors ${
                              isProfile ? 'border-green-500' : isSpecial ? 'border-amber-500' : 'border-gray-200'
                            }`}
                          >
                            <div className='h-24 w-32 overflow-hidden flex items-center justify-center rounded-md bg-gray-50'>
                              <Image
                                width={128}
                                src={URL.createObjectURL(img.file)}
                                alt='preview image'
                                className='object-cover'
                              />
                            </div>
                            <div className='mt-2 flex flex-col gap-1 text-xs'>
                              <Checkbox
                                radius='md'
                                size='sm'
                                isSelected={isProfile}
                                isDisabled={hasProfile && !isProfile}
                                onChange={(e) => {
                                  handleCheckboxChange(i, 'isProfile', e.target.checked);
                                  if (e.target.checked) {
                                    // Başka profil işaretlileri temizle
                                    setImageList(prev => prev?.map((p, idx) => idx === i ? { ...p, isProfile: true } : { ...p, isProfile: false }) );
                                  }
                                }}
                              >Profil</Checkbox>
                              <Checkbox
                                radius='md'
                                size='sm'
                                isSelected={isSpecial}
                                isDisabled={isProfile}
                                onChange={(e) => {
                                  handleCheckboxChange(i, 'isSpecial', e.target.checked);
                                }}
                              >Special</Checkbox>
                            </div>
                            <div className='mt-1 flex justify-between gap-1'>
                              {isProfile && <span className='text-[10px] px-1 py-0.5 rounded bg-green-500 text-white'>Profile</span>}
                              {!isProfile && isSpecial && <span className='text-[10px] px-1 py-0.5 rounded bg-amber-500 text-white'>Special</span>}
                            </div>
                            <Button
                              size='sm'
                              color='danger'
                              variant='flat'
                              isIconOnly
                              className='absolute top-1 right-1'
                              onPress={() => {
                                setImageList(imageList.filter((_, idx) => idx !== i));
                              }}
                            >
                              <BsTrash />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  }
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

export default CreateUserPage