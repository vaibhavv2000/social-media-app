import {API} from "../functions/API";
import {useSelector,useDispatch} from "react-redux";
import {AppDispatch,RootState} from "../../redux/store";
import {logout as logout_user} from "../../redux/slices/userSlice";

const useAuth = () => {
  const {isAuth} = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const logout = async () => {
    try {
      await API.delete("/auth/logout");
      localStorage.removeItem("social-user");
      localStorage.removeItem("social-darkmode");
      const html = document.querySelector("html");
      html?.classList.remove("dark");
      dispatch(logout_user());
    } catch(error) {
      console.log({error});
    }
  };

  const deleteUser = async () => {
    try {
      await API.delete("/auth/deleteuser");
      localStorage.removeItem("social-user");
      localStorage.removeItem("social-darkmode");
      const html = document.querySelector("html");
      html?.classList.remove("dark");
      dispatch(logout_user());
    } catch(error) {
      console.log({error});
    }
  };

  return {isAuth,logout,deleteUser};
};

export default useAuth;
