import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import styled from "styled-components";

type Props = {};

const ResetPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success("Password Reset Mail sent", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error) {
      // alert(error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [error]);

  return (
    <Container>
      <form
        className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
        onSubmit={handleReset}
      >
        <h3 className="text-xl font-medium ">Reset Password</h3>
        <p className="text-sm ">
          Forgotten your passowrd? Enter your e-mail address below, and
          we&pos;ll send you an e-mail allowing you to reset it
        </p>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400
      "
            placeholder="name@company.com"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          Reset Password
        </button>
      </form>
    </Container>
  );
};

export default ResetPassword;

const Container = styled.div`
  .authBox {
    background: white;
    color: #0b8fed;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .authForm {
    color: #0b8fed;
  }
  input {
    background: #bdcedd;
  }
  input::placeholder {
    color: #008bff;
  }
  a {
    color: #0466ad;
    font-weight: bold;
    text-decoration: underline;
  }
  button[type="submit"] {
    background: #0b8fed;
    color: white;
  }
`;
