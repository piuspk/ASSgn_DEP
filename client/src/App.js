import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";



function App() {
  // let dd = [
  //   {
  //      title:"Tiger 3",
  //      amount:100,
  //      date : new Date()
  //   },
  //   {
  //      title:"Krish",
  //      amount:50,
  //      date : new Date()
  //   },
  //   {
  //      title:"Animal",
  //      amount:150,
  //      date : new Date()
  //   }

  // ]

  return (
    <>
      <Header/>
        <Routes>
          <Route path ='/' element ={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path ='/otp' element ={<Otp/>}/>
          <Route path ='/profile' element ={<Profile/>}/>
          <Route path ='/header' element ={<Header/>}/>
          <Route path='/error' element={<Error />} />
          
        </Routes>
    </>
  );
}

export default App;
