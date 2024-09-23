import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';
import { LoginFormType, LoginSchema } from './type';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppContext } from '@/context/AppContext';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const LoginModal = ({ loginIsModal, loginOnModal, loginOnOpenChange }: { loginIsModal: boolean, loginOnModal: () => void, loginOnOpenChange: () => void }) => {
  const [isVisible, toggleVisibility] = useState(false);
  const { loading, setLoading } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormType>({ resolver: yupResolver(LoginSchema) })
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setLoading(true)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if (res?.status === 200) {
      toast.success('Giriş işlemi başarılı.')
      reset();
      loginOnOpenChange();
    }
    else {
      toast.error('Email veya şifreniz hatalı! Lütfen tekrar deneyin.')
    }
    setLoading(false)
  }
  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={loginIsModal}
        onOpenChange={loginOnOpenChange}
        placement="top-center"
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Giriş Yap</ModalHeader>
                <ModalBody>
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
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Beni Hatırla
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Şifremi Unuttum?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Kapat
                  </Button>
                  <Button color="primary" disabled={loading} variant='shadow' type='submit' className='disabled:bg-slate-700 disabled:cursor-not-allowed'  >
                    Giriş Yap
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

export default LoginModal