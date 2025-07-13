// AuthPage.jsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="min-h-screen bg-gray-100 w-screen flex flex-col justify-center items-center">
      {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
    </div>
  );
};

export default AuthPage;
