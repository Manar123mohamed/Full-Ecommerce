import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit (e){
    e.preventDefault();
    setIsLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { resetCode })
      .then((response) => {
        console.log("Reset code verified:", response.data);
        toast.success("Reset code verified successfully.");
        navigate("/newpassword");
      })
      .catch((error) => {
        console.log( error);
        toast.error(error.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center  p-4">
      <h1 className="text-2xl mb-4 text-green-700 resetcode">Enter Reset Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input  type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter the code sent to your email"value={resetCode} onChange={(e) => setResetCode(e.target.value)} required />
        <button  type="submit" disabled={isLoading} className=" w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition" >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}
