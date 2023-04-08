import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import Cookies from "js-cookie";
// import { query, collection, getDocs, where } from "firebase/firestore";
// import MainScreen from "./components/MainScreen";

function UserAuth() {
  const userName = Cookies.get("userName");
  const [user, loading, error] = useAuthState(auth);
  // const [name, setName] = useState("");
  const navigate = useHistory();

  // const fetchUserName  = async () => {
  //   try {
  //     // const q = query(collection(db, "users"), where("uid", "==", user?.uid));

  //     // const doc = await getDocs(q);
  //     // console.log({user})
  //     // const data = doc.docs[0].data();

  //     // setName(data.name);

  //     return user.displayName

  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate.push("/");

    // fetchUserName();
  }, [user, loading]);
  return userName;
  // return (
  //   //     <MainScreen>
  //   //     <div className="dashboard">
  //   //       <div className="dashboard__container">
  //   //         Hi...User
  //   //         <div>{name}</div>
  //   //         <div>{user?.email}</div>
  //   //         <button className="dashboard__btn" onClick={logout}>
  //   //           Logout
  //   //         </button>
  //   //       </div>
  //   //     </div>
  //   //     </MainScreen>
  //   data

  // )
}

export default UserAuth;
