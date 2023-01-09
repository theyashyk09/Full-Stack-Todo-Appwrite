import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import todologo from "../assets/sample.png";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { account } from "../services/appwriteConfig";
import GLogo from "../assets/glogo.png";

function Login() {
  const [showPass, setShowPass] = useState(false);

  const showPassw = () => {
    setShowPass(!showPass);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailCheck = /^[A-Za-z0-9.]{3,25}@[A-Za-z]{3,25}[.]{1}[A-Za-z]{2,6}$/;

  const submitBtn = async () => {
    if (!email || !password) {
      toast.error("Enter all details");
    } else if (!emailCheck.test(email)) {
      toast.error("Enter correct email");
    } else {
      try {
        await account.createEmailSession(email, password);
        navigate("/");
        toast.success("Successfully Signed In");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const googleAuth = async () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/",
      "http://localhost:3000/login"
    );
  };
  return (
    <>
      <div className="section h-screen flex items-center bg-[#060917] ">
        <div className="main border-2 border-[#435FFF] mx-auto w-[420px] flex flex-col items-center rounded-md p-5 gap-5">
          <img
            src={todologo}
            className="h-[50px] absolute top-5 left-5"
            alt=""
          />
          <div className="top flex items-center flex-col">
            <h1 className="font-bold text-[24px] mb-2 text-[#435FFF]">
              Welcome Back!
            </h1>
          </div>
          <div className="mid flex flex-col items-center gap-5 w-full">
            <div className="inptop w-full">
              <p className="mb-1 text-white font-medium">Email Address</p>
              <input
                type="email"
                name=""
                className="eml border-2 border-[#020204]  w-full outline-none rounded-sm py-2 px-1 font-normal"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="inpbtm w-full relative">
              <p className="mb-1 text-white font-medium">Password</p>
              <input
                type={showPass ? "text" : "password"}
                name=""
                id=""
                className="border-2 border-[#020204]  w-full outline-none rounded-sm py-2 px-1 font-normal"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p
                className="passIcon cursor-pointer text-xl"
                onClick={showPassw}
              >
                <AiOutlineEye className="showEye absolute right-2 top-10 " />
              </p>
            </div>
            <div className="w-full mt-2">
              <button
                className="px-2 py-3 text-[18px]  rounded-md text-white bg-[#553FE6] w-full font-medium"
                onClick={submitBtn}
              >
                SIGN IN
              </button>
              <p
                className="border-2 border-[#553FE6] px-2 py-2 cursor-pointer mt-2 rounded-md text-center flex items-center justify-center gap-2 text-white"
                onClick={googleAuth}
              >
                <img src={GLogo} alt="" className="h-[35px]" />
                SIGN IN WITH GOOGLE
              </p>
            </div>
          </div>
          <div className="bottom">
            <p className=" text-[17px] font-medium text-white">
              Don't have an account?
              <Link to="/register" className="underline ml-2 ">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
