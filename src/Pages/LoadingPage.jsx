import React, { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";

const LoadingPage = () => {
  const [searchParams] = useSearchParams();
  const [redirectTo, setRedirectTo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

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
            // Save user data and token to localStorage
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
            localStorage.setItem("token", response.data.data.token);
            setRedirectTo("/game");
          } else {
            setErrorMessage("Verification failed. Please try again.");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying account:", error);
          setErrorMessage("An error occurred during verification.");
          setIsLoading(false);
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
      {isLoading ? (
        <div className="loader-container">
          <div className="progress-box">
            <div className="progress-bar"></div>
          </div>
        </div>
      ) : (
        errorMessage && (
          <div className="error-message">
            <p className="text-white text-xl">{errorMessage}</p>
          </div>
        )
      )}

      <style>
        {`
          .loader-container {
            text-align: center;
          }

          .progress-box {
            width: 320px;
            height: 50px;
            background-color: #222222;
            position: relative;
            overflow: hidden;
          }

          .progress-bar {
            height: 40px;
            width: 100%;
            background-color: #ffea31;
            animation: loading 2s linear infinite;
            position: absolute;
            top: 5px;
            left: -100%;
          }

          @keyframes loading {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          .error-message {
            text-align: center;
            padding: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;
