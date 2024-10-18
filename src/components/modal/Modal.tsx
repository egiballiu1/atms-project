import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { type FC, type PropsWithChildren, useState } from "react"
import { Button } from "../button"
import { XMarkIcon } from "@heroicons/react/20/solid"

type ModalProps = PropsWithChildren<{
  label: string
  modalTitle?: string
}>

const Modal: FC<ModalProps> = ({ children, label, modalTitle }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        label={label}
        buttonStyle={"primary"}
        onClick={() => setIsOpen(true)}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-950/[.3]">
         
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-xl w-full group relative">
          <XMarkIcon
            className="absolute top-2 right-2 w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition-opacity"
            onClick={() => setIsOpen(false)}
          />
            <DialogTitle className="font-bold">{modalTitle}</DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export { Modal }
