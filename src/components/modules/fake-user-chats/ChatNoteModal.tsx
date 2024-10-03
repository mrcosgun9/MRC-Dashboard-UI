
import ChatNoteService from '@/services/actions/chatNote';
import { CreateChatNoteRequest, CreateChatNoteResponse } from '@/services/actions/chatNote/type';
import { ResponseStatus } from '@/types/baseType';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Textarea, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify';

const ChatNoteModal = ({ userId, fakeUserId, chatId, chatNotes, setChatNotes }: { userId: number, fakeUserId: number, chatId: number, chatNotes: CreateChatNoteResponse[], setChatNotes: React.Dispatch<React.SetStateAction<CreateChatNoteResponse[]>> }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatNoteRequest>()
  const onSubmit: SubmitHandler<CreateChatNoteRequest> = async (data) => {
    data.chatId = chatId;
    data.userId = Number(selected);
    const res = await ChatNoteService.createChatNote(data);
    if (res.status == ResponseStatus.Ok) {
      setChatNotes([...chatNotes, res.data])
      onOpenChange();
      toast.success("successful");
    }
    else {
      toast.error("error");
    }
  }
  return (
    <div>
      <Button color='primary' size='sm' variant='light' startContent={<BiPlus />} onPress={onOpen}>
        Notiz hinzufügen
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Notiz hinzufügen</ModalHeader>
              <ModalBody>
                <div className='flex'>
                  <RadioGroup
                    orientation="horizontal"
                    value={selected}
                    onValueChange={setSelected}
                  >
                    <Radio value={userId.toString()}>Kunde</Radio>
                    <Radio value={fakeUserId.toString()}>X Ake</Radio>
                  </RadioGroup>
                </div>
                <Textarea
                  label="Note"
                  variant="bordered"
                  placeholder="Enter your Note"
                  disableAnimation
                  disableAutosize
                  {...register('note', { required: "This is required" })}
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type='submit'>
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChatNoteModal