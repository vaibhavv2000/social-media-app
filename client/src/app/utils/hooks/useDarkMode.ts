import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {toggleDarkMode} from "../../redux/slices/userSlice";

const useDarkMode = () => {
  const dispatch: AppDispatch = useDispatch();

  const checkDarkMode = (): void => {
    const dm = localStorage.getItem("social-darkmode");
    const html = document.querySelector("html") as HTMLElement;

    if(!dm) return localStorage.setItem("social-darkmode","no");

    if(dm === "yes") {
      html.classList.add("dark");
      dispatch(toggleDarkMode(true));
    } else if(dm === "no") {
      html.classList.remove("dark");
      dispatch(toggleDarkMode(false));
    }
  };

  const changeDarkMode = (): void => {
    const dm = localStorage.getItem("social-darkmode");
    const html = document.querySelector("html") as HTMLElement;

    if(dm === "yes") {
      localStorage.setItem("social-darkmode","no");
      html.classList.remove("dark");
      dispatch(toggleDarkMode(false));
    } else if(dm === "no") {
      localStorage.setItem("social-darkmode","yes");
      html.classList.add("dark");
      dispatch(toggleDarkMode(true));
    }
  };

  return {changeDarkMode,checkDarkMode};
};

export default useDarkMode;
