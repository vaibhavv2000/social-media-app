import {gql,useMutation} from "@apollo/client";
import {ChangeEvent,FormEvent,useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../../redux/store";
import {login} from "../../redux/slices/userSlice";

var input = "outline-none p-2 border-b border-gray-300 dark:bg-[#0f0f0f] dark:text-white";

const UPDATE_USER = gql`
  mutation UserUpdate(
    $name: String
    $username: String
    $email: String
    $bio: String
    $profile: String
    $cover: String
  ) {
    update_user(
      name: $name
      username: $username
      email: $email
      bio: $bio
      profile: $profile
      cover: $cover
    ) {
      name
      username
      email
      bio
      profile
      cover
    }
  }
`;

const UpdateProfile = (): JSX.Element => {
  const [user,setUser] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    profile: "",
    cover: "",
  });

  const c_user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();

  console.log("userrrrr",c_user);

  const {name,bio,email,username,profile,cover} = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser((p) => ({...p,[e.target.name]: e.target.value}));
  };

  const [updateUser,{data: updated_user}] = useMutation(UPDATE_USER);

  useEffect(() => {
    // @ts-ignore
    setUser(c_user);
  },[c_user]);

  useEffect(() => {
    document.title = `Update your profile`;
  },[]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const res = await API.put("/user/updateuser", user);
      await updateUser({variables: {name,email,bio,username,profile,cover}});

      const n_u = JSON.stringify({id: c_user?.id,...user});
      localStorage.setItem("social-user",n_u);
      dispatch(login({...c_user,id: Number(c_user?.id),...user}));

      alert("Userdata updated");
    } catch(error) {
      console.log({error});
    }
  };

  useEffect(() => {
    if(updated_user) {
      const {__typename,...user} = updated_user.update_user;
      setUser(user);
    }
  },[updated_user]);

  return (
    <div className="py-1 w-full md:w-[70%] lg:w-[50%] shadow-md h-full dark:bg-dark_2">
      <h1 className="text-3xl font-bold dark:text-white p-2">Update Profile
      </h1>
      <form className="flex flex-col space-y-4 p-3" onSubmit={handleUpdate}>
        <div className="flex items-center space-x-5">
          <label className="w-20 dark:text-white">Name:</label>
          <input
            value={name}
            name="name"
            onChange={handleChange}
            className={input}
          />
        </div>
        {/*  */}
        <div className="flex items-center space-x-5">
          <label className="w-20 dark:text-white">Username:</label>
          <input
            value={username}
            name="username"
            onChange={handleChange}
            className={input}
          />
        </div>
        {/*  */}
        <div className="flex items-center space-x-5">
          <label className="w-20 dark:text-white">Email:</label>
          <input
            value={email}
            name="email"
            onChange={handleChange}
            className={input}
          />
        </div>
        {/*  */}
        <div className="flex items-start space-x-5">
          <label className="w-20 mt-2 dark:text-white">Bio:</label>
          <textarea
            value={bio}
            name="bio"
            onChange={handleChange}
            className="outline-none p-2 border-b border-gray-300 resize-none dark:bg-[#0f0f0f] dark:text-white w-[235px] h-24"
          ></textarea>
        </div>
        {/*  */}
        <div className="flex items-center space-x-5">
          <label className="w-20 dark:text-white">Profile:</label>
          <input
            value={profile || ""}
            name="profile"
            onChange={handleChange}
            className={input}
          />
        </div>
        {/*  */}
        <div className="flex items-center space-x-5">
          <label className="w-20 dark:text-white">Cover:</label>
          <input
            value={cover || ""}
            name="cover"
            onChange={handleChange}
            className={input}
          />
        </div>
        {/*  */}
        <div className="flex justify-end p-1">
          <button
            type="submit"
            className="bg-black dark:bg-black hover:opacity-60 text-white rounded-md font-medium py-3 px-6 duration-500 text-[14px]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
