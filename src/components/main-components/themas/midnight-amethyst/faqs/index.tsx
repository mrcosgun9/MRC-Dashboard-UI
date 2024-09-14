"use client"
import { Accordion, AccordionItem } from '@nextui-org/react'
import type { Selection } from "@nextui-org/react";
import React from 'react'
import HeroSubTitleGradient from '../HeroSubTitleGradient';

const FaqsList = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["0"]));
  const accordionItems = [
    {
      title: 'Özel yazılım geliştirme süreci nasıl işliyor?',
      content: 'İhtiyaçlarınızı analiz ederek başlıyoruz. Gereksinimlerinize uygun bir yazılım çözümü planlıyor, tasarlıyor ve geliştiriyoruz. Süreç boyunca sizi düzenli olarak bilgilendiriyor ve geri bildirimlerinizi alarak projeyi tamamlıyoruz.',
    },
    {
      title: 'E-ticaret sitesi kurulum süresi ne kadar sürer?',
      content: 'Projenin kapsamına bağlı olarak değişmekle birlikte, standart bir e-ticaret sitesi genellikle 4 ila 8 hafta arasında tamamlanır. Özelleştirilmiş çözümler için bu süre uzayabilir.'
    },
    {
      title: 'Kurumsal kimlik çalışması hangi hizmetleri kapsar?',
      content: 'Kurumsal kimlik çalışmamız; logo tasarımı, kartvizit, antetli kağıt, e-posta imzaları ve diğer kurumsal materyallerin tasarımını içerir. Markanızın tutarlı bir imaja sahip olmasını sağlıyoruz.'
    },
    {
      title: 'SEO hizmetleriniz ile ne kadar sürede sonuç alabilirim?',
      content: 'SEO, süreklilik gerektiren bir süreçtir ve genellikle ilk sonuçları 3 ila 6 ay arasında görmeye başlarsınız. Ancak, sektör rekabeti ve anahtar kelimelere bağlı olarak süre değişiklik gösterebilir.'
    },
    {
      title: 'Web sitenizin mobil uyumlu olmasını nasıl sağlıyorsunuz?',
      content: 'Tüm web tasarımlarımızda responsive (mobil uyumlu) teknoloji kullanıyoruz. Bu sayede siteniz, her cihazda kullanıcı dostu bir deneyim sunar.'
    },
    {
      title: 'Yazılım projelerinde destek sağlıyor musunuz?',
      content: 'Evet, yazılım geliştirme sürecinden sonra da destek ve bakım hizmetleri sunuyoruz. Güncellemeler, hata düzeltmeleri ve geliştirmeler için uzun vadeli çözümler sağlıyoruz.'
    },
    {
      title: '**E-ticaret siteniz hangi ödeme sistemlerini destekler?',
      content: 'E-ticaret sitelerimiz, PayPal, kredi kartı, banka havalesi, kapıda ödeme gibi birçok ödeme sistemini destekler. Ayrıca, sizin talebinize göre diğer ödeme altyapılarını da entegre edebiliriz.'
    },
    {
      title: 'Kurumsal web sitesi tasarımında hangi teknolojileri kullanıyorsunuz?',
      content: 'Kurumsal web siteleri için HTML, CSS, JavaScript, React ve Next.js gibi modern web teknolojilerini kullanıyoruz. Arka planda ise .NET Core, Node.js ve benzeri güçlü altyapılar tercih ediyoruz.',
    },
    {
      title: 'SEO hizmetleriniz hangi aşamalardan oluşuyor?',
      content: 'SEO hizmetimiz anahtar kelime araştırması, rakip analizi, site içi optimizasyon, içerik stratejisi ve bağlantı oluşturma (backlink) aşamalarını içerir. Sürekli analizlerle optimizasyonu sürdürüyoruz.'
    },
    {
      title: 'Yazılım projemin maliyeti ne kadar olur?',
      content: 'Maliyetler, projenin kapsamına, ihtiyaçlarınıza ve kullanılan teknolojilere göre değişiklik gösterir. Proje başlamadan önce size ayrıntılı bir teklif sunarak bütçenizi planlamanıza yardımcı oluyoruz.'
    },
    {
      title: 'E-ticaret sitenize ürün eklemek kolay mı?',
      content: 'Evet, e-ticaret sitelerimiz kullanıcı dostu yönetim panellerine sahiptir. Ürün ekleme, fiyat güncelleme ve stok takibi gibi işlemleri kolayca yapabilirsiniz.'
    },
  ]

  return (
    <section className='relative z-10 overflow-hidden pt-10 md:pt-16 xl:pt-45'>
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <HeroSubTitleGradient content='Özel Yazılım, E-ticaret ve Dijital Dönüşüm Çözümleri' />
          <h1 className="mb-8 text-3xl font-sans font-semibold text-white sm:text-5xl xl:text-heading-1">İşinizi Dijital Dünyada Zirveye Taşıyın</h1>
          <p className="mx-auto mb-10 max-w-[500px] font-light md:text-lg">
            Geleceğin Teknolojileriyle Bugünün İş Problemlerini Çözelim
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        <Accordion
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys} itemClasses={{
            heading: "font-bold px-2",
            content: "mb-4 px-4"
          }}>
          {
            accordionItems.map((x, i) => {
              return <AccordionItem key={i} aria-label={i.toString()} title={x.title}>
                {x.content}
              </AccordionItem>
            })
          }
        </Accordion>
      </div>
    </section>
  )
}

export default FaqsList
