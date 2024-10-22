import React, { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";

const LoadingPage = () => {
  const [searchParams] = useSearchParams();
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      const verifyAccount = async () => {
        axios.defaults.withCredentials = true;
        return axios.post(
          `https://test-frontend.onehubplay.com:8000/api/verify-account/${token}`
        );
      };

      verifyAccount()
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "Success") {
            // localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user)); 
            setRedirectTo("/game");
          } else {
            console.log("Verification failed");
          }
        })
        .catch((error) => {
          console.error("Error verifying account:", error);
        });
    }
  }, [searchParams]);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/Background_1.png")' }}
    >
      <div className="w-full max-w-lg h-2 bg-yellow-500 relative overflow-hidden">
        <div
          className="absolute h-full w-full bg-orange-500 animate-loading"
          style={{ animation: "loading 2s linear infinite" }}
        ></div>
      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              left: -100%; /* Start position */
            }
            100% {
              left: 100%; /* End position */
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;
