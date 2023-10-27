import {post} from "./Posts";
import Top from "./post/Top";
import Mid from "./post/Mid";
import Bottom from "./post/Bottom";

const Post = ({post}: {post: post}): JSX.Element => {
  return (
    <div className="w-full max-w-[550px] bg-white dark:bg-black mb-3 relative">
      <Top post={post} />
      <Mid post={post} />
      <Bottom post={post} />
    </div>
  );
};

export default Post;
