import MainScreen from "../../MainScreen";
import './RegisterScreen.css';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase";




function RegisterScreen() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate.push("/dashboard");
  }, [user, loading, navigate]);

    
  return (
    <MainScreen title="REGISTER ">
      
    <div className="register">
      <div className="register__container">
      <label for="text">Enter Full Name</label>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <label for="email">Enter Email</label>

        <input
          type="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        /><br></br>
        <label for="password">Enter Password</label>

        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /><br />
        <label for="password">Confirm Password</label>

        <input
          type="confirmPassword"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirmPassword"
        /><br />

        <button className="register__btn" onClick={register}>
          Register
        </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button><br />

        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>

      </MainScreen>
  );
}

export default RegisterScreen;

