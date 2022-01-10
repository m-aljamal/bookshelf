import React from "react";
import { useAsync } from "../utils/hook";
import { Spinner } from "components/lib";

const AuthForm = ({ submitButton, onSubmit, register }) => {
  const { isLoading, isError, error, run } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password, name } = event.target.elements;

    run(
      onSubmit({
        email: email.value,
        password: password.value,
        name: register ? name.value : undefined,
      })
    );
  }
  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      {register && (
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className=" bg-gray-200 rounded-sm p-1 block w-full mt-1 "
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className=" bg-gray-200 rounded-sm p-1 block w-full mt-1 "
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className=" bg-gray-200 rounded-sm p-1 block w-full mt-1"
        />
      </div>
      <div>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner /> : null
        )}
      </div>
      {isError ? <div className="text-red-500">{error.message}</div> : null}
    </form>
  );
};

export default AuthForm;
