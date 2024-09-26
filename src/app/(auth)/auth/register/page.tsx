"use client"
import { useAppContext } from '@/context/app-context';
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
type Inputs = {
  email: string
  password: string
}
const RegisterPage = () => {
  const router = useRouter();
  const { loading, setLoading } = useAppContext();
  const [isVisible, toggleVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    setLoading(true)
    // const res = await AuthService.authentication({ email: data.email, password: data.password });
    // if (res.status==ResponseStatus.Ok) {
    //   Cookies.set("currentUser",res.data.token)
    //   toast.success('İşlem başarılı.')
    // }
    // else{
    //   toast.error('Email veya Şifre Hatalı! ')
    // }
    // setLoading(false)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if (res?.status === 200) {
      toast.success('Login successful')
      setLoading(false)
      router.push('/dashboard');
    }
    else {
      toast.error('Email veya şifre hatalı!')
      setLoading(false)
    }
  }
  return (
    <div className='container py-10'>
      <div>
        
      </div>
      <form className='flex flex-col gap-5 mt-6' onSubmit={handleSubmit(onSubmit)}>
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
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }} aria-label="toggle password visibility">
                {isVisible ? (
                  <BsEyeSlashFill className="text-default-400 pointer-events-none" />
                ) : (
                  <BsEyeFill className="text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button color="secondary" variant='solid' disabled={loading} isLoading={loading} type='submit'>
            Sign In
          </Button>
        </form>
    </div>
  )
}

export default RegisterPage