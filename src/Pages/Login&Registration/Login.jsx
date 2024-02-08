import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../0.providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);

  // useEffect(() => {
  //   loadCaptchaEnginge(4);
  // }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log("sigining", user);
      swal({
        title: "Welcome",
        text: "Logged in Successfully",
        icon: "success",
        button: "Procced",
      });
    });
    navigate(from, {replace: true})
  };

  // const handleValidateCaptcha = (event) => {
  //   const user_captcha_value = event.target.value;
  //   if (validateCaptcha(user_captcha_value)) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //     alert("Wrong Captcha");
  //   }
  // };

  return (
    <div className="hero min-h-screen max-h-[720px] bg-base-200">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            {/* <div className="form-control mt-3 w-4/6 m-auto">
              <label className="label m-auto">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                name="captcha"
                placeholder="Type the above text"
                className="input input-bordered"
                onBlur={handleValidateCaptcha}
                required
              />
              <h2 className="bg-slate-100 my-3 rounded text-center text-sm">
                {" "}
                Type the Captcha to unlock Login{" "}
              </h2>
            </div> */}
            <div className="form-control mt-6">
              <input
                // disabled={disabled}
                className="btn btn-primary"
                type="submit"
                value="Login"
              />
            </div>
          </form>

          <p className="my-6 m-auto">
            New Here?{" "}
            <Link to={"/registration"} className="text-blue-900">
              Create a new Account
            </Link>
          </p>
          {/* <SocialLogin></SocialLogin> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
