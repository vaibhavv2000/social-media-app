import {useState,ChangeEvent,FormEvent,useEffect} from "react";
import {useNavigate,NavigateFunction} from "react-router-dom";
import {API} from "../utils/functions/API";
import {login as login_user} from "../redux/slices/userSlice";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";

export var input = "border-[1.9px] border-gray-300 outline-none focus:border-2 focus:border-primary p-2 py-3 w-full rounded-sm text-[14px]";

const Login = (): JSX.Element => {
  const [user,setUser] = useState<string>("");
  const [pwd,setPwd] = useState<string>("");
  const [error,setError] = useState<string>("");

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const navigate: NavigateFunction = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(user && pwd) {
      try {
        const res = await API.post(`/auth/login`,{user,
          password: pwd,
        });

        if(res.status === 200) {
          const {user} = res.data;
          dispatch(login_user(user));
          localStorage.setItem("social-user",JSON.stringify(user));
          navigate("/");
        }
      } catch(error: any) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="h-[70%] md:w-[50%] w-[86%] sm:w-[75%] lg:w-[78%] flex sm:shadow-md">
        <div className="flex-1 hidden lg:!grid place-items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/020/043/non_2x/people-enjoying-holidays-during-summer-illustration-vector.jpg"
            alt=""
            className="h-[100%] w-full"
          />
        </div>
        <div className="flex-1 flex justify-center items-center sm:bg-[#faf9f92c]">
          <form className="sm:w-72 w-[90%]" onSubmit={login}>
            <h1 className="text-5xl text-center font-lora font-semibold text-primary mb-5">
              Login
            </h1>
            <div className="relative my-4">
              <input
                className={input}
                placeholder="Username or Email"
                value={user}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser(e.target.value)
                }
              />
            </div>
            <div className={`relative my-${error ? 2 : 4}`}>
              <input
                className={input}
                placeholder="Password"
                type="password"
                value={pwd}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPwd(e.target.value)
                }
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className={`relative my-${error ? 2 : 4}`}>
              <input
                type="submit"
                className="text-white bg-primary w-full p-3 font-semibold rounded-sm border-none outline-none cursor-pointer font-lora text-[14px]"
                value={"Sign In"}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-[0.5px] bg-gray-400 flex-1"></div>
              <p className="text-slate-400 text-[12px]">Don't have an Account?</p>
              <div className="h-[0.5px] bg-gray-400 flex-1"></div>
            </div>
            <div className="my-4">
              <button
                className="w-full border font-inter text-sm border-primary text-primary p-2 hover:bg-gray-50"
                onClick={() => navigate("/register")}
              >
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
