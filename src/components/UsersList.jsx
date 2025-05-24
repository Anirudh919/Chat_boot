import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../store/actions'

function UsersList({...user}) {
  const {id,firstName,lastName,image}=user
  const dispatch=useDispatch()
  const selectedChat=useSelector(state=>state.selectedUser)
  const isSelected=selectedChat?.id=== id
  
  return (
    <div key={id} onClick={()=>dispatch(setSelectedChat(user))}
     className={`border rounded-lg  border-gray-300 px-2 cursor-pointer hover:bg-gray-200 ${isSelected? `bg-purple-300`:``}`}>
      <div className="flex items-center justify-around gap-4 ">
        {/* user image */}
        <div className=" rounded-full w-10 min-w-10 h-10 flex items-center justify-center bg-gray-300 overflow-hidden">
           <img
          className=""
          src={image}
          alt={`${firstName} ${lastName}`}
        /></div>
        {/* username and content */}
        <div className=" h-12 w-full px-2">
            <h2>{`${firstName} ${lastName}`}</h2>
            <span className='text-sm'>hey how are you doing??</span>
        </div>
        <div className=" w-[10%] flex items-center justify-center rounded-full text-xs py-1 bg-gray-300 ">2</div>
      </div>
    </div>
  )
}

export default UsersList
