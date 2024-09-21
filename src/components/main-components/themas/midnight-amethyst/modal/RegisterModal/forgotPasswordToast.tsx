import { useAppContext } from '@/context/AppContext'
import React from 'react'
import toast, { Toast } from 'react-hot-toast'
import { BsX } from 'react-icons/bs'

const ForgotPasswordToast = ({ t, message }: { t: Toast, message: string }) => {
  const { loginOnModal } = useAppContext();
  return (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-900 dark:text-white font-bold">
              {message}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
              Bu e-posta adresiyle zaten bir hesap var.<br/>
              Giriş yapmak için
              <button
                onClick={loginOnModal}
                className='text-blue-600 hover:text-blue-800 dark:text-blue-300 hover:dark:text-blue-500 ml-1'>buraya</button> tıklayın veya
              <button className='text-blue-600 hover:text-blue-800 dark:text-blue-300 hover:dark:text-blue-500'>Şifremi Unuttum</button> adımına gidin.
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-600">
        <button
          onClick={() => toast.remove(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-4xl font-medium text-indigo-600 hover:text-indigo-400  dark:text-indigo-100 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <BsX />
        </button>
      </div>
    </div>
  )
}

export default ForgotPasswordToast