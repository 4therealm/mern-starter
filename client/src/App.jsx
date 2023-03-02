import { useState, useEffect } from "react";
import "./App.css";
import GeoLocation from "./components/Geolocation";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Neighborhood from "./pages/Neighborhood";
import Dashboard from "./pages/Dashboard";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);


  return (
    <BrowserRouter>
      <GeoLocation setUserLocation={setUserLocation} userLocation={userLocation}/>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userId={userId}
        setUserId={setUserId}
        userLocation={userLocation}
      />
 <div className="pt-3 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/:id?" element={<Dashboard isLoggedIn={isLoggedIn} userId={userId} userLocation={userLocation}/>} />
          <Route path="/neighborhood/:id?" element={<Neighborhood userLocation={userLocation} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 

export default App;