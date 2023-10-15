import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  .authBox {
    background: white;
    color: #0b8fed;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .authForm {
    color: #0b8fed;
  }
  button[type="button"] {
  }
`;
type Props = {};

const AuthModal = (props: Props) => {
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModal();
  return (
    <Container>
      <div
        className="absolute top-0 lef-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center transition-opacity duration-300 ease-in-out">
        <div className=" relative w-full h-full mx-auto flex items-center justify-center">
          <div className="authBox bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-dark-yellow to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg-text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 "
                onClick={closeModal}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {authModal.type === "login" ? (
              <Login />
            ) : authModal.type === "register" ? (
              <Signup />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthModal;

function useCloseModal() {
  const setAuthMoodal = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthMoodal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  });
  return closeModal;
}
