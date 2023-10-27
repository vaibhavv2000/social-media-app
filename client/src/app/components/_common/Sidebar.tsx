import {AiOutlineHome,AiOutlinePlus} from "react-icons/ai";
import {GoSearch} from "react-icons/go";
import {MdSunny} from "react-icons/md";
import {GiNightSleep} from "react-icons/gi";
import {BiMessageSquare} from "react-icons/bi";
import {IoSettingsOutline} from "react-icons/io5";
import {NavigateFunction,useNavigate} from "react-router-dom";
import {toggleUpload} from "../../redux/slices/postSlice";
import {useDispatch,useSelector} from "react-redux";
import {LuCompass} from "react-icons/lu";
import {AppDispatch,RootState} from "../../redux/store";
import useDarkMode from "../../utils/hooks/useDarkMode";

var link = "flex items-center justify-center lg:justify-start space-x-8 hover:bg-gray-50 cursor-pointer p-2 py-3 my-2 hover:rounded-tr-[28px] hover:rounded-br-[28px] lg:pl-5 dark:hover:bg-[rgba(255,255,255,0.09999)]";

var name = "text-lg hidden lg:!inline font-medium dark:text-white";

const Sidebar = (): JSX.Element => {
  const {changeDarkMode} = useDarkMode();
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {user,isDarkMode} = useSelector((state: RootState) => state.user);

  return (
    <aside className="w-[40px] hidden md:!block bg-white sm:w-[80px] lg:w-[20%] sticky top-12 dark:bg-black h-[calc(100vh-48px)]">
      <div className={link} onClick={() => navigate(`/`)}>
        <span className="dark:text-white">
          <AiOutlineHome size={24} />
        </span>
        <span className={name}>Home</span>
      </div>
      <div className={link} onClick={() => navigate(`/search`)}>
        <span className="dark:text-white">
          <GoSearch size={22} />
        </span>
        <span className={name}>Search</span>
      </div>
      <div className={link} onClick={() => navigate(`/explore`)}>
        <span className="dark:text-white">
          <LuCompass size={22} />
        </span>
        <span className={name}>Explore</span>
      </div>
      <div className={link} onClick={() => dispatch(toggleUpload())}>
        <span className="dark:text-white">
          <AiOutlinePlus size={24} />
        </span>
        <span className={name}>Upload</span>
      </div>
      <div className={link}>
        <span className="dark:text-white">
          <BiMessageSquare size={24} />
        </span>
        <span className={name}>Messages</span>
      </div>
      <div
        className={link}
        onClick={() => navigate(`/profile/${user?.username}`)}
      >
        <img
          className="h-6 w-6 rounded-full border-rose-600 border-2"
          alt=""
          src={user?.profile ? user.profile : "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
        />
        <span className={name}>Profile</span>
      </div>
      <div className={link} onClick={() => navigate(`/settings`)}>
        <span className="dark:text-white">
          <IoSettingsOutline size={24} />
        </span>
        <span className={name}>Settings</span>
      </div>
      <hr className="bg-gray-50 opacity-40" />
      <div className={`${link} hidden lg:!flex`}>
        <span className={name}>{isDarkMode ? "DarkMode" : "LightMode"}</span>
        <div className="bg-gray-50 dark:bg-dark_2 h-5 w-12 rounded-full relative">
          <span
            style={{transition: "all 0.3s linear",left: isDarkMode ? "20px" : "0px"}}
            className="rounded-full p-1 bg-white dark:bg-black shadow-md inline-block absolute top-[-5px]"
          >
            {isDarkMode ? (
              <MdSunny size={22} color="gold" onClick={changeDarkMode} />
            ) : (
              <GiNightSleep size={22} color="gold" onClick={changeDarkMode} />
            )}
          </span>
        </div>
      </div>
      {/* mobile darkmode */}
      <div className="lg:hidden flex justify-center my-4">
        <span className="cursor-pointer">
          {!isDarkMode ? (
            <MdSunny size={22} color="gold" onClick={changeDarkMode} />
          ) : (
            <GiNightSleep size={22} color="gold" onClick={changeDarkMode} />
          )}
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
