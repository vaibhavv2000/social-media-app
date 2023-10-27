import {useState} from "react";
import {NavigateFunction,useNavigate} from "react-router-dom";
import {post} from "../Posts";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../../../redux/store";
import {AiOutlineDelete} from "react-icons/ai";
import {BiEditAlt} from "react-icons/bi";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {MdReportGmailerrorred} from "react-icons/md";
import {gql,useMutation} from "@apollo/client";
import {addImage,editPost,editStatus,removePost} from "../../../redux/slices/postSlice";

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    delete_post(postId: $postId) {
      msg
    }
  }
`;

const Top = ({post}: {post: post}) => {
  const [reported,setReported] = useState<boolean>(false);
  const [optEnabled,setOptEnabled] = useState<boolean>(false);

  const [deletePost] = useMutation(DELETE_POST);

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const {user} = useSelector((state: RootState) => state.user);

  const postEdit = () => {
    dispatch(editPost(post.id));

    if(post.status) dispatch(editStatus(post.status));
    if(post.photo) dispatch(addImage(post.photo));
  };

  return (
    <div className="flex items-center justify-between dark:bg-black p-2">
      <div className="flex items-center space-x-3">
        <img
          src={post.profile ? post.profile : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCIrYSJK3ypSywXi-tlKkvpHPKjE0yHKdtCwlr2j1kbw&usqp=CAU&ec=48665698"
          }
          alt=""
          className="h-8 w-8 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span
              className="font-medium text-[14px] dark:text-white hover:underline cursor-pointer"
              onClick={() => navigate(`/profile/${post.username}`)}
            >
              {post.name}
            </span>
            <span className="text-gray-600 text-[10px] dark:text-white/60">
              @{post.username}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        <span
          className="cursor-pointer dark:text-white"
          onClick={() => setOptEnabled(!optEnabled)}
        >
          <HiOutlineDotsHorizontal size={24} />
        </span>
        {optEnabled && (
          <div
            className={`bg-white dark:bg-black absolute right-2 top-4 shadow-sm duration-1000 ease-in-out rounded-md`}
          >
            {String(post.userId) === String(user?.id) && (
              <div
                className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
                onClick={postEdit}
              >
                <span className="dark:text-white">
                  <BiEditAlt size={24} />
                </span>
                <span className="font-medium text-[12px] dark:text-white">Edit</span>
              </div>
            )}
            <div
              className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
              onClick={() => {
                setReported(true);
                setTimeout(() => setReported(false),5000)
              }}
            >
              <span className="dark:text-white">
                <MdReportGmailerrorred size={24} />
              </span>
              <span className="font-medium text-[12px] dark:text-white">Report</span>
            </div>
            {String(post.userId) === String(user?.id) && (
              <div
                className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
                onClick={async () => {
                  await deletePost({variables: {postId: post.id}});
                  dispatch(removePost(post.created_at));
                }}
              >
                <span className="dark:text-white">
                  <AiOutlineDelete size={24} />
                </span>
                <span className="font-medium text-[12px] dark:text-white">Delete</span>
              </div>
            )}
          </div>
        )}
      </div>
      {reported && (
        <div className="absolute bottom-10 md:bottom-40 left-[50%] z-50 max-w-[330px] translate-x-[-50%] dark:bg-black bg-white shadow-xl rounded-lg px-5 py-3.5 flex items-center space-x-3 duration-100 ease-out">
          <span className="dark:text-white">
            <MdReportGmailerrorred size={24} />
          </span>
          <span className="text-[14px] dark:text-white">
            Post reported successfully
          </span>
        </div>
      )}
    </div>
  );
};

export default Top;
