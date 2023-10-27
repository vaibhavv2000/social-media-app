import {lazy} from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../components/_common/Navbar";
import Sidebar from "../components/_common/Sidebar";
import BottomNav from "../components/_common/BottomNav";

const Home = lazy(() => import("../pages/Home"));
const Search = lazy(() => import("../pages/Search"));
const Explore = lazy(() => import("../pages/Explore"));
const Profile = lazy(() => import("../pages/Profile"));
const SinglePost = lazy(() => import("../pages/SinglePost"));
const Settings = lazy(() => import("../pages/Settings"));

const Main = (): JSX.Element => {
 return ( 
  <div>
   <Navbar />
   <div className="flex pb-20 md:pb-0">
    <Sidebar />
    <Routes>
     <Route path="/" Component={Home} />
     <Route path="/search" Component={Search} />
     <Route path="/explore" Component={Explore} />
     <Route path="/profile/:user" Component={Profile} />
     <Route path="/singlepost" Component={SinglePost} />
     <Route path="/settings/*" Component={Settings} />
    </Routes>
   </div>
   <BottomNav />
  </div>
 );
};

export default Main;
