"use client"
import PageHeader from '@/components/layouts/main-layout/PageHeader'
import { dayItems, genderItems, monthItems, yearItems } from '@/constants/selectItemList'
import { useAppContext } from '@/context/AppContext'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
type Inputs = {
  name: string
  userName: string
  email: string
  password: string
  birthDay: string
  birthMonth: string
  birthYear: string
  gender: string
  sexualOrientation: string
}

const CreateUserPage = () => {
  const { loading, setLoading } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => { }
  return (
    <div>
      <PageHeader title="CREATE USER" breadcrumbsItems={[
        { title: 'DASHBOARD', url: '/dashboard' },
        { title: 'ALL USERS', url: '/dashboard/manage-users/all-user' },
        { title: 'CREATE USER' },
      ]} />
      <div className='w-full flex align-middle justify-center'>
        <div className='w-full max-w-3xl bg-white rounded-md shadow-md dark:bg-gray-800 p-5 mb-5'>

          <form className='flex flex-col gap-5 mt-6' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              placeholder="Enter your name"
              labelPlacement='outside'
              {...register('name', { required: "This is required" })}
            />
            <Input
              label="User Name"
              placeholder="Enter your User Name"
              labelPlacement='outside'
              {...register('userName', { required: "This is required" })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              labelPlacement='outside'
              {...register('email', { required: "This is required" })}
            />
            <Input
              label="Password"
              labelPlacement='outside'
              placeholder="Enter your password"
              {...register('password', { required: "This is required" })}
              type="text"
            />
            <Input
              label="Password"
              labelPlacement='outside'
              placeholder="Enter your password"
              {...register('password', { required: "This is required" })}
              type="text"
            />
            <div className='flex align-middle items-center justify-between gap-2'>
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
                {...register('birthDay', { required: "This is required" })}
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
            </div>
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
              {genderItems.map((item) => (
                <SelectItem key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <div className='flex justify-end'>
              <Button color="primary" variant='flat' disabled={loading} isLoading={loading} type='submit'>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUserPage