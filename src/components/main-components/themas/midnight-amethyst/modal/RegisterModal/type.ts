import * as yup from "yup";
export type RegisterFormType={
  name:string,
  surname:string,
  subDomain:string,
  email:string,
  password:string
}

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("İsim boş geçilemez."),
  surname: yup.string().required("Soyisim boş geçilemez."),
  subDomain: yup.string().required("Mağaza adı boş geçilemez.").min(4,'Mağaza adı en az 4 karakterden oluşmalıdır.').max(12,'Mağaza adı en fazla 12 karakterden oluşmalıdır.'),
  email: yup.string().email("Geçerli bir mail adresi giriniz.").required("Email boş geçilemez."),
  password: yup.string().required("Şifre boş geçilemez.").min(8,'Şifreniz en az 8 karakterden oluşmalıdır.').max(32,'Şifreniz en fazla 32 karakterden oluşmalıdır.'),
});