"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { ServicesList } from '@/components/main-components/themas/midnight-amethyst/services-list';
import Hero from '@/components/main-components/themas/midnight-amethyst/hero';
import Features from '@/components/main-components/themas/midnight-amethyst/features';
import FaqsList from '@/components/main-components/themas/midnight-amethyst/faqs';
import useSWR from 'swr';
import { httpClient } from '@/services/httpClient';
import { swrFetcher } from '@/services/swr-service';

const HomePage = () => {
  return <>
    <Hero />
    <ServicesList />
    <Features />
    <FaqsList />
    {/* <BlogList/> */}
  </>
}

export default HomePage;