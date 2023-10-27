import {useState,ChangeEvent,FormEvent,useEffect} from "react";
import {useNavigate,NavigateFunction} from "react-router-dom";
import {API} from "../utils/functions/API";
import {login} from "../redux/slices/userSlice";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {input} from "./Login";

const Register = (): JSX.Element => {
  const [user,setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error,setError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((p) => ({...p,[e.target.name]: e.target.value}));
  };

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const navigate: NavigateFunction = useNavigate();

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {name,username,email,password} = user;

    if(name && password && email && username) {
      try {
        const res = await API.post(`/auth/register`,user);

        if(res.status === 201) {
          const {user} = res.data;

          console.log("register successs", user);

          localStorage.setItem("social-user",JSON.stringify(user));

          dispatch(login(user[0]));
          navigate("/");
        }
      } catch(error: any) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="h-[80%] md:w-[50%] w-[86%] sm:w-[75%] lg:w-[80%] flex sm:shadow-md flex-row-reverse">
        <div className="flex-1 hidden lg:!grid place-items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/020/043/non_2x/people-enjoying-holidays-during-summer-illustration-vector.jpg"
            alt=""
            className="h-[100%] w-[90%] object-cover"
          />
        </div>
        <div className="flex-1 flex justify-center items-center sm:bg-[#faf9f92c]">
          <form className="sm:w-72 w-[90%]" onSubmit={register}>
            <h1 className="text-5xl text-center font-lora font-semibold text-primary mb-5">
              Register
            </h1>
            <div className="relative my-4">
              <input
                className={input}
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                className={input}
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                className={input}
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={`relative my-${error ? 2 : 4}`}>
              <input
                className={input}
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className={`relative my-${error ? 2 : 4}`}>
              <input
                type="submit"
                className="text-white bg-primary w-full p-3 font-semibold rounded-sm border-none outline-none cursor-pointer font-lora text-[14px]"
                value={"Create My Account"}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-[0.5px] bg-gray-400 flex-1"></div>
              <p className="text-slate-400 text-[12px]">Already have an Account?</p>
              <div className="h-[0.5px] bg-gray-400 flex-1"></div>
            </div>
            <div className="my-4">
              <button
                className="w-full border font-inter text-sm border-primary text-primary p-2 hover:bg-gray-50"
                onClick={() => navigate("/")}
              >
                Sign in to Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
