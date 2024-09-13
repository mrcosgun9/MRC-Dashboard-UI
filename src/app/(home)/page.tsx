"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import HeroSubTitleGradient from '@/components/main-components/HeroSubTitleGradient';
const HomePage = () => {
  const { data: session, status } = useSession();
  return <>
    <section className='relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45'>
      <div className="mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-0 -z-10 -mx-28 overflow-hidden"><div className="-u-z-10 hero-circle-gradient absolute -top-[128%] left-1/2 -z-1 h-[1282px] w-full max-w-[1282px] -translate-x-1/2 rounded-full sm:-top-[107%] xl:-top-[73%]"></div>
          <div className="-u-z-10 hero-circle-gradient absolute -top-[112%] left-1/2 -z-1 h-[1046px] w-full max-w-[1046px] -translate-x-1/2 rounded-full sm:-top-[93%] xl:-top-[62%]"></div>
          <div className="-u-z-10 absolute left-1/2 top-0 aspect-[1204/394] w-full max-w-[1204px] -translate-x-1/2">
            <img alt="blur" loading="lazy" decoding="async" data-nimg="fill" className="max-w-none absolute h-full w-full left-0 top-0 right-0 bottom-0 text-transparent" src="/images/blur/blur-02.svg" />
          </div>
          <div className="-u-z-10 absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[url(/images/blur/blur-01.svg)] bg-cover bg-top bg-no-repeat"></div>
        </div>
      </div>
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <HeroSubTitleGradient content='Dijital Dönüşümünüz İçin İnovatif Çözümler' />
          <h1 className="mb-8 text-3xl font-sans font-semibold text-white sm:text-5xl xl:text-heading-1">E-Ticaret ve Kurumsal Web Çözümlerimizle Tanışın</h1>
          <p className="mx-auto mb-10 max-w-[500px] font-light md:text-lg">
            İşletmenizi dijital çağın gereksinimlerine uygun hale getirin.<br />
            E-ticaret çözümlerimiz ve kurumsal web sitesi hizmetlerimizle, markanızın çevrimiçi varlığını güçlendirin.<br />
            Özelleştirilebilir ve kullanıcı dostu web siteleri ile müşterilerinize en iyi deneyimi sunun.
          </p>
          <Button variant="flat" size='md' className="bg-gradient-to-tr from-purple-700 to-blue-700 text-white shadow-lg font-medium">
            İlham Alın ve Başlayın
          </Button>
        </div>
      </div>
      <div className="relative mx-auto mt-17 aspect-[1170/411] w-full max-w-[1170px] mt-8">
        <img alt="hero" loading="lazy" decoding="async" data-nimg="fill" className="mx-auto absolute h-full w-full left-0 right-0 bottom-0 text-transparent" src="/images/hero/hero.svg" />
      </div>
    </section>
    <section className='relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45 container'>
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <HeroSubTitleGradient content='Özel Yazılım, E-ticaret ve Dijital Dönüşüm Çözümleri' />
          <h1 className="mb-8 text-3xl font-sans font-semibold text-white sm:text-5xl xl:text-heading-1">İşinizi Dijital Dünyada Zirveye Taşıyın</h1>
          <p className="mx-auto mb-10 max-w-[500px] font-light md:text-lg">
            Geleceğin Teknolojileriyle Bugünün İş Problemlerini Çözelim
          </p>
        </div>

      </div>
      <div className="relative">
        <div className="features-row-border absolute left-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
        <div className="features-row-border absolute right-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 undefined"></span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-01.svg" />
              </span>
              <h3 className="mb-4 text-lg font-semibold text-white">OpenAI Integration</h3>
              <p className="font-medium">Our AI writing tool analyzes your content, suggests improvements</p></div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 undefined"></span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-02.svg" /></span>
              <h3 className="mb-4 text-lg font-semibold text-white">Next.js 13, React 18, TS</h3>
              <p className="font-medium">Say goodbye to embarrassing typos and grammar mistakes</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 undefined"></span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-03.svg" /></span>
              <h3 className="mb-4 text-lg font-semibold text-white">Auth, DB, Sanity Blog</h3>
              <p className="font-medium">Originality is key, and our AI writing tool helps you maintain it</p>
            </div>
          </div>
        </div>
        <div className="features-row-border h-[1px] w-full">
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 rotate-180"></span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-04.svg" />
              </span>
              <h3 className="mb-4 text-lg font-semibold text-white">Cutting-edge Technologies</h3>
              <p className="font-medium">Transform your spoken words into written text easily &amp; effortlessly</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 rotate-180"></span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-05.svg" /></span>
              <h3 className="mb-4 text-lg font-semibold text-white">Pre-made AI Examples</h3>
              <p className="font-medium">Whether you need a professional, or positive tone it has everyone</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
              <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 rotate-180">
              </span>
              <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                <img alt="icon" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" src="/images/features/icon-06.svg" /></span>
              <h3 className="mb-4 text-lg font-semibold text-white">Rich Documentation</h3>
              <p className="font-medium">Need inspiration or assistance with generating content?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default HomePage;