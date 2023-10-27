interface props {
 data: any;
 followers: number;
};

const ProfileMid = (props: props) => {
 const {data, followers} = props;

 return (
  <div className="pt-4 md:pt-10 md:py-4 md:pb-2 pb-6 flex flex-col gap-2 md:gap-5 p-1 px-5">
   <div>
    <span className="text-lg font-semibold dark:text-white">
     {data?.name}
    </span>
    <span className="dark:text-gray-400 text-gray-700 text-[14px] ml-1">
     @{data?.username}
    </span>
   </div>
   <div className="flex items-center w-10/12 sm:justify-start space-x-8 md:space-x-5">
    <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">
      {data?.posts}
     </span>
     <span className="dark:text-white/80 text-gray-600 text-[14px]">Posts</span>
    </div>
    <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">{followers}</span>
     <span className="dark:text-white/80 text-gray-600 text-[14px]">Followers</span>
    </div>
    <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">
      {data?.followings}
     </span>
     <span className="dark:text-white/80 text-gray-600 text-[14px]">Following</span>
    </div>
   </div>
   <div>
    {data?.bio && <p className="text-gray-600 dark:text-white/90">{data.bio}</p>}
   </div>
  </div>
  );
};

export default ProfileMid;