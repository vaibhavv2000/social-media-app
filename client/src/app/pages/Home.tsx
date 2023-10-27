import {useEffect} from "react";
import {gql,useQuery} from "@apollo/client";
import Posts from "../components/home/Posts";
import Rightbar from "../components/home/Rightbar";
import Loader from "../components/_common/Loader";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {addPosts} from "../redux/slices/postSlice";

const FETCH_TIMELINE_POSTS = gql`
  query getPosts {
    get_timeline_posts {
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
      isLiked
    }

    get_random_photos {
      photo
      postId
    }

    get_recommended_users {
      id
      name
      username
      profile
    }
  }
`;

interface data {
  get_random_photos: [];
  get_recommended_users: [];
  get_timeline_posts: [];
}

const Home = (): JSX.Element => {
  const {data,loading} = useQuery<data>(FETCH_TIMELINE_POSTS,{
    onCompleted: (data) => dispatch(addPosts(data.get_timeline_posts)),
  });

  useEffect(() => {
    document.title = `Home`;
  }, []);

  const dispatch: AppDispatch = useDispatch();

  if(loading) return <Loader size="small" color="dodgerblue" />;

  return (
    <div className="flex flex-col lg:flex-row flex-1">
      <Posts />
      <div className="sticky top-0 flex-[1.8]">
        {data && (
          <Rightbar
            randomUsers={data?.get_recommended_users}
            randomPhotos={data?.get_random_photos}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
