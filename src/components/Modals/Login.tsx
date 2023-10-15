import { authModalState } from "@/atoms/authModalAtom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import styled from "styled-components";
import { toast } from "react-toastify";

type Props = {};

const Login = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const notify = () => toast("Wow so easy!");

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type }));
  };
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInwithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return toast.error("Please fill all the fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    try {
      const newUser = await signInwithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      // alert(error.message);
      toast("Wow so easy!");
    }
  };
  useEffect(() => {
    if (error) {
      // alert(error.message);
      if (
        "Firebase: Error (auth/wrong-password)".indexOf("auth/wrong-password") >
        -1
      ) {
        toast.error("Wrong credentials", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [error]);
  return (
    <Container>
      <form className="authForm space-y-6 px-6 py-4" onSubmit={handleLogin}>
        <h2 className="text-xl font-medium ">Sign In </h2>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2 ">
            Your Email
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="email"
            className="input
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 
        "
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium block mb-2 ">
            Your Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
            className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 
        "
            placeholder="****"
          />
        </div>
        <button
          type="submit"
          className="w-full focus:ring-blue-300 font-medium rounded-lg 
      text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <button className="flex w-full justify-end">
          <a
            href="#"
            className="text-sm block text-brand-orange hover:underline- w-full text-right"
            onClick={() => handleClick("forgotPassword")}
          >
            Forgot Password?
          </a>
        </button>
        <div className="text-sm font-medium ">
          Not Registered?{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => handleClick("register")}
          >
            Create Account
          </a>
        </div>
      </form>
    </Container>
  );
};

export default Login;

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
