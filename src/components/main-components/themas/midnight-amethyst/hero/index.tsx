import HeroSubTitleGradient from '@/components/main-components/themas/midnight-amethyst/HeroSubTitleGradient'
import { Button } from '@nextui-org/react'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative z-10 overflow-hidden pt-28 md:pt-28 xl:pt-32'>
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
  )
}

export default Hero