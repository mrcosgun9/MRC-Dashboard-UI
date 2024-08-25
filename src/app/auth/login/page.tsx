"use client"
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const login = () => {
  const [isVisible, toggleVisibility] = useState(false);
  return (
    <div className='w-full h-screen flex flex-col gap-4 align-middle items-center justify-center'>
      <div className='font-black text-xl'>
        LOGO
      </div>
      <div className='w-96 bg-white rounded-lg shadow-lg p-8'>
        <div className='text-xl font-bold text-center'>Sign In</div>
        <form className='flex flex-col gap-5 mt-6'>
          <Input
            label="Email"
            placeholder="Enter your email"
            labelPlacement='outside'
          />
          <Input
            label="Password"
            labelPlacement='outside'
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }} aria-label="toggle password visibility">
                {isVisible ? (
                  <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button color="secondary" variant='flat'>
            Sign In
          </Button>
        </form>

      </div>
    </div>
  )
}

export default login