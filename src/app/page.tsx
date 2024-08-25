"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';
const page = () => {
  const { data: session, status } = useSession();
  // redirect('/hello-nextjs');
  if (status=='authenticated') redirect("/dashboard")
  else redirect('/auth/login');

}

export default page