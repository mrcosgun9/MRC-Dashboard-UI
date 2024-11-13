import { IComponent } from "./dynamic-rendering.interfaces";

const mockResponse: IComponent = {
  type: "CustomContainer",
  data: {
    id: "4400936b-6158-1354-9dc8-a04c57e1af46",
    fluid: true,
    items: [
      {
        type: "HomeNavbar",
        data: {
          id: "navbar",
          position: {
            value: "static",
            default: "sticky",
            name: "Pozisyon",
            isEditable: true,
            items: [{
              value: "static",
              label: "Sabit"
            }, {
              value: "sticky",
              label: "Yapışkan"
            }],
            type: "select"
          },
          logo: {
            name: 'Logo',
            url: "/images/logo.png",
            href: "/",
            isCenter: {
              value: false,
              default: false,
              name: "Ortala",
              isEditable: true,
              type: "checkbox"
            },
            isEditable: true,
            type: "file"
          },
          menuItems: {
            name: 'Menü',
            isEditable: true,
            type: "group",
            items: [
              {
                title: {
                  value: "Anasayfa",
                  name: "Başlık",
                  isEditable: true,
                  type: "text"
                },
                href: {
                  value: "/",
                  name: "Link",
                  isEditable: true,
                  type: "text"
                },
                isEditable: true,
              },

            ]
          }
        }
      },
      {
        type: "TextSlider",
        data: {
          id: "text-slider",
          sliderItems: [
            {
              sliderText: {
                header1: "Dijital Dönüşüme Adım Atın!",
                header2: "Çarpıcı web siteleri oluşturmak çok kolay",
                header3: "Saniyeler içinde büyüleyici içerik ve görsellerle dolu muhteşem web siteleri oluşturun ve satışa başlayın"
              },
              buttons: [
                {
                  title: "Ücretsiz Kayıt Ol",
                  href: "/hakkimizda",
                  radius: "lg"
                },
                {
                  title: "Planları İnceleyin",
                  href: "/hakkimizda",
                  radius: "lg"
                }
              ],
              img: {
                url: "/images/slider.png",
                alt: "deneme",
                isFullImage: false
              }
            },

          ]
        }
      }
    ]
  }
}

export default mockResponse;
