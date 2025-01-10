import { useMutation } from "@tanstack/react-query";
import { postDeleteAccount } from "../api";

const useUnlink = () => {
  return useMutation({
    mutationFn: postDeleteAccount,
    onError: (error) => {
      console.log("Delete account error", error);
    },
  });
};

export default useUnlink;
