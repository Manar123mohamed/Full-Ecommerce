import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
      .then(function (response) {
        console.log(response.data);
        toast.success("Check your email for the reset code.");
        localStorage.setItem("resetEmail", email); 
        navigate("/resetcode");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  return (
    <div className=" flex flex-col justify-center items-center  p-4">
  <h1 className="text-2xl mb-6 text-green-700 font-semibold">Forgot Password</h1>

  <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
    <input type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <button type="submit"disabled={isLoading} className="w-full bg-green-700 text-white py-2 px-4 rounded transition hover:bg-green-800">
      {isLoading ? "Sending..." : "Send Reset Code"}
    </button>
  </form>
  <br /><br /><br /><br /><br /><br /><br /><br /><br />
</div>

  );
}







// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email })
//       .then(({ data }) => {
//         console.log(data);
//         toast.success("Check your email for the reset code.");
//         localStorage.setItem("resetEmail", email); 
//         navigate("/resetcode");
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.response?.data?.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl mb-4 text-green-700">Forgot Password</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
//         >
//           {isLoading ? "Sending..." : "Send Reset Code"}
//         </button>
//       </form>
//     </div>
//   );
// }
