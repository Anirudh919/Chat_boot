import React, { useEffect, useRef, useState } from 'react'
import { FiSend } from "react-icons/fi";
import { MdPermMedia } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { LuMoonStar } from "react-icons/lu";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { messages } from '../constants';


import { FiMessageCircle ,FiUser} from 'react-icons/fi';
import { removeSelectedChat } from '../store/actions';


function Conversations() {
const dispatch=useDispatch()
  const [allMessageArray, setAllMessageArray] = useState([]);
  const [isOpen,setIsOpen]=useState(false)
  const messageRef = useRef("")
  const selectedChat = useSelector(state => state.selectedUser)
  const authUser = useSelector(state => state.authUser)
  useEffect(() => {
    if (!authUser || !selectedChat) return;

    const filteredMessages = messages.filter((message) =>
      message.participants.includes(authUser?.id) &&
      message.participants.includes(selectedChat?.id)

    );
    setAllMessageArray(filteredMessages)

  }, [authUser, selectedChat, messages])

  const handleSendMessage = () => {

    const text = messageRef.current?.value?.trim();
    if (!text) return;

    const newMessage = {
      id: "m" + (allMessageArray.length + 1),
      text,
      senderId: authUser?.id,
      receiverId: selectedChat?.id,
      participants: [authUser?.id, selectedChat?.id],
      timestamp: new Date().toISOString(),
    };

    // Update array immutably
    setAllMessageArray(prev => [...prev, newMessage]);

    // Clear input
    messageRef.current.value = "";
  }



//   return (<>
//   {selectedChat? 
//   <div className='flex  flex-col overflow-hidden h-full   items-center  border-red-500 '>


//       {/* header part */}
//       <div className="min-h-10 border-b-3 border-purple-300  w-full px-2 py-1 font-semibold text-xl flex items-center justify-between">
//         <div className="font-semibold text-xl">{selectedChat?.firstName} {selectedChat?.lastName}</div>
//         <div className="flex items-center  gap-4 justify-center">
//           <button 
//           onClick={()=>setIsOpen(true)}
//           className='cursor-pointer bg-gray-200 rounded-lg p-1 '><BsThreeDots /> </button>
//           <button className=' bg-gray-200  cursor-pointer rounded-lg p-1 '><LuMoonStar fill="black" /></button>
//           <button 
//           onClick={()=>dispatch(removeSelectedChat())}
//           className='cursor-pointer rounded-lg px-3 font-normal text-white bg-black py-1 flex items-center text-sm gap-2'><FaEnvelopeOpenText /> Close</button>
//         </div>
//       </div>


// {/* messageComponent */}
//       <div className="   w-full h-[70vh]  overflow-auto"
//       >
//         {
//           allMessageArray.map((message) => <MessageComponent {...message} />)
//         }

//         <CommandPalette isOpen={isOpen} setIsOpen={setIsOpen}/>




//       </div>


//       {/* input box part footer */}
//       <div className="flex  items-center justify-between 
//  border-blue-500 w-full h-9 gap-2 mt-auto  mb-2 px-2">

//         {/* input box */}
//         <div className="h-full w-full">
//           <input type="text" placeholder='Your Message ' ref={messageRef}          
//             className="outline-none border border-gray-400 w-full h-full  px-2 rounded" />
//         </div>

//         {/* send button */}
//         <div className="  flex justify-center text-sm  items-center gap-1 ">
//           {/* <button className='cursor-pointer p-2 rounded bg-gray-800 text-white'><MdPermMedia /></button> */}
//           <button
//             onClick={() => handleSendMessage()} className='cursor-pointer p-2 rounded bg-blue-500 text-white'><FiSend /></button>


//         </div>
//       </div>




//     </div> : <NoChatSelected/> }
  
//   </>
    



//   )

return (
  <>
    {selectedChat ? (
      <div className="flex flex-col overflow-hidden h-full w-full items-center border border-gray-300 rounded-lg shadow-md">

        {/* Header */}
        <div className="min-h-[50px] w-full px-4 py-2 border-b border-purple-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
          <div className="font-semibold text-lg sm:text-xl">
            {selectedChat?.firstName} {selectedChat?.lastName}
          </div>
          <div className="flex items-center gap-2 sm:gap-4 justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg p-2 transition-all"
            >
              <BsThreeDots />
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-2 transition-all">
              <LuMoonStar fill="black" />
            </button>
            <button
              onClick={() => dispatch(removeSelectedChat())}
              className="cursor-pointer rounded-lg px-3 py-2 text-white bg-black text-sm flex items-center gap-2 hover:bg-gray-800"
            >
              <FaEnvelopeOpenText /> Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="w-full flex-1 overflow-y-auto px-2 py-3 bg-gray-50 space-y-2">
          {allMessageArray.map((message, idx) => (
            <MessageComponent key={idx} {...message} />
          ))}
          <CommandPalette isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Footer Input */}
        <div className="flex items-center justify-between w-full px-3 py-2 bg-white border-t border-gray-300 gap-2">
          <input
            type="text"
            placeholder="Your Message"
            ref={messageRef}
            className="flex-1 px-3 py-2 border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          >
            <FiSend />
          </button>
        </div>
      </div>
    ) : (
      <NoChatSelected />
    )}
  </>
);

}

