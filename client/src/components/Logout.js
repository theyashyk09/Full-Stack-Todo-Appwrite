import React from "react";
import { useNavigate } from "react-router-dom";
import { ImSwitch } from "react-icons/im";
import { account } from "../services/appwriteConfig";
import { toast } from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute top-5 right-10">
      <button
        className="flex items-center gap-2 bg-[#2926A7] py-1 px-2 text-white rounded-md"
        onClick={handleLogout}
      >
        <ImSwitch /> Logout
      </button>
    </div>
  );
}

export default Logout;
