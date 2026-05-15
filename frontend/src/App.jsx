import { Navigate, Routes,Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { useUser } from "@clerk/react";
import { Toaster } from "react-hot-toast";


function App() {

  const {isSignedIn} = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        ></Route>
      </Routes>

      <div><Toaster position="top-right" toastOptions={{duration:3000}}/></div>
    </>
  );
  

}

export default App;

 