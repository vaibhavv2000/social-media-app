import {post} from "../Posts";

const Mid = ({post}: {post: post}) => {
  return (
    <div className="dark:bg-black">
      {post.status && (
        <div className="px-2 py-2 text-[14px] text-gray-700 dark:text-white/90">
          {post.status}
        </div>
      )}
      {post.photo && (
        <div className="h-64 sm:h-96 md:h-96 w-full">
          <img
            crossOrigin={post.photo.startsWith("https") ? undefined : "use-credentials"}
            src={`${post.photo.startsWith("https") ? post.photo : `http://localhost:9000/images/${post.photo}`}`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Mid;
