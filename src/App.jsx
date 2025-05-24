import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"


function App() {

  return (
   <div className="border border-red-500  w-full h-[100vh] flex items-center justify-center">


    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<>login</>}/>
      <Route path="/signup" element={<>signup</>}/>
    </Routes>

   </div>

  )
}

export default App
