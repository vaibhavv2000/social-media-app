import {useEffect} from "react";
import {BsBookmark} from "react-icons/bs";
import NumberConvertor from "../../../utils/functions/NumberConvertor";
import {PiShareFatThin} from "react-icons/pi";
import {BiComment} from "react-icons/bi";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
import {useMemo,useState,Dispatch,SetStateAction} from "react";
import {gql,useMutation} from "@apollo/client";

interface props {
  likes: number;
  comments: number;
  bookmarks: number;
  postId: string;
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
  isLiked: boolean;
  totalComments: number;
}

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    like_post(postId: $postId) {
      msg
    }
  }
`;

const PostOptions = (props: props) => {
  const {likes,comments,bookmarks,postId} = props;
  const {totalComments,setShowComments,showComments,isLiked} = props;
  const [liked,setLiked] = useState<boolean>(false);
  const [allLikes,setAllLikes] = useState<number>(0);
  const shares: number = useMemo(() => Math.floor(Math.random() * 5),[]);

  const [likePost] = useMutation(LIKE_POST);

  const like = async () => {
    try {
      setLiked(!liked);
      if(liked) setAllLikes(p => p - 1);
      else setAllLikes(p => p + 1);
      await likePost({variables: {postId: postId}});
    } catch(error) {
      console.log({likerror: error});
    }
  };

  useEffect(() => {
    setLiked(isLiked);
  },[]);

  useEffect(() => {
    setAllLikes(likes);
  },[]);

  return (
    <div className="pb-3 dark:bg-black">
      <div className="py-3 flex items-center justify-between px-2">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-black">
          <span className="dark:text-white" onClick={like}>
            {liked ? (
              <AiFillHeart size={22} color="red" />
            ) : (
              <AiOutlineHeart size={22} />
            )}
          </span>
          <span className="dark:text-white ml-3 font-medium text-[12px]">
            {NumberConvertor(allLikes)}
          </span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-black"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="dark:text-white">
            <BiComment size={20} />
          </span>
          <span className="dark:text-white ml-3 font-medium text-[12px]">
            {NumberConvertor(totalComments)}
          </span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-black">
          <span className="dark:text-white">
            <PiShareFatThin size={20} />
          </span>
          <span className="dark:text-white ml-3 font-medium text-[12px]">{NumberConvertor(shares)}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-black">
          <span className="dark:text-white">
            <BsBookmark size={16} />
          </span>
          <span className="dark:text-white ml-3 font-medium text-[12px]">{NumberConvertor(bookmarks)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
