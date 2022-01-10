import React from "react";
import { useAuth } from "context/auth-context";
import AuthForm from "components/AuthForm";
import Logo from "components/Logo";
import { Modal, ModalContents, ModalOpenButton } from "components/Modal";

const UnAuthApp = () => {
  const { login, register } = useAuth();
  return (
    <div className=" flex flex-col items-center justify-center h-screen w-full  ">
      <Logo width="80" height="80" />
      <h1 className="text-xl font-bold my-2 text-gray-800">Bookshelf</h1>

      <div className="flex space-x-4">
        <Modal>
          <ModalOpenButton>
            <button className="btn w-24">Login</button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <AuthForm
              submitButton={<button className="btn">Login</button>}
              onSubmit={login}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <button className="btn w-24 bg-gray-300">Register</button>
          </ModalOpenButton>
          <ModalContents aria-label="Register form" title="Register">
            <AuthForm
              submitButton={<button className="btn">Register</button>}
              onSubmit={register}
              register
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
};

export default UnAuthApp;
