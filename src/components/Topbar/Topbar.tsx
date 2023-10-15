import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { Problem } from "@/utils/types/problem";
import devCode from "../../../public/images/devCode2.png";
import styled from "styled-components";

const Container = styled.div`
  background: #2490dd;

  .logo {
    filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
  }

  .logo_a {
    filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.7));
  }
  .topbar_button {
    color: #ffffff;
    background: #0b8fed;
    border: 1px solid #ffffff;
    padding: 0.5rem 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .topbar_button:hover {
    background: white;
    color: #0b8fed;
    border: 1px solid #0b8fed;
  }
  .profile_pop {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #2490dd;
    color: #ffffff;
    border: 1px solid #ffffff;
  }
`;
type Props = { problemPage?: boolean };

const Topbar: React.FC<Props> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction; //
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Container>
      <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5  text-dark-gray-7">
        <div
          className={`flex w-full items-center justify-between ${
            !problemPage ? "max-w-[1200px] mx-auto" : ""
          }`}
        >
          <Link href="/" className="h-[22px] flex-1 logo_a">
            <Image
              src={devCode}
              alt="Logo"
              className="logo"
              height={150}
              width={150}
            />
            {/* <Image src="/logo-full.png" alt="Logo" height={100} width={100} /> */}
          </Link>
          {problemPage && (
            <div className="flex items-center gap-4 flex-1 justify-center">
              <div
                className="flex items-center justify-center rounded dark-full-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                onClick={() => handleProblemChange(false)}
              >
                <FaChevronLeft />
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 font-medium max-w[170px] text-dark-gray-8 cursor-pointer"
              >
                <div>
                  <BsList />
                </div>
                <p>ProblemsList</p>
              </Link>
              <div
                className="flex items-center justify-center rounded dark-full-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                onClick={() => handleProblemChange(true)}
              >
                <FaChevronRight />
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-brand-orange topbar_button py-1.5 px-3 cursor-pointer rounded  hover:bg-dark-fill-2"
              >
                Premium
              </a>
            </div>
            {user && problemPage && <Timer />}
            {!user && (
              <Link
                href="/auth"
                onClick={() => {
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "login",
                  }));
                }}
              >
                <button className="topbar_button py-1 px-2 cursor-pointer rounded">
                  Sign In
                </button>
              </Link>
            )}
            {user && (
              <div className="cursor-pointer group relative">
                <img src="/avatar.png" className="h-8 w-8 rounded-full" />
                <div
                  className="profile_pop absolute top-10 left-2/4 -translate-x-2/4 mx-auto    p-2 
              rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out"
                >
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            )}
            {user && <Logout />}
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Topbar;