export default Conversations


export const NoChatSelected = () => {
  // return (
  //   <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 text-gray-500">
  //     <FiMessageCircle className="text-5xl mb-4 text-blue-400" />
  //     <h2 className="text-xl font-semibold mb-1">No Chat Selected</h2>
  //     <p className="text-sm">
  //       Please select a chat from the sidebar to start messaging.
  //     </p>
  //   </div>
  // );
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center text-gray-500">
      <FiMessageCircle className="text-6xl sm:text-7xl mb-4 text-blue-400" />
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
        No Chat Selected
      </h2>
      <p className="text-sm sm:text-base max-w-md">
        Please select a chat from the sidebar to start messaging.
      </p>
    </div>
  );
  

};










export const MessageComponent = ({ ...message }) => {
  const authUser = useSelector(state => state.authUser)
  const selectedChat = useSelector(state => state.selectedUser)
  let isSender = authUser?.id === message?.senderId


  // return (
  //   <>
  //     <div
  //       className={` flex items-start gap-1 mt-2 px-2 w-full  ${isSender ? 'justify-end' : 'justify-start'
  //         }`}
  //     >
  //       {/* Avatar */}
  //       {!isSender && (
  //         <img
  //           className="w-8 h-8 rounded-full "
  //           src={selectedChat?.image}
  //           alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
  //         />
  //       )}

  //       {/* Message content */}
  //       <div
  //         className={` border-red-500 flex flex-col gap-1 w-full max-w-[320px] px-1 ${isSender ? 'items-end' : 'items-start'
  //           }`}
  //       >
  //         {/* Name and Time */}
  //         <div
  //           className={` border-red-500 flex items-center gap-2  text-black ${isSender ? 'flex-row-reverse' : 'flex-row'
  //             }`}
  //         >
  //           <span className="text-sm font-semibold">
  //             {isSender ? 'You' : `${selectedChat.firstName} ${selectedChat.lastName}`}
  //           </span>
  //           <span className="text-xs font-normal ">{new Date(message.timestamp).toLocaleTimeString()}</span>
  //         </div>

  //         {/* Message Bubble */}
  //         <div
  //           className={`flex flex-col leading-relaxed p-4  border-red-500    ${isSender
  //               ? 'border-blue-500 bg-blue-500 text-gray-900 rounded-s-xl rounded-ee-xl'
  //               : 'border-gray-200 bg-gray-700 rounded-e-xl rounded-es-xl '
  //             }`}
  //         >
  //           <p className="text-sm font-normal text-gray-900 dark:text-white">
  //             {message?.text}
  //           </p>
  //         </div>

  //         {/* Optional: Delivered status */}
  //         {/* <span className="text-xs text-gray-500 dark:text-gray-400">Delivered</span> */}
  //       </div>

  //       {/* Avatar for sender */}
  //       {isSender && (
  //         <img
  //           className="w-8 h-8 rounded-full "
  //           src={authUser?.image}
  //           alt="Your avatar"
  //         />
  //       )}
  //     </div></>
  // )
  return (
    <>
      <div
        className={`flex items-start gap-2 mt-2 px-2 w-full ${isSender ? 'justify-end' : 'justify-start'}`}
      >
        {/* Avatar */}
        {!isSender && (
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src={selectedChat?.image}
            alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
          />
        )}
  
        {/* Message content */}
        <div
          className={`flex flex-col gap-1 w-full max-w-xs sm:max-w-sm md:max-w-md px-1 ${isSender ? 'items-end' : 'items-start'}`}
        >
          {/* Name and Time */}
          <div
            className={`flex items-center gap-2 text-black text-xs sm:text-sm ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <span className="font-semibold">{isSender ? 'You' : `${selectedChat.firstName} ${selectedChat.lastName}`}</span>
            <span className="font-normal">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
  
          {/* Message Bubble */}
          <div
            className={`flex flex-col leading-relaxed p-3 sm:p-4 rounded-lg
              ${isSender 
                ? 'border border-blue-500 bg-blue-500 text-white rounded-bl-xl rounded-tr-xl' 
                : 'border border-gray-300 bg-gray-100 text-gray-900 rounded-br-xl rounded-tl-xl'
              }`}
          >
            <p className="text-sm font-normal break-words whitespace-pre-wrap">
              {message?.text}
            </p>
          </div>
  
          {/* Optional: Delivered status */}
          {/* <span className="text-xs text-gray-500 dark:text-gray-400">Delivered</span> */}
        </div>
  
        {/* Avatar for sender */}
        {isSender && (
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src={authUser?.image}
            alt="Your avatar"
          />
        )}
      </div>
    </>
  );
  
}



import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, StickyNote, RefreshCcw, MessageSquare,
  Ticket, BellOff, Upload, Image, X
} from 'lucide-react';

const actions = [
  { label: "Write a note", shortcut: "N", icon: <StickyNote size={18} /> },
  { label: "Use macro", shortcut: "\\", icon: <RefreshCcw size={18} /> },
  { label: "Summarize conversation", shortcut: "Y", icon: <MessageSquare size={18} /> },
  { label: "Create a back-office ticket", shortcut: "Z", icon: <Ticket size={18} /> },
  { label: "Snooze", shortcut: "S", icon: <BellOff size={18} /> },
  { label: "Upload attachment", shortcut: "U", icon: <Upload size={18} /> },
  { label: "Insert gif", shortcut: "G", icon: <Image size={18} /> },
];

export function CommandPalette({ isOpen ,setIsOpen}) {
  const [search, setSearch] = useState('');

  const filtered = actions.filter(action =>
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  // return (
  //   <AnimatePresence>
  //     {isOpen && (
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.95, y: -10 }}
  //         animate={{ opacity: 1, scale: 1, y: 0 }}
  //         exit={{ opacity: 0, scale: 0.95, y: -10 }}
  //         transition={{ duration: 0.2 }}
  //         className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50"
  //       >
  //         <div className="bg-white  text-zinc-900    rounded-xl shadow-xl relative">
            
  //           {/* Close Button */}
  //           <button
  //             onClick={()=>setIsOpen(false)}
  //             className="absolute top-2 right-3 p-1 rounded bg-zinc-900  hover:bg-zinc-700 transition"
  //             aria-label="Close"
  //           >
  //             <X size={18} className="text-zinc-300 " />
  //           </button>

  //           {/* Search Input */}
  //           <div className="flex items-center px-4 py-2 border-b dark:border-zinc-700">
  //             <Search className="text-gray-400 dark:text-zinc-500 mr-2" size={18} />
  //             <input
  //               type="text"
  //               placeholder="Search actions"
  //               value={search}
  //               onChange={(e) => setSearch(e.target.value)}
  //               className="w-full bg-transparent outline-none text-sm placeholder-gray-400 dark:placeholder-zinc-500"
  //             />
  //           </div>

  //           {/* Action List */}
  //           <ul className="max-h-80 overflow-y-auto">
  //             {filtered.map((action, index) => (
  //               <li
  //                 key={index}
  //                 className="flex items-center justify-between px-4 py-2 hover:bg-purple-300  cursor-pointer transition"
  //               >
  //                 <div className="flex items-center gap-2 text-sm">
  //                   {action.icon}
  //                   {action.label}
  //                 </div>
  //                 <kbd className="text-xs text-zinc-900  border  px-2 py-0.5 rounded">
  //                   {action.shortcut}
  //                 </kbd>
  //               </li>
  //             ))}
  //             {filtered.length === 0 && (
  //               <li className="text-center text-sm text-gray-400 dark:text-zinc-500 py-4">
  //                 No results found
  //               </li>
  //             )}
  //           </ul>

  //           {/* Footer */}
  //           <div className="flex justify-between items-center text-xs 
  //           text-gray-300 px-4 py-2 rounded-es-xl rounded-ee-xl
  //            bg-gray-800 ">
  //             <span>↑↓ to navigate</span>
  //             <span>↵ to select</span>
  //             <span>Esc to close</span>
  //           </div>
  //         </div>
  //       </motion.div>
  //     )}
  //   </AnimatePresence>
  // );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-50 px-2 sm:px-0"
        >
          <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl shadow-xl relative">
  
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 p-1 rounded bg-zinc-900 hover:bg-zinc-700 transition"
              aria-label="Close"
            >
              <X size={18} className="text-zinc-300" />
            </button>
  
            {/* Search Input */}
            <div className="flex items-center px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
              <Search className="text-gray-400 dark:text-zinc-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search actions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm placeholder-gray-400 dark:placeholder-zinc-500"
                autoFocus
              />
            </div>
  
            {/* Action List */}
            <ul className="max-h-60 sm:max-h-80 overflow-y-auto">
              {filtered.map((action, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-4 py-2 hover:bg-purple-300 cursor-pointer transition text-sm sm:text-base"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    {action.icon}
                    {action.label}
                  </div>
                  <kbd className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 px-2 py-0.5 rounded select-none">
                    {action.shortcut}
                  </kbd>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-center text-sm text-gray-400 dark:text-zinc-500 py-4">
                  No results found
                </li>
              )}
            </ul>
  
            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-300 px-4 py-2 rounded-b-xl bg-gray-800 dark:bg-zinc-800 gap-1 sm:gap-0 select-none">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>Esc to close</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
}
