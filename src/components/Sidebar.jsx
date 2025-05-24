import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar({isOpen,setIsOpen}) {
  
//   return (<>
//     <div className={`border-r-3 border-purple-300  h-full px-0`}>
//       <div className=" min-h-10 border-b-3  border-purple-300 w-full
//        px-2 py-1 font-semibold text-xl  max-md:hidden">Your inbox
//        </div> 
//        <div className="md:hidden p-4 ">
//                <button
//                  onClick={() => setIsOpen(!isOpen)}
//                  className="text-gray-700 focus:outline-none"
//                >
//                  {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//                </button>
//              </div>
// <SearchComponent isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* <div className="flex flex-col items-center justify-start space-y-4 border border-red-500 h-full  px-1">
//         <div className='border'>search div</div>
//         <div className='border'>list of users</div>
//       </div> */}
//     </div>
//     </>
//   )

return (
  <>
    <div className="border-r-3 border-purple-300 h-full px-0 flex flex-col">

      {/* Header: visible only on md and above */}
      <div className="min-h-10 border-b-3 border-purple-300 w-full px-2 py-1 font-semibold text-xl hidden max-md:block md:hidden">
        Your inbox
      </div>
      <div className="min-h-10 border-b-3 border-purple-300 w-full px-2 py-1 font-semibold text-xl max-md:hidden">
        Your inbox
      </div>

      {/* Hamburger menu button: visible only on md and below */}
      <div className="md:hidden p-4 flex justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Search component - always rendered */}
      <SearchComponent isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Uncomment and style your user list or search div as needed */}
      {/* <div className="flex flex-col items-center justify-start space-y-4 border border-red-500 h-full px-1">
        <div className='border'>search div</div>
        <div className='border'>list of users</div>
      </div> */}

    </div>
  </>
);

}

export default Sidebar
