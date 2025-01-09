import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api";

const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onError: (error) => {
      console.log("Login error", error);
    },
  });
};

export default useLogin;
