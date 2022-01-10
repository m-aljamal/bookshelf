import Dialog from "@reach/dialog";
import React, { createContext, FC, useContext } from "react";
import "@reach/dialog/styles.css";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = createContext(false);

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div className="flex justify-end ">
        <ModalDismissButton>
          <button className=" rounded-md p-0 w-[40px] h-[40px] flex center  ">
            x
          </button>
        </ModalDismissButton>
      </div>
      <h3 className="font-bold text-center">{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalContents, ModalOpenButton, ModalDismissButton };
