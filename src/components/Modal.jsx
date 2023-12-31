import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="z-10 relative w-full ">
      <div
        className="w-screen h-screen fixed inset-0 bg-slate-900  bg-opacity-70 "
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="h-auto w-44 md:w-[500px]  min-h-[250px] absolute top-0 left-52 md:-left-96 -translate-x-full -translate-y-44 md:translate-y-1/2 bg-slate-800 p-4 rounded-2xl shadow-modalShadow">
        <div className="flex items-center  justify-between mb-4 pb-2 border-b-[1px] border-slate-600">
          <h2 className="text-slate-200">title</h2>
          <button onClick={() => setIsOpen(false)}>
            <XCircleIcon className="w-6 h-6 text-red-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
