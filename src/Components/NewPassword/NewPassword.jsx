import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setIsLoading(true);

    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, { 
        email: localStorage.getItem("resetEmail"), 
        newPassword
      })
      .then((response) => {
        console.log("Password changed successfully:", response.data);
        toast.success("Password changed successfully!");
        navigate("/login"); 
      })
      .catch((error) => {
        console.log("Error resetting password:", error);
        toast.error(error.response?.data?.message );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
   <div className=" flex flex-col justify-center items-center  p-4">
  <h1 className="text-2xl mb-6 text-green-700 font-semibold">Set New Password</h1>

  <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
    <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter new password" value={newPassword}  onChange={(e) => setNewPassword(e.target.value)}  required/>
    <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
      {isLoading ? "Changing..." : "Change Password"}
    </button>
  </form>
    <br /><br /><br /><br /><br /><br /><br /><br /><br />
</div>

  );
}
