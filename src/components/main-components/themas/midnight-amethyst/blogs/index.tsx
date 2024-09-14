import React from 'react'
import HeroSubTitleGradient from '../HeroSubTitleGradient'
import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import BlogItem from './blog'

const BlogList = () => {
  return (
    <section className='relative z-10 overflow-hidden mt-10 container'>
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <HeroSubTitleGradient content='Özel Yazılım, E-ticaret ve Dijital Dönüşüm Çözümleri' />
          <h1 className="mb-8 text-3xl font-sans font-semibold text-white sm:text-5xl xl:text-heading-1">İşinizi Dijital Dünyada Zirveye Taşıyın</h1>
          <p className="mx-auto mb-10 max-w-[500px] font-light md:text-lg">
            Geleceğin Teknolojileriyle Bugünün İş Problemlerini Çözelim
          </p>
        </div>
        <div>
          <BlogItem />
        </div>
      </div>
    </section>
  )
}

export default BlogList