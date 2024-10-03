import ChatNoteService from '@/services/actions/chatNote'
import { CreateChatNoteResponse } from '@/services/actions/chatNote/type'
import { ResponseStatus } from '@/types/baseType'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import moment from 'moment'
import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
moment.locale();
const ChatInformationItem = ({ item, isLeft, chatNotes, setChatNotes }: { item: CreateChatNoteResponse, isLeft: boolean, chatNotes: CreateChatNoteResponse[], setChatNotes: React.Dispatch<React.SetStateAction<CreateChatNoteResponse[]>> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteNote = async () => {
    console.log(item);

    const res = await ChatNoteService.deleteChatNote({ id: item.id });
    if (res.status == ResponseStatus.Ok) {
      setChatNotes(chatNotes.filter(x => x.id != item.id))
      setIsOpen(false);
      toast.success("delete successful");
    }
    else {
      toast.error("delete error");
    }
  }
  return (
    <div className={twMerge('w-full text-xs flex align-middle items-start justify-between p-1 rounded', (isLeft ? "col-start-1 bg-blue-100 border border-blue-400" : "col-start-2 bg-gray-100 border border-gray-400"))}>
      <div>
        <div>{item?.note}</div>
        <div>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
      <div className='cursor-pointer'>
        <Popover
          showArrow
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          placement="right"
          classNames={{
            base: [
              "before:bg-default-200"
            ],
            content: [
              "py-3 px-4 border border-default-200",
              "bg-gradient-to-br from-white to-default-300",
              "dark:from-default-100 dark:to-default-50",
            ],
          }}
        >
          <PopoverTrigger>
            <Button size='sm' variant='light' isIconOnly>
              <BiX className='text-red-600 hover:text-red-800 cursor-pointer' size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
              <div className="px-1 py-2">
                <h3 className="text-small font-bold" {...titleProps}>
                  Do you want to delete the note?
                </h3>
                <div className='flex gap-2 pt-2 justify-end'>
                  <Button color='danger' size='sm' onClick={() => deleteNote()}>Yes</Button>
                  <Button color='primary' size='sm' onClick={() => setIsOpen(false)}>No</Button>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

      </div>
    </div>
  )
}

export default ChatInformationItem