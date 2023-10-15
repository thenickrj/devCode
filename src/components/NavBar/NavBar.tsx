import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
import devCode from "../../../public/images/devCode2.png";
import styled from "styled-components";

const Container = styled.div`
  .logo {
    filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
  }
  .login_button{
    background: #0b8fed;
    border: 1px solid white;
    padding: 0.5rem 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .login_button:hover{
    background: white;
    color: #0b8fed;
    border: 1px solid #0b8fed;
  }  
  }
`;
type Props = {};

const NavBar = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <Container>
      <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
        <Link href="/" className="flex items-center justify-center h-20">
          {/* <img src=" alt="DevCode" className="h-full" /> */}
          {/* <Image src="/logo.png" alt="DevCode" height={200} width={200} /> */}
          <Image
            className="logo"
            src={devCode}
            alt="DevCode"
            height={200}
            width={200}
          />
        </Link>
        <div className="flex items-center">
          <button
            className="login_button bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium 
        hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
         transition duration-300-ease-in-out"
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
