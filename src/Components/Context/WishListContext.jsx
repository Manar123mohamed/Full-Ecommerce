
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext(null);

export default function WishListContextProvider({ children }) {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

 
  function addProductToWish(productId) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/wishlist",{ productId },
        {
          headers: { token },
        }
      )
      .then(({ data }) => {
        toast.success(data.message, { position: "top-right" });
        getWichList();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message , {
          position: "top-right",
        });
      });
  }

  
  function getWichList() {
    if (!token) {
      setCartDetails(null); 
      return;
    }

    setLoading(true);
    axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", 
      {
        headers: { token },
      })
      .then(({ data }) => {
        setCartDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setCartDetails(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  
  function removeItem(productId) {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token },
        }
      )
      .then(({ data }) => {
        toast.success(data.message);
        getWichList();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message );
      });
  }
  useEffect(() => {
    getWichList();
  }, [token]);

  return (
    <WishListContext.Provider
      value={{
        addProductToWish,
        cartDetails,
        getWichList,
        loading,
        removeItem,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
