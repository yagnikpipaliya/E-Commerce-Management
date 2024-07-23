import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../redux/e-commerce/authSlice";

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.auth);

  const handleSuccess = (response) => dispatch(loginWithGoogle(response.credential));
  const handleError =response=> console.error(response);

  if (loading) return <div className="loader">Loading...</div>;
  if (profile)
    return (
      <div className="profile">
        <img src={img.picture} alt="" className="profile-image" />
        <h3>{profile.name}</h3>
      </div>
    );
  return (
    <GoogleOAuthProvider clientId="">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} text="Sign in with Google" className="bg-[#057C80] text-white px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition duration-300"/>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
