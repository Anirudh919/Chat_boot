// export const ShowDetailsComponent=()=>{
// return(
// <div className="w-full  h-full bg-white shadow-xl p-4 
// space-y-6 text-sm text-gray-800">
//   <div className=" flex flex-col space-y-2">
//     <div className="flex justify-between items-center">
//       <span className="font-semibold">Assignee</span>
//       <span className="text-gray-600">Brian Byrne</span>
//     </div>
//     <div className="flex justify-between items-center">
//       <span className="font-semibold">Team</span>
//       <span className="text-gray-600 italic">Unassigned</span>
//     </div>
//   </div>

//   <div className="space-y-2">
//     <h2 className="text-gray-700 font-semibold uppercase text-xs">Links</h2>
//    {[
//        { name: "Tracker ticket", icon: "ticket" },
//        { name: "Back-office tickets", icon: "archive" },
//        { name: "Side conversations", icon: "arrow-right" }
//     ].map((link, idx) => (
//        <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md cursor-pointer">
//         <span className="flex items-center space-x-2">
//           <i className={`lucide-${link.icon} w-4 h-4`} />
//           <span>{link.name}</span>
//         </span>
//         <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">+</button>
//      </div>
//     ))}
//   </div>

//   <div className="divide-y divide-gray-200">
//     {[ 
//       "User Data",
//       "Conversation Attributes",
//       "Company Details",
//       "Salesforce",
//       "Stripe",
//       "Jira for Tickets"
//     ].map((section, index) => (
//    <details key={index} className="py-2">
//          <summary className="font-medium cursor-pointer">{section}</summary>
//           <div className="mt-2 text-gray-600 text-xs">
//        {/* You can dynamically load content here */}
//          Content goes here...
//        </div>
//       </details>
//     ))}
//   </div>
// </div>


// )}
export const ShowDetailsComponent = () => {
  return (
    <div className="w-full h-full bg-white shadow-xl p-4 space-y-6 text-sm text-gray-800">
      {/* Assignee and Team */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:space-y-0 space-y-2">
        <div className="flex justify-between sm:justify-start sm:gap-4 items-center w-full sm:w-auto">
          <span className="font-semibold">Assignee:</span>
          <span className="text-gray-600">Brian Byrne</span>
        </div>
        <div className="flex justify-between sm:justify-start sm:gap-4 items-center w-full sm:w-auto">
          <span className="font-semibold">Team:</span>
          <span className="text-gray-600 italic">Unassigned</span>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-3">
        <h2 className="text-gray-700 font-semibold uppercase text-xs">Links</h2>
        {[
          { name: "Tracker ticket", icon: "ticket" },
          { name: "Back-office tickets", icon: "archive" },
          { name: "Side conversations", icon: "arrow-right" },
        ].map((link, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md cursor-pointer transition"
          >
            <span className="flex items-center space-x-2">
              <i className={`lucide-${link.icon} w-4 h-4`} />
              <span className="text-sm">{link.name}</span>
            </span>
            <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition">
              +
            </button>
          </div>
        ))}
      </div>

      {/* Accordion Sections */}
      <div className="divide-y divide-gray-200">
        {[
          "User Data",
          "Conversation Attributes",
          "Company Details",
          "Salesforce",
          "Stripe",
          "Jira for Tickets",
        ].map((section, index) => (
          <details key={index} className="py-2 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center text-sm group-open:text-purple-700 transition">
              {section}
            </summary>
            <div className="mt-2 text-gray-600 text-xs leading-relaxed">
              {/* You can dynamically load content here */}
              Content goes here...
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};



// import { useState, useEffect, useRef } from 'react';
import { FiSend, FiSidebar, FiUser } from "react-icons/fi";
import { RiShareBoxFill } from "react-icons/ri";
import { MdPermMedia } from 'react-icons/md';
// import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import aifin from '../../public/aifin.jpg';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

// export const NoUserSelected = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 text-gray-500">
//       <FiUser className="text-5xl mb-4 text-blue-400" />
//       <h2 className="text-xl font-semibold mb-1">No User Selected</h2>
//       <p className="text-sm">Please select a User from the sidebar to get Details.</p>
//     </div>
//   );
// };

export const NoUserSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 sm:px-6 md:px-12 lg:px-24 text-gray-500 space-y-2">
      <FiUser className="text-5xl sm:text-6xl lg:text-7xl mb-4 text-blue-400" />
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">No User Selected</h2>
      <p className="text-sm sm:text-base text-gray-400">
        Please select a user from the sidebar to get details.
      </p>
    </div>
  );
};

function Aibot() {

const API_KEY = 'AIzaSyATNXCn8qgz-8MVLMVL5Ahw1NVLqYrxAE4';

  const selectedChat = useSelector(state => state.selectedUser);
  const [showDetails, setShowDetails] = useState(false);
  const isSender = true;
  
  const inputRef = useRef(null);

  const [aiChats, setAiChats]=useState([])



   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [loading,setLoading]=useState(false)
  const [aiResponse, setAiResponse] = useState('');
  const[isChatStarted,setIsChatStarted]=useState(false)


const askAI = async (prompt) => {
  setIsChatStarted(true)
    setLoading(true)
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
     { 
      method: 'POST',
       headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }), });
      const data = await res.json(); 
      console.log(data)
       const generatedText = data.candidates?.[0]?.content?.parts; 
       const responseText = Array.isArray(generatedText) ?
        generatedText.map(part => part?.text || '').join('\n') : 
       'No response received.'; 
       setAiResponse(responseText);
       setAiChats(prev=>[...prev,data])
    } catch (error)
     { 
      setAiChats(prev => [...prev, { text: prompt, timestamp: new Date().toLocaleTimeString() }]);
      // setAiChats(prev=>[...prev,inputRef.current.value]);
      console.error('Error fetching AI response:', error); 
    } finally {
      setLoading(false)
  
  };}

  useEffect(() => {
  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    const selected = selection.toString().trim();


    if (selected.length > 0) {
      setSelectedText(selected);
      setTooltipPos({ x: e.clientX, y: e.clientY });
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      setSelectedText('');
    }
  };

  document.addEventListener('click', handleMouseUp);
  return () => document.removeEventListener('click', handleMouseUp);
}, [])
console.log(aiChats)


