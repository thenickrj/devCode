import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

type Props = {};

const Logout: React.FC = (props: Props) => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
  };
  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-white"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
