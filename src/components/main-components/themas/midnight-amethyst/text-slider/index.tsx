import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import Slider from "react-slick";

interface ISliderText {
  header1: string
  header2: string,
  header3: string
}
interface ISliderButton {
  title: string,
  href: string,
  radius: "full" | "lg" | "md" | "none" | "sm",
}
interface ISliderImage {
  url: string,
  alt: string,
  isFullImage: boolean,
}
interface ITextSlider {
  sliderText: ISliderText,
  buttons: ISliderButton[],
  img: ISliderImage
}
interface ISliderProps {
  sliderItems: ITextSlider[],
}

export default function TextSlider({ sliderItems }: ISliderProps) {
  const router = useRouter();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <section>
      <Slider {...settings}>
        {
          sliderItems?.map((item, i) => {
            return <div key={i} className="w-full">
              <div className="container flex flex-col lg:flex-row align-middle items-center justify-between py-10 gap-10">
                <div className="w-full lg:w-1/2 relative text-center lg:text-left">
                  <div className="text-lg lg:text-xl py-5 lg:py-3 text-gray-500">
                    {item.sliderText.header1}
                  </div>
                  <div className="text-2xl lg:text-6xl font-bold lg:leading-tight text-black">
                    {item.sliderText.header2}
                  </div>
                  <div className="text-lg lg:text-2xl py-5 lg:py-7 text-gray-500">
                    {item.sliderText.header3}
                  </div>
                  <div className="flex flex-col lg:flex-row justify-start align-middle items-center gap-2">
                    {
                      item.buttons.map((button, i) => {
                        return <Button key={i} color="secondary"
                          onClick={() => router.push(button.href)}
                          className="font-bold" radius={button.radius}>
                          {button.title}
                        </Button>
                      })
                    }
                  </div>
                  <div className="absolute right-0 top-1/3 -rotate-45 hidden lg:block">
                    <img src="/images/arrow-ai.svg" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <img src={item.img.url} alt={item.img.alt} />
                </div>
              </div>
            </div>
          })
        }
      </Slider>
    </section>
  );
}