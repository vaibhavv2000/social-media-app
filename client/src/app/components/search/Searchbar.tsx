import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import { gql, useLazyQuery } from "@apollo/client";
import People, { user } from "../home/People";
import { API } from "../../utils/functions/API";

const FETCH_USERS = gql`
  query Getusers($query: String) {
    get_recommended_users(query: $query) {
      id
      name
      username
      profile
    }
  }
`;

const Searchbar = (): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchUsers, { data }] = useLazyQuery(FETCH_USERS);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  function debounce(fn: Function, delay: number) {
    let timer;
    return (() => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    })();
  }

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await API.get(`/user/searchusers?query=${query}`);
        setUsers(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }

    if (query) debounce(getUsers, 1000);
    else if (!query) setUsers([]);
  }, [query]);

  return (
    <div className="my-3 w-full flex justify-center">
      {/* input */}
      <div className="px-3 w-full max-w-lg">
        <div className="flex dark:bg-black items-center p-2 py-3 shadow-sm space-x-3 rounded-sm">
          <span className="dark:text-white cursor-pointer text-gray-500">
            <IoSearchOutline size={24} />
          </span>
          <input
            className="outline-none bg-transparent dark:text-white flex-1"
            placeholder="Search users"
            value={query}
            ref={inputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
            }}
          />
          <span
            className="dark:text-white cursor-pointer text-gray-500"
            onClick={() => {
              setQuery("");
              inputRef.current && inputRef.current.focus();
            }}
          >
            <HiXMark size={24} />
          </span>
        </div>
        {/* results */}
        {users.length > 0 && (
          <div className="shadow-md dark:bg-black pt-2 pb-1">
            <People users={users} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
