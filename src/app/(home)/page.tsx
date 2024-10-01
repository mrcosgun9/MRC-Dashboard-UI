"use client"
import React from 'react'
import { createPage } from '@/dynamic-rendering';
import mockResponse from '@/dynamic-rendering/dynamic-rendering.mock';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextSlider from '@/components/main-components/themas/midnight-amethyst/text-slider';
const HomePage = () => {
  return <>
    {createPage(mockResponse)}
    <TextSlider/>
    {/* <Hero />
    <ServicesList />
    <Features />
    <FaqsList /> */}
    {/* <BlogList/> */}
  </>
}

export default HomePage;