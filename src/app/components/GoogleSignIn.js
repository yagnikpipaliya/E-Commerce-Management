import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, setUserProfile } from "../redux/e-commerce/authSlice";

const GoogleSignIn = ({toggleLoginModal}) => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.auth);

  // const handleSuccess = (response) => dispatch(loginWithGoogle(response.credential));
  // const handleSuccess = (response) => console.log(response);
  const handleSuccess = useGoogleLogin({
    onSuccess: (response) => {
      setUser(response);
      // dispatch(setUserProfile(response));
      console.log(response);
      dispatch(loginWithGoogle(response.access_token))
      toggleLoginModal()
    },
    onError: (response) => console.log("Google login error: ", response),
  });
  const handleError = (response) => console.error(response);

  if (loading) return <div className="loader">Loading...</div>;
  if (profile)
    return (
      <div className="profile">
        <img src={profile.picture} alt="" className="profile-image" />
        <h3>{profile.name}</h3>
      </div>
    );
  return (
    // <GoogleOAuthProvider clientId="766021033888-5hu0johh235fqogi9m9ic612bof87nn3.apps.googleusercontent.com">
    <button onClick={handleSuccess} className="bg-[#057C80] text-white px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition duration-300">Sign in with Google</button>

    // <GoogleLogin
    //   onSuccess={handleSuccess}
    //   onError={handleError}
    //   text="Sign in with Google"
    //   className="bg-[#057C80] text-white px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition duration-300"
    // />
    // </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
