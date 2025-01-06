"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  function handleTransition() {
    startTransition(() => onDelete(bookingId));
  }

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => setOpen(true)}
        className="group flex justify-center items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        {isPending ? (
          <SpinnerMini />
        ) : (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        )}
      </button>
      <Modal open={open} setOpen={setOpen} onClick={handleTransition} />
    </>
  );
}

function Modal({ open, setOpen, onClick }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-primary-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-primary-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-900 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-accent-700"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-white-200"
                  >
                    Delete Reservation
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Are you sure you want to delete your reservation? It will
                      be permanently removed from your account. This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onClick();
                }}
                className="inline-flex w-full justify-center rounded-md bg-accent-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 transition-all sm:ml-3 sm:w-auto"
              >
                Delete Reservation
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-800 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteReservation;
