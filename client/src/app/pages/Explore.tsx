import {gql,useLazyQuery} from "@apollo/client";
import {useState,useEffect,useRef} from "react";
import ExplorePosts from "../components/explore/ExplorePosts";
import Loader from "../components/_common/Loader";
import {API} from "../utils/functions/API";
import {Fragment} from "react";

const EXPLORE_POSTS = gql`
  query getExplorePosts($skip: Int) {
    get_random_photos(explore: true, skip: $skip) {
      photo
      postId
    }
  }
`;

const Explore = (): JSX.Element => {
  const [skip,setSkip] = useState<number>(0);
  const [posts,setPosts] = useState<any[]>([]);
  const [loading,setLoading] = useState<boolean>(false);

  const postRef = useRef<HTMLDivElement>(null)

  const [fetchPosts,{data}] = useLazyQuery(EXPLORE_POSTS);

  useEffect(() => {
    const getPosts = async () => {
      await fetchPosts({variables: {skip}});
      data && setPosts(data.get_random_photos);
    };

    document.title = `Explore posts from people`;
  },[]);

  useEffect(() => {
    const get_posts = async () => {
      try {
        const res = await API.get(`/user/exploreposts?skip=${skip}`);
        if(res.data.length > 0) setSkip((p) => p + 20);
        setPosts([...posts,...res.data]);
      } catch(error: any) {
        console.log(error.response.data);
      }
    };

    get_posts();
  },[]);

  useEffect(() => {
    const get_posts = async () => {
      if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }

      setLoading(true);

      try {
        const res = await API.get(`/user/exploreposts?skip=${skip}`);
        if(res.data.length > 0) setSkip((p) => p + 20);
        setPosts([...posts,...res.data]);
      } catch(error: any) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("scroll",get_posts);

    return () => {
      window.removeEventListener("scroll",get_posts)
    };
  },[]);

  return (
    <Fragment>
      <div className="flex flex-1 dark:bg-[#191919]" ref={postRef}>
        <ExplorePosts photos={posts} />
      </div>
      {loading && <Loader size="small" color="darkblue" />}
    </Fragment>
  );
};

export default Explore;
