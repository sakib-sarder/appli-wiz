import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../Provider/AuthProvider";
import login from "../../../assets/login.jpg"
import google from "../../../assets/google.png"
import { toast } from "react-hot-toast";
// import { saveUserInfo } from "../../../API/auth";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
//   const { logInWithEmilPassword, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    logInWithEmilPassword(data.email, data.password)
      .then((result) => {
        navigate(from, { replace: true });
        toast.success(`Welcome Back ${result?.user?.displayName}`);
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Invalid email or password");
          return;
        } else {
          setError("");
        }
        
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        saveUserInfo(result?.user);
        navigate(from, { replace: true });
        toast.success(`Welcome ${result?.user?.displayName}`);
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-65.59px)]">
      <div className="mx-auto w-2/4 hidden md:block lg:w-1/3 md:w-1/2">
       <img src={login} alt="" />
      </div>
      <div className="md:w-1/2 w-5/6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-3/4 lg:w-3/5 space-y-2 border-[1px] px-3 rounded-xs shadow-md py-6 mx-auto"
        >
          <h1 className="text-2xl font-bold">Please Login!</h1>
          <div className="form-control w-full">
            <label htmlFor="email" className="block text-sm">
              <span className="label-text">Your Email</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              className="border w-full text-sm px-1 py-1.5 border-black focus:outline-none"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="text-xs text-warning">Email is required</span>
          )}
          <div className="form-control w-full">
            <label htmlFor="password" className="text-sm block">
              <span className="label-text">Your Password</span>
            </label>
            <input
              id="password"
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="border w-full text-sm px-1 py-1.5 border-black focus:outline-none"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          {/* Password Error Message */}
          {errors.password && (
            <span className="text-xs text-warning">Password is required</span>
          )}
          {error && <span className="text-xs text-warning">{error}</span>}
          <div className="flex w-full items-center gap-2">
            <input
              onClick={() => setSeePassword(!seePassword)}
              type="checkbox"
              className="checkbox"
            />
            <span className="text-sm">See password</span>
          </div>
          <input
            type="submit"
            value="Login"
            className=" w-full cursor-pointer bg-gray-200 py-1.5 font-bold tracking-widest hover:bg-gray-300 transition duration-300"
          />
          <p className="text-sm text-center pt-1">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
        <div
          onClick={handleGoogleSignIn}
          className="flex bg-gray-200 hover:bg-gray-300 transition duration-200 items-center gap-1 justify-center mt-2 shadow-lg md:w-3/4 lg:w-3/5 mx-auto py-2 cursor-pointer rounded-xs"
        >
          <span className="text-2xl font-semibold">Continue With</span>
          <img src={google} alt="Google Logo" className="w-7" />
        </div>
      </div>
    </div>
  );
};

export default Login;
