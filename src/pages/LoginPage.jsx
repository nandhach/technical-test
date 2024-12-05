import React from "react";
import Form from "../components/Form.jsx";
import DecorationForm from "../components/DecorationForm.jsx";

const LoginPage = () => {
  return (

    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Form />
      </div>
      <div className="hidden relative items-center justify-center w-1/2 lg:flex h-full bg-gray-200 flex-col rounded-3xl">
        <DecorationForm />
      </div>
    </div>
  );
};

export default LoginPage;
