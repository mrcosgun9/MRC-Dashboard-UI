"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { CgMail } from 'react-icons/cg';
import { CreateTenantFormType, CreateTenantSchema } from './type';
import { BsCheck, BsX } from 'react-icons/bs';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { ResponseStatus } from '@/types/baseType';
import useTenantControl from '@/hooks/useTenantControl';
import TenantService from '@/services/actions/tenants';
import { TenantRequest } from '@/services/actions/tenants/type';

const CreateTenantModal = ({ createTenantIsModal, createTenantOnModal, createTenantOnOpenChange }: { createTenantIsModal: boolean, createTenantOnModal: () => void, createTenantOnOpenChange: () => void }) => {
  const { data: tenantControlData, error, loading: tenantControlLoading, setSlug } = useTenantControl();
  const { setLoading, loginOnModal } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateTenantFormType>({ resolver: yupResolver(CreateTenantSchema) })

  const onSubmit: SubmitHandler<CreateTenantFormType> = async (data) => {
    setLoading(true);
    const tenantData: TenantRequest = {
      id: 0,
      domain: data.slug,
      slug: data.slug,
      title: data.title
    }
    console.log(tenantControlData?.isExist);
    
    if (!tenantControlData?.isExist) {
      console.log("tenantData",tenantData);
      
      const res = await TenantService.upsertTenant(tenantData)
      console.log(res);
      
      if (res.status==ResponseStatus.Ok) {
        toast.success("Mağazanız Başarılı Bir Şekilde Oluşturuldu.")
        reset();
        createTenantOnOpenChange();
      }
    }
    else {
      toast.error('Mağaza adı daha önce alınmış.', { position: "top-center" })
    }
    setLoading(false)
  }

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={createTenantIsModal}
        onOpenChange={createTenantOnOpenChange}
        placement="top-center"
        backdrop='blur'
        size='lg'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-3">
                  <img src='/images/white-logo.png' className='h-10 w-fit' />
                  <div>Mağazanızı Oluşturun</div>
                </ModalHeader>
                <ModalBody>
                  <Input
                    {...register('title', { required: "This is required" })}
                    isInvalid={!!errors.title} errorMessage={errors.title?.message}

                    label="Mağaza Başlığı"
                    placeholder="Mağaza Başlığı Giriniz"
                  />

                  <Input label="Mağaza Adı"
                    isInvalid={!!errors.slug} errorMessage={errors.slug?.message}
                    {...register(
                      'slug',
                      {
                        required: "This is required",
                        onChange: (e) => setSlug(e.target.value)
                      },

                    )}
                    endContent={
                      <div className="pointer-events-none flex items-end relative">
                        <span className="text-default-400 text-small">.iconiumbilisim.com</span>
                        <div className='ml-1'>
                          {tenantControlLoading ?
                            <Spinner size="sm" /> :
                            tenantControlData && (tenantControlData.isExist ?
                              <BsX size={28} className='text-red-600' /> :
                              <BsCheck size={28} className='text-green-600' />)}
                        </div>
                      </div>
                    } />

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="shadow" onPress={onClose}>
                    Kapat
                  </Button>
                  <Button color="primary" variant='shadow' type='submit'
                    disabled={tenantControlLoading}
                    className='disabled:bg-slate-700 disabled:cursor-not-allowed'  >
                    Mağazayı Oluştur
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

export default CreateTenantModal