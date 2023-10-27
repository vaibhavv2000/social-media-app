import {useLocation} from "react-router-dom";
import Post from "../components/home/Post";
import {gql,useQuery} from "@apollo/client";

const FETCH_POST = gql`
  query getSinglePost($postId: ID!) {
    get_single_post(postId: $postId) {
      id
      status
      photo
      userId
      likes
      comments
      bookmarks
      created_at
      name
      username
      profile
    }
  }
`;

const SinglePost = (): JSX.Element => {
  const {state} = useLocation();

  const {data,loading,error} = useQuery(FETCH_POST,{
    variables: {postId: state.postId},
  });

  return (
    <div className="flex-1 dark:bg-dark_2">
      <div className="w-full flex sm:w-[90%] md:w-[100%] lg:w-[700px] xl:w-[60%] p-2">
        {data && <Post post={data?.get_single_post} />}
      </div>
    </div>

  );
};

export default SinglePost;
