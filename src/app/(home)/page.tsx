"use client"
import React from 'react'
import { createPage } from '@/dynamic-rendering';
import mockResponse from '@/dynamic-rendering/dynamic-rendering.mock';

const HomePage = () => {
  return <>
    {createPage(mockResponse)}
    {/* <Hero />
    <ServicesList />
    <Features />
    <FaqsList /> */}
    {/* <BlogList/> */}
  </>
}

export default HomePage;