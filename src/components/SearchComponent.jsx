import React, { useEffect, useRef, useState } from 'react'
import { FaSearch, FaSearchMinus } from "react-icons/fa";
import {users} from '../constants/index.jsx'
import { FaBars, FaTimes } from 'react-icons/fa';
import UsersList from './UsersList';
import { useSelector } from 'react-redux';

export default function SearchComponent({isOpen,setIsOpen}) {
  const authUser=useSelector(state=>state.authUser)

   const [query, setQuery] = useState("");
   const usersList= users?.filter(user=>user?.id !==authUser?.id)
   const [filteredUsers, setFilteredUsers] = useState([]);
  const debounceTimeout = useRef(null);

   const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredUsers(usersList);
      return;
    }
    const filtered = usersList.filter((user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

    useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [query]);
  return (
    <div className={` border-green-500   h-[88.2vh] hidden
    sm:flex flex-col space-y-2  px-2 w-full bg-gray-100 z-10 items-center justify-start 
    transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-[100rem]'} md:translate-x-0
    `}>

      

      <div className=" w-full relative flex mt-5 border-gray-300 items-center justify-center">
        <input 
         value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text" className='border outline-none text-md  border-gray-400 w-[70%] rounded-lg px-2  ' placeholder='Search'/>
        <div className=' absolute right-15  rounded-full p-1  flex items-center justify-center'><FaSearch className='size-3 fill-gray-800'/></div>
      </div>
      <div className="h-0 w-[90%] border-b border-gray-300"></div>
      <div className="border-blue-500  w-full h-full overflow-auto  flex flex-col justify-start gap-3">
        
       

       {filteredUsers?.length > 0 ? filteredUsers?.map((user,key)=><UsersList {...user}/>):
       usersList?.map(
        (user,key)=><UsersList {...user}/>
       )}
      </div>

     
    </div>
  )
}



