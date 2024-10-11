"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import { bodyTypeItems, dayItems, ethnicityItems, genderItems, isSmokeItems, monthItems, relationshipItems, sexualOrientationItems, yearItems } from '@/constants/selectItemList'
import { useAppContext } from '@/context/AppContext'
import UserImages from '@/services/actions/userImage'
import UserService from '@/services/actions/userService'
import { CreateUserRequest, CreateUserResponse } from '@/services/actions/userService/type'
import { ResponseStatus } from '@/types/baseType'
import { Button, Checkbox, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
  const [addedUser, setAddedUser] = useState<CreateUserResponse>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserRequest>()
  const onSubmit: SubmitHandler<CreateUserRequest> = async (data) => {
    setLoading(true);
    data.fullName = `${data.name} ${data.lastName}`
    data.userType = 4;
    data.gender = Number(data.gender);
    data.maritalStatus = Number(data.maritalStatus);
    data.sexualOrientation = Number(data.sexualOrientation);
    console.log(data);

    const res = await UserService.createUser(data);
    if (res.status == ResponseStatus.Ok) {

      console.log(res);
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
      formData.append("UserId", addedUser.id.toString())
      imageList?.map((x, i) => {
        formData.append(`UserImages[${i}].file`, x.file);
        formData.append(`UserImages[${i}].isProfile`, x.isProfile.toString());
        formData.append(`UserImages[${i}].isSpecial`, x.isSpecial.toString());
      })
      const res = await UserImages.createUserImage(formData);
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
                  {...register('name', { required: "This is required" })}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  labelPlacement='outside'
                  {...register('lastName', { required: "This is required" })}
                />
              </div>
              <div className='flex gap-2'>
                <Input
                  label="User Name"
                  placeholder="Enter your User Name"
                  labelPlacement='outside'
                  {...register('userName', { required: "This is required" })}
                />
                <Input
                  label="Job"
                  placeholder="Enter your job"
                  labelPlacement='outside'
                  {...register('job', { required: "This is required" })}
                />
              </div>
              <div className='flex gap-2'>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  labelPlacement='outside'
                  {...register('email', { required: "This is required" })}
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  labelPlacement='outside'
                  {...register('phoneNumber', { required: "This is required" })}
                />
              </div>

              <Input
                label="Password"
                labelPlacement='outside'
                placeholder="Enter your password"
                {...register('password', { required: "This is required" })}
                type="text"
              />

              <div className='grid grid-cols-3 gap-3'>
                <Select
                  labelPlacement='outside'
                  label="Select Birth Day"
                  placeholder="Select Birth Day"
                  {...register('birthDay', { required: "This is required" })}
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
                  {...register('birthMonth', { required: "This is required" })}
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
                  {...register('birthYear', { required: "This is required" })}
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
                  {...register('gender', { required: "This is required" })}
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
                  {...register('sexualOrientation', { required: "This is required" })}
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
                  {...register('ethnicity', { required: "This is required" })}
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
                  {...register('bodyType', { required: "This is required" })}
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
                  {...register('maritalStatus', { required: "This is required" })}
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
                  {...register('maritalStatus', { required: "This is required" })}
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
                  {...register('about', { required: "This is required" })}
                  labelPlacement='outside'
                  label="About"
                  placeholder="Enter your about"
                  className="max-w-full"
                />
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
                              <Button size='sm' color='danger' variant='flat' isIconOnly onClick={() => {
                                const updatedItems = imageList.filter((j) => j !== x);
                                setImageList(updatedItems);
                              }}><BsTrash /></Button>
                            </div>
                          </div>
                        </div>
                      })}
                    </div>
                  }
                  <div className='flex justify-end'>
                    <Button color="primary" variant='flat' disabled={loading} isLoading={loading} onClick={() => { submitImage() }} >
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