"use server"

import { getUserById } from '@/actions/userAction'
import UserForm from '@/components/modules/manage-users/userForm'

import React from 'react'

interface PageProps {
  params: { id: string }
}

const CreateUserPage = async ({ params }: PageProps) => {
  const { id } = params
  const user = await getUserById( Number(id));
  return (
    <div>

      <UserForm user={user.data}/>

    </div>
  )
}

export default CreateUserPage