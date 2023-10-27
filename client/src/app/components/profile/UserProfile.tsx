import {gql,useQuery} from "@apollo/client";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileMid from "./ProfileMid";
import ProfileBottom from "./ProfileBottom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const GET_USER = gql`
  query getUser($username: String!, $name: String) {
    get_user(username: $username) {
      id
      name
      username
      email
      bio
      profile
      cover
      posts
      followers
      followings
      isFollowing
    }

    get_random_photos(username: $name) {
      photo
      postId
    }
  }
`;

const UserProfile = (): JSX.Element => {
  const [followers,setFollowers] = useState(0);
  const {user} = useParams();
  const {data} = useQuery(GET_USER,{variables: {username: user,name: user}});
  const c_user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    document.title = `Profile ${user}`;
  },[user]);

  return (
    <div>
      {
      data && <ProfileTop
          data={c_user?.username === user ? c_user : data?.get_user}
          setFollowers={setFollowers}
        />
      }
      {
      data && <ProfileMid
          data={c_user?.username === user ? c_user : data.get_user}
          followers={followers}
        />
      }
      <ProfileBottom data={data} />
    </div>
  );
};

export default UserProfile;
