import {useSelector} from 'react-redux';
import {NavigateFunction,useNavigate,useParams} from 'react-router-dom';
import {RootState} from '../../redux/store';

const ProfileBottom = ({data}: {data: any}) => {
  const {user} = useParams();
  const getuser = useSelector((state: RootState) => state.user.user);

  return (
    <div className="px-2 sm:p-5 sm:py-3">
      <h1 className="dark:text-white font-bold text-3xl mb-2 md:mb-4">Posts by {user === getuser?.username ? "you" : user}</h1>

      {data && <div className={`flex flex-wrap gap-4 ${data?.get_random_photos.length < 3 ? "justify-start" : "justify-center"}`}>

        {!data?.get_random_photos.length && <h1 className='dark:text-white/60 text-black/70 font-semibold'>
          No posts from {user === getuser?.username ? "you" : user}
        </h1>}

        {data.get_random_photos.map((item: any) => (
          <ImagePost item={item} key={String(item.id)} />)
        )}
      </div>
      }
    </div>
  );
};

export default ProfileBottom;


function ImagePost({item}: {item: any}) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      key={String(`p${Math.random()}`)}
      className="rounded-md overflow-hidden cursor-pointer relative h-60 w-72"
      onClick={() => navigate(`/singlepost`,{state: {postId: item.postId}})}
    >
      <div className="h-full w-full absolute bg-transparent hover:bg-[rgba(0,0,0,0.333)] duration-300"></div>
      <img
        alt=""
        className="h-full w-full object-cover"
        crossOrigin={item.photo.startsWith("https") ? undefined : "use-credentials"}
        src={`${item.photo.startsWith("https") ? item.photo : `http://localhost:9000/images/${item.photo}`}`}
      />
    </div>
  );
};