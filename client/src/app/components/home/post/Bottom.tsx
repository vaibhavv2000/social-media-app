import {Fragment,useEffect,useState} from "react";
import PostOptions from "./PostOptions";
import Comment,{comment} from "../Comment";
import AddComment from "./AddComment";
import {post} from "../Posts";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../../../redux/store";
import {gql,useLazyQuery} from "@apollo/client";
import {addComments} from "../../../redux/slices/postSlice";

const GET_COMMENTS = gql`
  query getComments($postId: ID!) {
    get_comments(postId: $postId) {
      id
      postId
      comment
      userInteracted
      username
    }
  }
`;

const Bottom = ({post}: {post: post}) => {
  const [showComments,setShowComments] = useState<boolean>(false);
  const {comments} = useSelector((state: RootState) => state.post);
  const [postComments,setPostComments] = useState<any>([]);

  const dispatch: AppDispatch = useDispatch();

  const [getComments,{data: user_post_comments}] = useLazyQuery(GET_COMMENTS,{
    variables: {postId: post.id},
  });

  const fetchPosts = async () => {
    try {
      const comments = await getComments();
      const c = comments.data.get_comments;
      dispatch(addComments({postId: post.id,comments: c}));
    } catch(error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchPosts();
  },[]);

  useEffect(() => {
    const post_comments = comments.find(p => p.postId === post.id);
    setPostComments(post_comments?.comments);
  },[comments]);

  const no_comments = <h1 className="text-center dark:text-white text-black/90 font-medium mb-3">
    No comments yet
  </h1>;

  return (
    <Fragment>
      <PostOptions
        bookmarks={post.bookmarks}
        likes={post.likes}
        comments={post.comments}
        postId={post.id}
        isLiked={post.isLiked}
        showComments={showComments}
        setShowComments={setShowComments}
        totalComments={postComments?.length || 0}
      />

      {showComments && <div>
        {postComments.length < 1 ? no_comments : postComments.map((c: comment,i: number) => (
          <Comment key={String(`c${i}`)} comment={c} />
        ))}
      </div>
      }

      <AddComment postId={post.id} />
    </Fragment>
  );
};

export default Bottom;
