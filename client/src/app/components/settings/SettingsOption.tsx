import {useState,useEffect} from "react";
import {AiFillStar,AiOutlineSecurityScan} from "react-icons/ai";
import {BsBookmark,BsInfoCircle} from "react-icons/bs";
import {HiOutlineUserGroup} from "react-icons/hi";
import {MdOutlinePerson4,MdOutlineLogout} from "react-icons/md";
import {RiDeleteBin6Line,RiPagesLine} from "react-icons/ri";
import {NavigateFunction,useNavigate} from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import {MdSunny} from "react-icons/md";
import {GiNightSleep} from "react-icons/gi";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import useDarkMode from "../../utils/hooks/useDarkMode";

var link = "flex items-center space-x-4 hover:bg-gray-50 cursor-pointer px-2.5 py-2.5 dark:hover:bg-[rgba(255,255,255,0.09999)] duration-500 hover:rounded-full";

var name = "font-[500] dark:text-white";

const SettingsOption = (): JSX.Element => {
  const [showDel,setShowDel] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const {logout,deleteUser} = useAuth();
  const {isDarkMode} = useSelector((state: RootState) => state.user);
  const {changeDarkMode} = useDarkMode();

  useEffect(() => {
    document.title = `Settings`;
  }, []);

  return (
    <nav className="py-2 w-full md:w-[70%] lg:w-[50%] shadow-md h-full dark:bg-[#121212]">
      <h1 className="text-xl px-4 md:text-4xl dark:text-white font-bold my-2">Settings</h1>
      <div className="p-1">
        {/*  */}
        <div className={link} onClick={() => navigate(`/settings/update`)}>
          <span className="dark:text-white">
            <MdOutlinePerson4 size={24} />
          </span>
          <span className={name}>Edit Profile</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <AiOutlineSecurityScan size={24} />
          </span>
          <span className={name}>Security</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <HiOutlineUserGroup size={24} />
          </span>
          <span className={name}>Groups</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <RiPagesLine size={24} />
          </span>
          <span className={name}>Pages</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <BsBookmark size={24} />
          </span>
          <span className={name}>Bookmarks</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <AiFillStar size={24} />
          </span>
          <span className={name}>Featured</span>
        </div>
        {/*  */}
        {/*  */}
        <div className={link}>
          <span className="dark:text-white">
            <BsInfoCircle size={24} />
          </span>
          <span className={name}>About Us</span>
        </div>

        <div className={`${link} lg:hidden`} onClick={changeDarkMode}>
          <span className="cursor-pointer">
            {!isDarkMode ? (
              <MdSunny size={22} color="gold" />
            ) : (
              <GiNightSleep size={22} color="gold" />
            )}
          </span>
          <span className={name}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>

        {/*  */}
        <div className="px-3 my-1">
          <hr />
        </div>
        {/*  */}
        <div
          className={`${link} hover:!bg-blue-500 hover:text-white`}
          onClick={logout}
        >
          <span className="dark:text-white">
            <MdOutlineLogout size={24} />
          </span>
          <span className={name}>Logout</span>
        </div>
        {/*  */}
        <div
          className={`${link} hover:!bg-red-600 hover:text-white`}
          onClick={() => setShowDel(true)}
        >
          <span className="dark:text-white">
            <RiDeleteBin6Line size={24} />
          </span>
          <span className={name}>Delete Account</span>
        </div>
        {/*  */}
        {/* delete */}
        {showDel && (
          <div
            className={`grid fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.11111)] place-items-center z-[9999999999999999] dark:bg-[rgba(0,0,0,0.22222)]`}
          >
            <div className="bg-white dark:bg-dark_2 p-3 w-56 rounded-lg shadow-md">
              <h1 className="dark:text-white text-[15px] font-bold">Account Deletion Request</h1>
              <p className="dark:text-white/80 text-[12px] mt-2">
                Are you sure you want to delete your Account?
              </p>
              <div className="flex items-center justify-end mt-6 space-x-5 px-3">
                <span
                  className="text-primary text-[12px] cursor-pointer"
                  onClick={() => setShowDel(false)}
                >
                  Cancel
                </span>
                <span
                  className="text-red-500 text-[12px] cursor-pointer"
                  onClick={deleteUser}
                >
                  Yes
                </span>
              </div>
            </div>
          </div>
        )}
        {/*  */}
      </div>
    </nav>
  );
};

export default SettingsOption;
