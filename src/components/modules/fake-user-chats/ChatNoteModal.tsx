"use client"
import { CreateChatNote } from '@/actions/messageAction';
import ChatNoteService from '@/services/actions/chatNote';
import { CreateChatNoteRequest, CreateChatNoteResponse } from '@/services/actions/chatNote/type';
import { ResponseStatus } from '@/types/baseType';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Textarea, useDisclosure } from '@nextui-org/react'
import { ChatNote } from '@prisma/client';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify';

const ChatNoteModal = ({ userId, fakeUserId, chatId, chatNotes, setChatNotes }: { userId: number | undefined, fakeUserId: number | undefined, chatId: number, chatNotes: ChatNote[], setChatNotes: React.Dispatch<React.SetStateAction<ChatNote[]>> }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatNote>()
  const onSubmit: SubmitHandler<ChatNote> = async (data) => {
    data.ChatId = chatId;
    data.UserId = Number(selected);
    const res = await CreateChatNote(data);
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
                    <Radio value={userId?.toString() || ""}>Kunde</Radio>
                    <Radio value={fakeUserId?.toString() || ""}>Fake</Radio>
                  </RadioGroup>
                </div>
                <Textarea
                  label="Note"
                  variant="bordered"
                  placeholder="Enter your Note"
                  disableAnimation
                  disableAutosize
                  {...register('Note', { required: "This is required" })}
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