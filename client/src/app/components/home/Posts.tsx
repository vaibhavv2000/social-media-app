import {useSelector} from "react-redux";
import Post from "./Post";
import {RootState} from "../../redux/store";

export interface post {
  id: string;
  status: string;
  photo: string;
  userId: number;
  likes: number;
  comments: number;
  bookmarks: number;
  created_at: string;
  username: string;
  name: string;
  profile: string;
  isLiked: boolean;
}

const Posts = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.post.timeline_posts);

  const warn = <div className="grid place-items-center h-full">
    <div className="min-h-[400px] lg:min-h-full grid place-items-center">
      <h1 className="text-xl md:text-3xl font-inter font-medium text-gray-500 text-center">
        No post on Timeline <br />
        Start following people to see their posts
      </h1>
    </div>
  </div>

  return (
    <div className="py-1 md:py-5 md:px-5 px-0 bg-gray-50 flex flex-col items-center dark:bg-[#0c0c0c] flex-[3]">
      {posts.length < 1 ? warn : posts.map((p) => (
        <Post key={String(p.id)} post={p} />
      ))}
    </div>
  );
};

export default Posts;
