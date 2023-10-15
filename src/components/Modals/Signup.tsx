import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import styled from "styled-components";

type Props = {};

const Signup = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type }));
  };
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all the fields");
    e.preventDefault();
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
  return (
    <Container>
      <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium ">Register to DevCode </h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2 ">
            Your Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400
      "
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium block mb-2 "
          >
            Display Name
          </label>
          <input
            onChange={handleChangeInput}
            type="displayName"
            name="displayName"
            id="displayName"
            className="
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400
      "
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium block mb-2 ">
            Your Password
          </label>
          <input
            onChange={handleChangeInput}
            type="password"
            name="password"
            id="password"
            className="
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400 
      "
            placeholder="****"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-sm font-medium ">
          Already have an account?
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => handleClick("login")}
          >
            Log In
          </a>
        </div>
      </form>
    </Container>
  );
};

export default Signup;

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
