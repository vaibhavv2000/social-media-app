import {AiFillAudio} from "react-icons/ai";
import {HiOutlineXMark} from "react-icons/hi2";
import {BsFillEmojiHeartEyesFill,BsFillCameraVideoFill,BsImageFill} from "react-icons/bs";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../../redux/store";
import {ChangeEvent,useState} from "react";
import {addImage,editStatus,toggleUpload,addNewPost,updatePost} from "../../redux/slices/postSlice";
import {API} from "../../utils/functions/API";
import {gql,useMutation} from "@apollo/client";

var opt = "flex justify-evenly items-center border border-gray-400 dark:border-white/80 rounded-2xl p-1.5 px-2 cursor-pointer space-x-1.5";

const ADD_POST = gql`
  mutation AddPost($status: String, $photo: String) {
    add_post(status: $status, photo: $photo) {
      post
    }
  }
`;

const EDIT_POST = gql`
  mutation EditPost($postId: ID!, $status: String, $photo: String) {
    edit_post(postId: $postId, status: $status, photo: $photo) {
      msg
    }
  }
`;

const Upload = (): JSX.Element => {
  const [error,setError] = useState<string>("");
  const [success,setSuccess] = useState<string>("");
  const [file,setFile] = useState<null | Blob>();

  const {showUpload,edit} = useSelector((state: RootState) => state.post);
  const {isEditing,image,status,postId} = edit;

  const {user} = useSelector((state: RootState) => state.user);

  const [addPost,{error: err,data: newPost}] = useMutation(ADD_POST);

  const [editTPost,{error: editError}] = useMutation(EDIT_POST);

  const dispatch: AppDispatch = useDispatch();

  const handleUpload = async () => {
    if(!status && !image) return setError("Both fields can't be empty");

    try {
      if(!isEditing) {
        const post: any = {id: user?.id};
        if(status) post.status = status;
        if(file) {
          let data = new FormData();
          const str = "abcdefghijklmnopqrstuvwxyz"
            .split("")
            .sort((a,b) => Math.random() - 0.5)
            .join("");
          const filename = Date.now() + str.slice(0,10) + ".jpg";
          data.append("name",filename);
          data.append("file",file);
          post.photo = filename;

          await API.post("/upload/upload",data);
        }

        // await addPost({ variables: { status, photo: post.photo }});

        await API.post("/user/addpost",post);

        setSuccess("Post upload successfully");

        setTimeout(() => setSuccess(""),5000);

        dispatch(editStatus(""));
        dispatch(addImage(""));

        const new_post: any = {
          userId: user?.id,
          status,
          name: user?.name,
          username: user?.username,
          likes: 0,
          comments: 0,
          bookmarks: 0,
          created_at: Date.now(),
          isLiked: false,
          profile: user?.profile
        };

        if(post.photo) new_post.photo = post.photo;

        dispatch(addNewPost(new_post));

      } else {
        const post: any = {postId};
        if(status) post.status = status;
        if(file) {
          let data = new FormData();
          const filename = Date.now() + Math.random() + ".img";
          data.append("name",filename);
          data.append("file",file);
          post.photo = filename;

          await API.post("/api/upload/upload",data);
        } else {
          if(image) post.photo = image;
        }

        // await editTPost({variables: { postId, status, photo: image }});

        await API.put("/user/editpost",post);

        setSuccess("Post updated successfully");

        setTimeout(() => setSuccess(""),5000);

        dispatch(editStatus(""));
        dispatch(addImage(""));

        const img = image?.startsWith("https") ? image : `http://localhost:9000/images/${image}`;

        dispatch(updatePost({image: img,status,id: postId}));
      }
    } catch(error: any) {
      setError(error.response.data.error);
      console.log(error.response.data);
    }

    setTimeout(() => setError(""),5000);
  };

  return (
    <div className={`${showUpload ? "grid" : "hidden"} fixed h-screen w-full bg-[rgba(0,0,0,0.11111)] place-items-center z-[9999999999] dark:bg-[rgba(0,0,0,0.22222)]`}>
      <div className="dark:bg-black rounded-md p-2 bg-white shadow-md w-full max-w-[360px]">
        {/* top */}
        <div className="flex items-center justify-between p-2">
          <img
            src={user?.profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0THAxrPLhQck7guIxwq9QoOReWKvKGdOtriQsT3DAA&usqp=CAU&ec=48665698"}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-white">
            {isEditing ? "Edit Post" : "Post Something"}
          </p>
          <span
            className="dark:text-white cursor-pointer"
            onClick={() => dispatch(toggleUpload())}
          >
            <HiOutlineXMark size={24} />
          </span>
        </div>

        {/* middle */}
        <div className="p-2">
          <textarea
            className="border-b-2 border-slate-400 dark:border-[dodgerblue] hover:border-[dodgerblue] h-32 dark:text-white bg-transparent resize-none outline-none w-full p-2"
            placeholder="How are you feeling today?"
            value={status}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(editStatus(e.target.value))}
          ></textarea>
        </div>

        <div className="flex justify-evenly px-2 pb-2 space-x-3 items-center">
          <div className={opt}>
            <span className="dark:text-white">
              <BsFillEmojiHeartEyesFill size={16} />
            </span>
            <span className="dark:text-white text-[12px] hidden sm:!inline">
              Emoji
            </span>
          </div>
          <div className={opt}>
            <span className="dark:text-white">
              <AiFillAudio size={16} />
            </span>
            <span className="dark:text-white text-[12px] hidden sm:!inline">
              Audio
            </span>
          </div>
          <div className={opt}>
            <span className="dark:text-white">
              <BsFillCameraVideoFill size={16} />
            </span>
            <span className="dark:text-white text-[12px] hidden sm:!inline">
              Video
            </span>
          </div>
          <input
            className="hidden"
            type="file"
            id="imgFile"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            accept="*"
            multiple={false}
          />
          <label htmlFor="imgFile" className={opt}>
            <span className="dark:text-white">
              <label>
                <BsImageFill size={16} />
              </label>
            </span>
            <span className="dark:text-white text-[12px] hidden sm:!inline">
              Image
            </span>
          </label>
        </div>

        {error && <p className="text-red-500 px-2 text-[14px] font-medium my-0.5">{error}</p>}

        {success && <p className="text-blue-500 px-2 text-[14px] font-medium my-0.5">{success}</p>}

        <div className="p-2">
          <button
            className="bg-[#194a98] duration-300 hover:opacity-75 w-full p-2.5 text-white font-medium text-[15px] rounded-full"
            onClick={handleUpload}>
            Post
          </button>
        </div>
        {/* end */}
      </div>
    </div>
  );
};

export default Upload;
