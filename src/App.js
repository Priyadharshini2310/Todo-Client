import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"; 
import './App.css'
function App() {
	
  return (
    <Routes>
			<Route path="/dashboard" exact element={<Home />} />
		    <Route path="/signup" exact element={<Signup />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
  );
}

export default App;
