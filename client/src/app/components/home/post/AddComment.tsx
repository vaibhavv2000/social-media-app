import {gql,useMutation} from "@apollo/client";
import {ChangeEvent,useState} from "react";
import {RiSendPlane2Fill} from "react-icons/ri";
import {AppDispatch,RootState} from "../../../redux/store";
import {useDispatch,useSelector} from "react-redux";
import {addNewComment} from "../../../redux/slices/postSlice";

const COMMENT_POST = gql`
  mutation Comment($postId: ID!, $comment: String!) {
    comment_post(postId: $postId, comment: $comment) {
      msg
    }
  }
`;

const AddComment = ({postId}: {postId: string}) => {
  const [comment,setComment] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user)

  const [postComment,{data}] = useMutation(COMMENT_POST);

  const addComment = async () => {
    if(comment) {
      await postComment({variables: {postId,comment},});

      dispatch(addNewComment({id: postId,comment: {comment,username: user?.username,userInteracted: user?.id,postId: postId}}))

      setComment("");
    };
  };

  return (
    <div className="mb-3 mx-1">
      <div className="border border-gray-500 dark:border-white/40 flex items-center p-1.5 px-2 space-x-3 rounded-full dark:bg-dark_2 md:mx-2">
        <img
          src={user?.profile ? user.profile : 'https://cdn-icons-png.flaticon.com/128/149/149071.png'}
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <input
          className="flex-1 text-[14px] outline-none px-1 bg-transparent dark:text-white"
          placeholder="Add a comment"
          value={comment}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
        />
        <span className="p-1 dark:text-white/70 cursor-pointer" onClick={addComment}>
          <RiSendPlane2Fill size={20} />
        </span>
      </div>
    </div>
  );
};

export default AddComment;
