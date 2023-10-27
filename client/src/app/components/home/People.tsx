import {gql,useMutation} from "@apollo/client";
import {NavigateFunction,useNavigate} from "react-router-dom";

export interface user {
  id: number;
  name: string;
  username: string;
  profile: string;
}

const FOLLOW_USER = gql`
  mutation follow($userId: ID!) {
    follow_user(userId: $userId) {
      msg
    }
  }
`;

const People = ({users}: {users: user[]}): JSX.Element => {
  const [folloUser,{data}] = useMutation(FOLLOW_USER);

  const navigate: NavigateFunction = useNavigate();

  const follow = (id: number,username: string) => {
    // folloUser({variables: {userId: id}});

    navigate(`/profile/${username}`);
  };

  return (
    <div className="px-2">
      {users.map((item: user) => (
        <div
          key={String(`p${Math.random()}`)}
          className="flex items-center my-3 w-full justify-between px-1.5"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.profile || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h4 className="dark:text-white text-[14px] text-black/70 hover:underline cursor-pointer font-semibold" onClick={() => navigate(`/profile/${item.username}`)}>
                {item.name}
              </h4>
              <span className="dark:text-white/70 text-black/70 text-[11px] -mt-[3px]">
                @{item.username}
              </span>
            </div>
          </div>
          <div>
            <button
              className="text-white text-[12px] bg-primary hover:bg-dark_2 rounded-md px-2 py-1"
              onClick={() => follow(item.id,item.username)}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
