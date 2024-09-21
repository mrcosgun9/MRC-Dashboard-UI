import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { BiLock, BiMailSend } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';

const LoginModal = ({ loginIsModal, loginOnModal, loginOnOpenChange }: { loginIsModal: boolean, loginOnModal: () => void, loginOnOpenChange: () => void }) => {

  return (
    <>
      <Modal
        isOpen={loginIsModal}
        onOpenChange={loginOnOpenChange}
        placement="top-center"
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Giriş Yap</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <CgMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Email Adresinizi Giriniz"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Şifre"
                  placeholder="Şifrenizi Girin"
                  type="password"
                  variant="bordered"
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
                <Button color="primary" onPress={onClose}>
                  Giriş Yap
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}

export default LoginModal