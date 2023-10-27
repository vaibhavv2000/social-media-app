import {gql,useMutation} from "@apollo/client";
import {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useParams} from "react-router-dom";

const FOLLOW_USER = gql`
 mutation followUser($userId: ID!) {
  follow_user(userId: $userId) {
   msg
  }
 }
`;

var cover = "https://img.freepik.com/free-psd/3d-illustration-man-uses-magnet-attract-target_1150-65970.jpg?size=626&ext=jpg&ga=GA1.1.1990816494.1696060907&semt=ais";

var profile = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1990816494.1696060907&semt=sph";

interface props {
 data: any;
 setFollowers: React.Dispatch<React.SetStateAction<number>>;
};

const ProfileTop = (props: props) => {
  const {data, setFollowers} = props;
  console.log({props})

  console.log('email', props.data.followers)
 
 const [isFollowing,setISFollowing] = useState<boolean>(false);
 
 const {user} = useParams();

 const [followUser] = useMutation(FOLLOW_USER);

 const c_user = useSelector((state: RootState) => state.user.user);

 const follow = (mode: "follow" | "unfollow") => {
  if(mode === "follow") {
   setFollowers((p) => p + 1);
   setISFollowing(true);
  } else {
   setFollowers((p) => p - 1);
   setISFollowing(false);
  }
    
  followUser({variables: {userId: data?.id}});
 };

 useEffect(() => {
  if(data) {
   setFollowers(data.followers);
   setISFollowing(data.isFollowing);
  }
 },[data,setFollowers]);

 return (
  <div>
    <div className="relative">
     <img
       src={data?.cover || cover}
       alt=""
       className="w-full h-60 md:h-80 object-cover"
     />
     <div className="shadow-lg h-20 w-20 md:h-32 md:w-32 border border-white absolute left-5 md:-bottom-20 -bottom-16 rounded-md overflow-hidden">
      <img
        src={data?.profile || profile}
        alt=""
        className="h-full w-full object-cover"
      />
        </div>
      </div>

      {c_user?.username !== user ? (
        <div className="flex justify-end my-5 pr-5">
          {!isFollowing ? (
            <button
              className="bg-primary hover:opacity-50 text-white py-1.5 px-4 rounded-md text-[12px] border-[1px] border-primary font-bold"
              onClick={() => follow("follow")}
            >
              Follow
            </button>
          ) : (
            <button
              className="border-[1px] border-primary py-2 px-4 rounded-md text-primary hover:opacity-60 text-[12px]"
              onClick={() => follow("unfollow")}
            >
              Unfollow
            </button>
          )}
        </div>
      ) : (
        <div className="md:my-16 my-7"></div>
      )}
    </div>
  )
}

export default ProfileTop;