//   return (
//     <div className='flex flex-col h-full items-center relative'>
//       {/* Header */}
//       <div className="transition-all duration-500 ease-in-out transform min-h-10 border-b-3 border-purple-300 w-full px-2 py-0 text-sm flex items-center justify-between">
//         <div className="relative border-blue-500 h-full flex items-center gap-3 font-sans font-semibold">
//           <div onClick={() => setShowDetails(false)} className="flex cursor-pointer items-center text-purple-900 transition-all duration-300 ease-in-out hover:scale-105">
//             <img src={aifin} alt="" className='w-5 h-5 object-fill mr-1 transition-all duration-300 ease-in-out' />
//             AI
//             <span className='text-md text-transparent ml-1 bg-clip-text bg-gradient-to-r from-purple-900 to-purple-500'>Copilot</span>
//           </div>
//           <div onClick={() => setShowDetails(true)} className="text-gray-700 cursor-pointer hover:text-purple-800 hover:scale-105">
//             Details
//           </div>
//           <div className={`absolute rounded-full h-[3px] bg-gradient-to-r from-purple-900 to-purple-500 via-purple-700 -bottom-[3px] ${showDetails ? `w-16 -right-4` : `w-21 left-1`}`}></div>
//         </div>
//         <div className="flex items-center gap-4 justify-center">
//           {showDetails && <RiShareBoxFill size={16} />}
//           <FiSidebar size={16} />
//         </div>
//       </div>
// {/* ---------------------------------------------------------------------------------------------------------- */}
//       {/* Main Body */}
//       <AnimatePresence mode="wait">
//         {/* Chat View */}
//         {!showDetails && isChatStarted && (
          

//               <div className="w-full h-[78vh]   overflow-auto px-2 mt-2">
//           {/* Existing chat messages */}
//           {aiChats.map((message, index) => {
//   const isAI = message.candidates?.[0]?.content?.role === 'model';
//   const aiText = message.candidates?.[0]?.content?.parts?.[0]?.text || '';
//   const userText = message.text;
//   const timestamp = message.timestamp;

