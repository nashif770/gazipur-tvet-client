import React, { useContext } from "react";
import { AuthContext } from "../../../0.providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };

      updateUserProfile(saveUser.name).then(() => {
        console.log("user profile updated");
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      });
    });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <div className="w-full text-center my-8">
        <button
          className="btn btn-block bg-slate-400"
          onClick={handleGoogleLogin}
        >
          Google Login
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
