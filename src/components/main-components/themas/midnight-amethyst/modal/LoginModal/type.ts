import * as yup from "yup";
export type LoginFormType = {
  email: string,
  password: string
}

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Geçerli bir mail adresi giriniz.").required("Email boş geçilemez."),
  password: yup.string().required("Şifre boş geçilemez."),
});