import React, { useEffect, useState } from "react";
import { account } from "../services/appwriteConfig";

function Username() {
  const [userData, setUserData] = useState("");

  const user = async () => {
    const resp = await account.get();
    setUserData(resp.name);
  };

  useEffect(() => {
    user();
  }, []);
  return (
    <div className="flex justify-center mt-5">
      <h4 className=" text-xl bg-[#E7B853] rounded-sm px-4 py-2 max-w-max font-medium closed dark:bg-[#2926A7] dark:text-white dark:border-[#2926A7] dark:border-2">
        {userData.toUpperCase()} Todo's
      </h4>
    </div>
  );
}

export default Username;
