import * as yup from "yup";
export type CreateTenantFormType = {
  id?: number,
  slug: string,
  domain?: string,
  title: string
}

export const CreateTenantSchema = yup.object().shape({
  id: yup.number().optional(),
  slug: yup.string().required("Mağaza Adı boş geçilemez."),
  domain: yup.string().optional(),
  title: yup.string().required("Mağaza Başlığı boş geçilemez.").min(8, 'Mağaza Başlığı en az 4 karakterden oluşmalıdır.').max(32, 'Mağaza Başlığı en fazla 32 karakterden oluşmalıdır.'),
});