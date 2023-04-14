import { Box, Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Error,Landing,Register,ProtectedRoute} from './pages'
import {AllJobs,Stats,AddJob,Profile,SharedLayout} from './pages/dashboard'
function App() {
  return (
    <Box>
      <Box mt={"4rem"} px={"2rem"}>
        <Routes>
          <Route path={"/"} element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
           }>
            <Route index element={<Stats/>} />
            <Route path={'Add-job'} element={<AddJob/>} />
            <Route path={'All-jobs'} element={<AllJobs/>} />
            <Route path={'Profile'} element={<Profile/>} />
          </Route>
          <Route path={"/landing"} element={<Landing/>} />
          <Route path={"/register"} element={<Register/>} />
          <Route path={"*"} element={<Error/>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
