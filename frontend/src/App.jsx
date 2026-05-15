import { Navigate, Routes,Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardPage from "./pages/Dashboard";
import { useUser } from "@clerk/react";
import { Toaster } from "react-hot-toast";


function App() {

  const {isSignedIn, isLoaded} = useUser();
  if(!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} ></Route>
        <Route path = "/dashboard" element={isSignedIn?<DashboardPage/>: <Navigate to={"/"} />}></Route>
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}></Route>
      </Routes>

      <div><Toaster position="top-right" toastOptions={{duration:3000}}/></div>
    </>
  );
  

}

export default App;

 