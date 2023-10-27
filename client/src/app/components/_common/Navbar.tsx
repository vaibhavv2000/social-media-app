import {IoSettingsOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const Navbar = (): JSX.Element => {
 const navigate = useNavigate();
  
 return (
  <nav className="sticky z-50 bg-white top-0 shadow-sm dark:shadow-none">
   <div className="dark:bg-black bg-white w-full flex justify-between items-center">
    <h1 
     className="text-2xl font-lora font-bold p-2 pl-5 shadow-sm dark:text-white cursor-pointer"
     onClick={() => navigate(`/`)}>
      SocialApp
    </h1>
    <span 
      className="dark:text-white pr-4 md:!hidden cursor-pointer" 
      onClick={() => navigate(`/settings`)}>
      <IoSettingsOutline size={24} />
    </span>
   </div>
  </nav>
 );
};

export default Navbar;