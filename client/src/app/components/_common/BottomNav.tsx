import {AiOutlineHome,AiOutlinePlus} from "react-icons/ai";
import {GoSearch} from "react-icons/go";
import {LuCompass} from "react-icons/lu";
import {NavigateFunction,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {AppDispatch,RootState} from '../../redux/store';
import {useState} from "react";
import {toggleUpload} from "../../redux/slices/postSlice";

var name = "text-[12px] dark:text-white hidden xs:!block px-2";
var active_name = "text-[12px] font-medium dark:text-white hidden xs:!block px-2";

var link = 'flex flex-1 flex-col gap-1 h-full p-2 items-center cursor-pointer';

var icon_holder = 'dark:text-white h-6 w-6 xs:h-6 xs:w-6 grid place-items-center';

const BottomNav = () => {
 const [isActive,setIsActive] = useState<number>();
 const navigate: NavigateFunction = useNavigate();
 const dispatch: AppDispatch = useDispatch();
 const {user} = useSelector((state: RootState) => state.user);

 function nav(name: number, path?: string) {
    setIsActive(name)
    if(path) navigate(`${path}`);
 };

 return (
  <nav className='fixed md:!hidden flex justify-evenly bg-white shadow-lg w-full bottom-0 dark:bg-dark_2 left-0'>
   <div className={link} onClick={() => nav(1,"/")}>
    <span className={icon_holder}>
     <AiOutlineHome size={18} />
    </span>
    <span className={isActive === 1 ? active_name : name}>Home</span>
   </div>
   <div className={link} onClick={() => nav(2,"/search")}>
    <span className={icon_holder}>
     <GoSearch size={18} />
    </span>
    <span className={isActive === 2 ? active_name : name}>Search</span>
   </div>
   <div className={link} onClick={() => {
     nav(3); 
     dispatch(toggleUpload());
   }}>
    <span className={icon_holder}>
     <AiOutlinePlus size={20} />
    </span>
    <span className={isActive === 3 ? active_name : name}>Upload</span>
   </div>
   <div className={link} onClick={() => nav(4,"/explore")}>
    <span className={icon_holder}>
     <LuCompass size={18} />
    </span>
    <span className={isActive === 4 ? active_name : name}>Explore</span>
   </div>
   <div className={link} onClick={() => nav(5,`/profile/${user?.username}`)}>
    <span className={icon_holder}>
    <img
     className="h-6 w-6 rounded-full border-rose-600 border-2"
     alt=""
     src={ user?.profile ? user.profile : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0THAxrPLhQck7guIxwq9QoOReWKvKGdOtriQsT3DAA&usqp=CAU&ec=48665698"
     }
    />
    </span>
    <span className={isActive === 5 ? active_name : name}>Profile</span>
   </div>
  </nav>
 );
};

export default BottomNav;