//   return (
//     <div key={index}>
//       {isAI ? (
//         // AI Message
//         <div className="mt-4 max-w-[320px] p-4 bg-green-100 text-gray-900 rounded-xl">
//           <strong>AI Response:</strong>
//           <p className="text-sm mt-1">{aiText}</p>
//         </div>
//       ) : (
//         // User Message
//         <div className="flex items-start gap-2 mt-2 px-2 w-full justify-end">
//           <div className="flex flex-col gap-1 w-full max-w-[320px] items-end">
//             {/* Name & Time */}
//             <div className="flex items-center gap-2 text-black flex-row-reverse">
//               <span className="text-sm font-semibold">You</span>
//               <span className="text-xs font-normal">{timestamp}</span>
//             </div>

//             {/* Message Bubble */}
//             <div className="flex flex-col leading-relaxed p-4 w-full bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
//               <p className="text-sm text-end">{userText}</p>
//             </div>
//           </div>

//           {/* Avatar */}
//           <img
//             className="w-8 h-8 rounded-full"
//             src="https://ui-avatars.com/api/?name=You"
//             alt="Your avatar"
//           />
//         </div>
//       )}
//     </div>
//   );
// })}

         
// {loading && (
//   <div className="space-y-4 mt-4">
//     <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
//     <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
//     <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
//     <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
//   </div>
// )   }   



//         </div>
//         )}

//         {/* Intro */}
//         {!showDetails && !isChatStarted && (
//           <motion.div
//             key="intro"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className="flex flex-col items-center mt-auto"
//           >
//             <img src={aifin} alt="" className='w-7 h-7 object-fill mx-auto' />
//             <h4 className='font-bold text-md'>Hi, I'm Fin AI Copilot</h4>
//             <p className='text-gray-700 font-serif text-sm'>Ask me anything about this conversation.</p>
//           </motion.div>
//         )}

//         {/* Input Box */}
//         {!showDetails && (
//           <motion.div
//             key="input"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//             className="flex items-center justify-between border-blue-500 w-full h-9 gap-2 mt-auto mb-2 px-2"
//           >
//             <div className="h-full w-full">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 // value={inputValue}
//                 placeholder='Ask a question...'
//                 className="outline-none border border-gray-400 w-full h-full px-2 rounded"
//               />
//             </div>
//             {/* ------------------------------------------------------------------------------------------ */}
//             <div className="flex justify-center text-sm items-center gap-1">
//               {/* <button className='cursor-pointer p-2 rounded bg-gray-800 text-white'><MdPermMedia /></button> */}
//               <button
//               onClick={()=>{
//                 setAiChats(prev=>[...prev,{text:inputRef.current.value,timestamp:new Date().toLocaleString()}]);
//                 askAI(inputRef.current.value);
//                 inputRef.current.value=""}
//               }
                
//               className='cursor-pointer p-2 rounded bg-blue-500 text-white'><FiSend /></button>
//             </div>
//           </motion.div>
//         )}

//         {/* Details View */}
//         {selectedChat && showDetails && (
//           <motion.div
//             key="details"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.4 }}
//             className="w-full h-full"
//           >
//             <ShowDetailsComponent />
//           </motion.div>
//         )}

//         {!selectedChat && showDetails && (
//           <NoUserSelected />
//         )}
//       </AnimatePresence>


//         {/* Tooltip button near click position */}
//       {showTooltip && (
//         <div
//           className="fixed z-50 border bg-white text-sm shadow-md  px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
//           style={{
//             left: `${tooltipPos.x}px`,
//             top: `${tooltipPos.y}px`,
//             transform: 'translate(-50%, -120%)',
//             // pointerEvents: 'auto',
//           }}
//           onClick={() => {
//             if (inputRef.current) {

//               inputRef.current.value = selectedText
//               inputRef.current.focus(); 

//             }
//             setShowTooltip(false)
//           }}
//           onMouseLeave={() => setShowTooltip(false)} // hide tooltip if mouse leaves
//         >
//           Ask Fin Copilot
//         </div>
//       )}

