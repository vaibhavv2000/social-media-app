import {useEffect,useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {MdReportGmailerrorred} from "react-icons/md";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../../redux/store";
import {gql,useMutation} from "@apollo/client";
import {removeComments} from "../../redux/slices/postSlice";
import {NavigateFunction,useNavigate} from "react-router-dom";

export interface comment {
  id: number;
  postId: number;
  comment: string;
  userInteracted: number;
  username: string;
}

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $comment: String!) {
    delete_comment(postId: $postId, comment: $comment) {
      msg
    }
  }
`;

interface props {
  comment: comment; 
};

const Comment = ({comment}: props): JSX.Element => {
  const [showOpt,setShowOpt] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const [deleteComment,{error}] = useMutation(DELETE_COMMENT,{
    variables: {
      postId: comment.postId,
      comment: comment.comment,
    },
  });

  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const commentDelete = async () => {
    try {
      dispatch(removeComments({id: comment.postId,comment: comment.comment}));
      setShowOpt(false);
      await deleteComment();
    } catch(error) {
      console.log("del err",error)
    }
  };

  return (
    <div className="flex items-center p-1 px-2 space-x-3 my-1">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCIrYSJK3ypSywXi-tlKkvpHPKjE0yHKdtCwlr2j1kbw&usqp=CAU&ec=48665698"
        alt=""
        className="h-8 w-8 border border-red-600 rounded-full"
      />

      <div className="flex-1">
        <h4
          className="dark:text-white font-medium hover:underline cursor-pointer"
          onClick={() => navigate(`/profile/${comment.username}`)}
        >
          {comment.username}
        </h4>
        <div className="dark:text-white/80 text-[12px] w-full">{comment.comment}</div>
      </div>
      <div className="relative">
        <span
          className="dark:text-white cursor-pointer"
          onClick={() => setShowOpt(!showOpt)}
        >
          <HiOutlineDotsVertical size={24} />
        </span>

        {showOpt && (
          <div
            className="bg-white dark:bg-black absolute right-2 top-0 shadow-sm rounded-sm"
          //   onClick={optFun}
          >
            <div
              className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
              onClick={() => {
                // setReported(true)
                setShowOpt(false);
              }}
            >
              <span className="dark:text-white">
                <MdReportGmailerrorred size={24} />
              </span>
              <span className="font-medium dark:text-white text-[12px]">Report</span>
            </div>

            {String(user?.id) === String(comment.userInteracted) && (
              <div
                className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
                onClick={commentDelete}
              >
                <span className="dark:text-white">
                  <AiOutlineDelete size={24} />
                </span>
                <span className="font-medium dark:text-white text-[12px]">Delete</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
