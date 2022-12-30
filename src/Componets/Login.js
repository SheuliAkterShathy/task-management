import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successfull");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col max-w-md mx-auto my-10 p-6 rounded-md sm:p-10 bg-sky-100">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Log in</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        novalidate=""
        action=""
        className="space-y-12 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-4">
          <div>
            <label for="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label for="password" className="text-sm">
                Password
              </label>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline text-gray-400"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-sky-300 text-gray-900"
            >
              Log in
            </button>
          </div>
          {/* <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                    <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Sign up</a>.
                </p> */}
        </div>
        <div>{loginError && <p className="text-red-600">{loginError}</p>}</div>
      </form>

      <button
        onClick={handleGoogleSignIn}
        aria-label="Login with Google"
        type="submit"
        className="flex items-center justify-center w-full my-5 p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1py-3 bg-sky-300 focus:ring-violet-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Login with Google</p>
      </button>

      <p className="px-6 text-sm text-center text-gray-400">
        Don't have an account yet?
        <Link to="/signup" className="hover:underline text-violet-400">
          Sign up
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;
