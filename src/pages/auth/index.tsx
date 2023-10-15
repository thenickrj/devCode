import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import NavBar from "@/components/NavBar/NavBar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import blue_bg from "../../../public/images/blue_bg.jpg";
import devCode from "../../../public/images/devCode.png";

type AuthPageProps = {};

const Container = styled.div`
  background: url(${blue_bg.src});

  .hero_img {
    background: #ffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
  }
`;

const AuthPage = (props: AuthPageProps) => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pagesLoading, setPageLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/");
    console.log(loading, user);
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);
  if (pagesLoading) return null;

  return (
    <Container>
      {/* <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative"> */}
      <div className="">
        <div className="max-w-7xl mx-auto">
          <NavBar />
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img className="hero_img" src="/hero.png" alt="" />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </Container>
  );
};

export default AuthPage;
