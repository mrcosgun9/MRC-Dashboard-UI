import { IComponent } from "./dynamic-rendering.interfaces";

const mockResponse: IComponent = {
  type: "CustomContainer",
  data: {
    id: "4400936b-6158-1354-9dc8-a04c57e1af46",
    fluid: true,
    items: [
      {
        type:"HomeNavbar",
        data:{
          id:"navbar",
          position:"sticky",
          logo:{
            url:"/images/logo.png",
            href:"/",
            isCenter:false
          },
          menuItems:[
            {
              title:"Kurumsal",
              href:"/kurumsal"
            },
            {
              title:"Hizmetlerimiz",
              href:"/hizmetlerimiz",
              items:[
                {
                  title:"Alt Menü 1",
                  href:"alt-menu-1",
                  description:"Alt Menü 1 Açıklaması",
                  img:"/images/favicon.png"
                },
                {
                  title:"Alt Menü 2",
                  href:"alt-menu-2",
                  description:"Alt Menü 2 Açıklaması",
                  img:"/images/favicon.png"
                },
                {
                  title:"Alt Menü 3",
                  href:"alt-menu-3",
                  description:"Alt Menü 3 Açıklaması",
                  img:"/images/favicon.png"
                }
              ]
            },
            {
              title:"Referanslar",
              href:"/referanslar"
            },
            {
              title:"Blog",
              href:"/blog"
            },
            {
              title:"İletişim",
              href:"/iletisim"
            }
          ]
        }
      },
 
    ]
  }
}

export default mockResponse;
