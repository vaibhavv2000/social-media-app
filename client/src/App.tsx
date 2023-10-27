import useDarkMode from "./app/utils/hooks/useDarkMode";
import {lazy,useEffect} from "react";
import {AppDispatch} from "./app/redux/store";
import {useDispatch} from "react-redux";
import {login,logout} from "./app/redux/slices/userSlice";
import Navigator from "./app/router/Navigator";
import Upload from "./app/components/_common/Upload";

const App = (): JSX.Element => {
  const {checkDarkMode} = useDarkMode();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => checkDarkMode(),[]);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("social-user");
      console.log({user})
      if(user) dispatch(login(JSON.parse(user)));
      else dispatch(logout());
    };

    checkAuth();
  },[]);

  return (
    <div className="dark:bg-[#131313] min-h-screen">
      <div className="dark:bg-dark_2 min-h-screen max-w-[1440px] mx-auto">
        <Upload />
        <Navigator />
      </div>
    </div>
  );
};

export default App;
