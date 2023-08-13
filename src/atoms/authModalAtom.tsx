import { atom } from "recoil";

type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

const initialModalState: AuthModalState = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: initialModalState,
});
