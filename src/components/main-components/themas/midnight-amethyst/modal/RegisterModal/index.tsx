"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { CgMail } from 'react-icons/cg';
import { RegisterFormType, RegisterSchema } from './type';
import { BsCheck, BsEye, BsEyeSlash, BsX } from 'react-icons/bs';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { ResponseStatus } from '@/types/baseType';
import ForgotPasswordToast from './forgotPasswordToast';
import useTenantControl from '@/hooks/useTenantControl';

const RegisterModal = ({ registerIsModal, registerOnModal, registerOnOpenChange }: { registerIsModal: boolean, registerOnModal: () => void, registerOnOpenChange: () => void }) => {
  const { data, error, loading, setSlug } = useTenantControl();
  const { setLoading } = useAppContext();
  const [isVisible, toggleVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ resolver: yupResolver(RegisterSchema) })

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res;
    }).catch((e) => {
      return e;
    })
    if (res.status == 200) {
      const resData = await res.json();
      if (resData.status == ResponseStatus.Ok) {

      }
      else {
        toast.custom((t) => (
          <ForgotPasswordToast message={resData.message} t={t} />
        ))
      }
      console.log(resData);
    }
    else {
      toast.error("İşlem sırasında bir hata oluştu");
    }
    setLoading(false)
  }

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={registerIsModal}
        onOpenChange={registerOnOpenChange}
        placement="top-center"
        backdrop='blur'
        size='xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-3">
                  <img src='/images/white-logo.png' className='h-10 w-fit' />
                  <div>Hemen Kayıt Olun</div>
                </ModalHeader>
                <ModalBody>
                  <div className='grid grid-cols-2 align-middle items-center gap-2'>
                    <Input label="İsim" {...register('name', { required: "This is required" })} isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                    <Input label="Soyisim" {...register('surname', { required: "This is required" })} isInvalid={!!errors.surname} errorMessage={errors.surname?.message} />
                  </div>
                  <Input label="Mağaza Adı"
                    isInvalid={!!errors.subDomain} errorMessage={errors.subDomain?.message}
                    {...register(
                      'subDomain',
                      { 
                        required: "This is required", 
                        onChange: (e) => setSlug(e.target.value) 
                      },

                    )}
                    endContent={
                      <div className="pointer-events-none flex items-end relative">
                        <span className="text-default-400 text-small">.iconiumbilisim.com</span>
                        <div className='ml-1'>
                          {loading ? <Spinner size="sm" /> : data && data.isExist ? <BsX size={28} className='text-red-600' /> : <BsCheck size={28} className='text-green-600' />}
                        </div>
                      </div>
                    } />
                  <Input
                    {...register('email', { required: "This is required" })}
                    isInvalid={!!errors.email} errorMessage={errors.email?.message}
                    endContent={
                      <CgMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Email Adresinizi Giriniz"
                  />
                  <Input
                    label="Şifre"
                    placeholder="Şifrenizi Girin"
                    isInvalid={!!errors.password} errorMessage={errors.password?.message}
                    {...register('password', { required: "This is required" })}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={() => toggleVisibility(!isVisible)} aria-label="toggle password visibility">
                        {isVisible ? (
                          <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <BsEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="shadow" onPress={onClose}>
                    Kapat
                  </Button>
                  <Button color="primary" variant='shadow' type='submit' className='disabled:bg-slate-700 disabled:cursor-not-allowed' disabled={data?.isExist}>
                    Hesabı Oluştur
                  </Button>
                </ModalFooter>
              </form>

            </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}

export default RegisterModal