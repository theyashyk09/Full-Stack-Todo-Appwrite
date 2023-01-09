import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import todologo from "../assets/sample.png";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { ID } from "appwrite";
import { account } from "../services/appwriteConfig";
import GLogo from "../assets/glogo.png";

function Register() {
  const [showPass, setShowPass] = useState(false);

  const showPassw = () => {
    setShowPass(!showPass);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const nameCheck = /^[a-z A-Z]{3,30}$/;
  const emailCheck = /^[A-Za-z0-9.]{3,25}@[A-Za-z]{3,25}[.]{1}[A-Za-z]{2,6}$/;

  const submitBtn = async () => {
    if (!name || !email || !password) {
      toast.error("Enter all details");
    } else if (!nameCheck.test(name)) {
      toast.error("Name cannot contain any symbols or numbers");
    } else if (!emailCheck.test(email)) {
      toast.error("Enter correct email");
    } else if (password === email) {
      toast.error("Email and Password cannot be same");
    } else {
      try {
        const check = await account.create(ID.unique(), email, password, name);
        if (check) {
          await account.createEmailSession(email, password);
        }
        navigate("/");
        toast.success("Successfully Signed Up");
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
      <div className="section h-screen flex items-center bg-[#060917]">
        <div className="main border-2 border-[#435FFF] mx-auto w-[420px] flex flex-col items-center rounded-md p-5 gap-5">
          <img
            src={todologo}
            className="h-[50px] absolute top-5 left-5"
            alt=""
          />
          <div className="top flex items-center flex-col">
            <h1 className="font-bold text-[24px] mb-2 text-[#435FFF]">
              CREATE ACCOUNT
            </h1>
          </div>
          <div className="mid flex flex-col items-center gap-5 w-full">
            <div className="inptop w-full">
              <p className="mb-1 text-white font-medium">Name</p>
              <input
                type="text"
                name=""
                className="border-2 border-[#020204]  w-full outline-none rounded-sm py-2 px-1 font-normal"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="inptop w-full">
              <p className="mb-1 text-white font-medium">Email Address</p>
              <input
                type="text"
                name=""
                className="border-2 border-[#020204]  w-full outline-none rounded-sm py-2 px-1 font-normal"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="inpbtm w-full relative">
              <p className="mb-1 text-white font-medium">Password</p>
              <input
                type={showPass ? "text" : "password"}
                name=""
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
                SIGN UP
              </button>
              <p
                className="border-2 border-[#553FE6] px-2 py-2 cursor-pointer mt-2 rounded-md text-center flex items-center justify-center gap-2 text-white"
                onClick={googleAuth}
              >
                <img src={GLogo} alt="" className="h-[35px]" />
                SIGN UP WITH GOOGLE
              </p>
            </div>
          </div>
          <div className="bottom">
            <p className=" text-[17px] font-medium text-white">
              Already have an account?
              <Link to="/login" className="underline ml-2 text-white">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
