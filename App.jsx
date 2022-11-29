import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// components
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
 //function 
 import { getUser } from "./api/user";
 const App = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const unsubscibe = getUser().then((res) => {
			if(res.error) toast(res.error);
			else setUser(res.username);
		}).catch((err) => toast(err));
		return () => unsubscibe;
	},[]);
	
	return (
		<div>
			
		<Router>
		<UserContext.Provider value={{ user, setUser }}>
			<ToastContainer />
      <Header />
			<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/login" element={<Login />} />
			</Routes>
			</UserContext.Provider>
      </Router>
	  
	  </div>
	  
	);
};

export default App;
