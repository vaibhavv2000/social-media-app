import {memo} from "react";
import {NavigateFunction,useNavigate} from "react-router-dom";

interface props {
  photos: {
    photo: string;
    postId: number;
  }[];
};

const ExplorePosts = ({photos}: props): JSX.Element => {
 const navigate: NavigateFunction = useNavigate();

 return (
  <div
   className="p-3 w-full gap-3 grid grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows auto-rows-[100px] sm:auto-rows-[150px] md:auto-rows-[200px]"
  >
   {photos.map((item) => (
    <div
     key={String(`p${Math.random()}`)}
     className="rounded-md overflow-hidden cursor-pointer relative"
     onClick={() =>navigate(`/singlepost`,{state: {postId: item.postId}})}
    >
     <div className="h-full w-full absolute bg-transparent hover:bg-[rgba(0,0,0,0.333)] duration-300">
    </div>
    <img
      alt=""
      className="h-full w-full object-cover"
      crossOrigin={item.photo.startsWith("https") ? undefined : "use-credentials"}
        src={`${item.photo.startsWith("https") ? item.photo : `http://localhost:9000/images/${item.photo}`}`
      } 
    />
   </div>
   ))}
  </div>
  );
};

export default memo(ExplorePosts);
