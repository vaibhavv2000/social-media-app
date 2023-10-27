import {NavigateFunction,useNavigate} from "react-router-dom";
import People from "./People";

interface props {
  randomUsers: {
    id: number;
    name: string;
    username: string;
    profile: string;
  }[];
  randomPhotos: {photo: string; postId: number}[];
}

const Rightbar = (props: props): JSX.Element => {
 const {randomPhotos,randomUsers} = props;
 const navigate: NavigateFunction = useNavigate();

 return (
  <div className="sticky top-12 p-3 dark:bg-black lg:h-[calc(100vh-48px)]">
   <div className="dark:bg-[#111] px-3 py-1.5 rounded-md mb-3 shadow-sm w-full">
    <h1 className="text-2xl dark:text-white font-bold my-2 mb-3">
      Photos Around The World
    </h1>
    <div className="flex flex-wrap gap-2">
    {randomPhotos?.map((item,index: number) => (
     <div
      className="h-20 w-20 rounded-md relative overflow-hidden cursor-pointer"
      key={String(`pp${index}`)}
      onClick={() => navigate(`/singlepost`,{state: {postId: item.postId}})}
     >
      <div className="absolute h-full w-full bg-transparent hover:bg-[rgba(0,0,0,0.1)] duration-300"></div>
       <img
        alt=""
        crossOrigin={item.photo.startsWith("https") ? undefined : "use-credentials"}
        src={`${item.photo.startsWith("https") ? item.photo : `http://localhost:9000/images/${item.photo}`}`}
        key={`ph${Math.random().toString()}`}
        className="object-cover h-full w-full"
       />
     </div>
    ))}
    </div>
   </div>

   {/* People you may know  */}
   <div className="dark:bg-[#111] p-1 rounded-md w-full shadow-sm">
    <h1 className="text-2xl dark:text-white px-3 font-bold my-2 mb-3">
      People you may know
    </h1>
    <People users={randomUsers} />
   </div>
  </div>
 );
};

export default Rightbar;