//     </div>
//   );


  return (
    <div className='flex flex-col h-full items-center relative w-full max-w-screen'>
      {/* Header */}
      <div className="transition-all duration-500 ease-in-out transform min-h-10 border-b-2 border-purple-300 w-full px-3 py-1 text-sm flex items-center justify-between">
        <div className="relative h-full flex items-center gap-4 font-sans font-semibold text-xs sm:text-sm">
          <div onClick={() => setShowDetails(false)} className="flex cursor-pointer items-center text-purple-900 transition-all duration-300 ease-in-out hover:scale-105">
            <img src={aifin} alt="" className='w-5 h-5 object-fill mr-1' />
            AI <span className='ml-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-500'>Copilot</span>
          </div>
          <div onClick={() => setShowDetails(true)} className="text-gray-700 cursor-pointer hover:text-purple-800 hover:scale-105">
            Details
          </div>
          <div className={`absolute rounded-full h-[3px] bg-gradient-to-r from-purple-900 to-purple-500 via-purple-700 -bottom-[3px] ${showDetails ? `w-16 -right-4` : `w-21 left-1`}`}></div>
        </div>
        <div className="flex items-center gap-4 justify-center">
          {showDetails && <RiShareBoxFill size={16} />}
          <FiSidebar size={16} />
        </div>
      </div>

      {/* Main Body */}
      <AnimatePresence mode="wait">
        {/* Chat View */}
        {!showDetails && isChatStarted && (
          <div className="w-full h-[78vh] overflow-auto px-2 mt-2">
            {aiChats.map((message, index) => {
              const isAI = message.candidates?.[0]?.content?.role === 'model';
              const aiText = message.candidates?.[0]?.content?.parts?.[0]?.text || '';
              const userText = message.text;
              const timestamp = message.timestamp;

              return (
                <div key={index}>
                  {isAI ? (
                    <div className="mt-4 max-w-[320px] p-4 bg-green-100 text-gray-900 rounded-xl">
                      <strong>AI Response:</strong>
                      <p className="text-sm mt-1">{aiText}</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 mt-2 px-2 w-full justify-end">
                      <div className="flex flex-col gap-1 w-full max-w-[320px] items-end">
                        <div className="flex items-center gap-2 text-black flex-row-reverse">
                          <span className="text-sm font-semibold">You</span>
                          <span className="text-xs font-normal">{timestamp}</span>
                        </div>
                        <div className="flex flex-col leading-relaxed p-4 w-full bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
                          <p className="text-sm text-end">{userText}</p>
                        </div>
                      </div>
                      <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=You" alt="Your avatar" />
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="space-y-4 mt-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
              </div>
            )}
          </div>
        )}

        {/* Intro Message */}
        {!showDetails && !isChatStarted && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center mt-auto"
          >
            <img src={aifin} alt="" className='w-7 h-7 object-fill mx-auto' />
            <h4 className='font-bold text-md'>Hi, I'm Fin AI Copilot</h4>
            <p className='text-gray-700 font-serif text-sm'>Ask me anything about this conversation.</p>
          </motion.div>
        )}

        {/* Input Box */}
        {!showDetails && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between border-blue-500 w-full gap-2 mt-auto mb-2 px-2"
          >
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder='Ask a question...'
                className="outline-none border border-gray-400 w-full h-10 px-2 rounded text-sm"
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const text = inputRef.current.value.trim();
                  if (text) {
                    setAiChats(prev => [...prev, { text, timestamp: new Date().toLocaleString() }]);
                    askAI(text);
                    inputRef.current.value = "";
                  }
                }}
                className='cursor-pointer p-2 rounded bg-blue-500 text-white hover:bg-blue-600'
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}

        {/* Details View */}
        {selectedChat && showDetails && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <ShowDetailsComponent />
          </motion.div>
        )}
        {!selectedChat && showDetails && <NoUserSelected />}
      </AnimatePresence>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 border bg-white text-sm shadow-md px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -120%)',
          }}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = selectedText;
              inputRef.current.focus();
            }
            setShowTooltip(false);
          }}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Ask Fin Copilot
        </div>
      )}
    </div>
  );


}

export default Aibot;








  // // New state to hold AI response messages
  
  // const [loading,setLoading]=useState(true)



  