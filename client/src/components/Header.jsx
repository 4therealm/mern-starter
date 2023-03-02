
import { useState } from "react"
import { Link } from "react-router-dom"

import LoginForm from '../pages/Forms/LoginForm'
import SignupForm from '../pages/Forms/SignupForm'
import axios from 'axios'




//Add props as a function argument
const Header = (props) => { 
  console.log("🚀 ~ file: Header.jsx:14 ~ Header ~ props:", props)
  // show dropdown menu when user clicks on the hamburger menu
  const [ showDropDown, setShowDropDown ] = useState(false)
  const [ showLogin, setShowLogin ] = useState(false)
  const [ showSignup, setShowSignup ] = useState(false)
  const [ showLogout, setShowLogout ] = useState(false)
  
    
  
    const handleLogout=() => {
      props.setIsLoggedIn(false)
      console.log('Logged out')
    }
  
    const handleShowLoginForm=() => {
      setShowLogin(true)
      setShowSignup(false)
    }
  
    const handleHideLoginForm=() => {
      setShowLogin(false)
    }
  
    const handleShowSignupForm=() => {
      setShowSignup(true)
      setShowLogin(false)
    }
  
    const handleHideSignupForm=() => {
      setShowSignup(false)
    }
  
  
  
  
    const handleLogin = async (email, password) => {
      // the handleLogin function is called with the email and password as arguments
      try {
        const response = await axios.post('http://localhost:3001/api/status/login', {
          email,
          password
        });
     // set the userId state based on the response from the server
        props.setUserId(response.data);
        props.setIsLoggedIn(true);
        setShowLogin(false)
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleSignup = async (name, email, password, phone) => {
      // the handleSignup function is called with the name, email, password, and phone as arguments
      try {
        const response = await axios.post('http://localhost:3001/api/status/signup', {
          name,
          email,
          password,
          phone
        });
    // set the userId state based on the response from the server
        props.setUserId(response.data._Id); 
        props.setIsLoggedIn(true);
        setShowSignup(false);
        console.log('Signed up');
      } catch (error) {
        console.error(error);
      }
    };
    
  //userid from the app state
  const userId = props.userId;
  // the urls for the links in the header
  const dashboardUrl = `/dashboard/${userId}`;
  const neighborhoodUrl = `/neighborhood/${userId}`;
 
  return (
    
    <header className="px-2 pb-0 mb-0" style={{ borderBottom: "1px solid #333" }}>
  
      <nav className="navbar navbar-dark navbar-expand-md bg-body-secondary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="##">Navbar</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={dashboardUrl}>Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={neighborhoodUrl}>Neighborhood</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/*">404</a>
              </li>
            </ul>
            {props.isLoggedIn ? (
              <button onClick={handleLogout}>logout</button>
            ) : (
              <>
                <button onClick={handleShowLoginForm}>login</button>
                <button onClick={handleShowSignupForm}>signup</button>
              </>
            )}
          </div>
        </div>
      </nav>
      {showLogin&&(
        <LoginForm handleLogin={handleLogin} handleHideLoginForm={handleHideLoginForm} />
      )}
  
      {showSignup&&(
        <SignupForm handleSignup={handleSignup} handleHideSignupForm={handleHideSignupForm} />
      )}
    </header>
  )
  
}

export default Header