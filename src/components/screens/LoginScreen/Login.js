import React, { useState, useEffect } from 'react';
import MainScreen from '../../MainScreen';
import { Link, useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginScreen.css";
import Header from '../../Header/Header';
import GoogleButton from "react-google-button"



const LoginScreen = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate.push("/dashboard")
      window.location.reload();
    };
  }, [user, loading, navigate]);

  return (
    <MainScreen title="LOGIN">
      <div className="login">
        {/* <Header currentPage="login" /> */}
        <div className="loginContainer">
          <label for="email">Enter E-mail Id or Username : </label> <br></br>
          <input
            type="email"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <br></br>
          <label for="password">Enter Password   :   </label><br></br>
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          /><br></br>
          <br></br>
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button> &nbsp;&nbsp;
          <GoogleButton className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </GoogleButton>
          <br></br>
          <br></br>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <br></br>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </MainScreen>
  )
};

export default LoginScreen;
