import React, { useState, useEffect } from "react";
import axios from "axios";

const GameFrame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [email, setEmail] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getUserData = () => {
      let userData = localStorage.getItem("user");
      return userData === "null" || userData === null || userData === "";
    };

    const timer = setTimeout(() => {
      if (getUserData() && !showConfirmModal) {
        setShowModal(true);
      }
    }, 15000);

    const hasUserData = getUserData();
    if (!hasUserData) {
      setShowModal(false);
    }

    return () => clearTimeout(timer);
  }, [showConfirmModal]);

  // Simulate loading assets and update progress
  useEffect(() => {
    const loadAssets = async () => {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate loading time
      }
      setIsLoading(false);
    };

    loadAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      email: email,
    };

    axios.defaults.withCredentials = true;
    await axios
      .post(`https://test-frontend.onehubplay.com:8000/api/slot-machine/register`, postData)
      .then((response) => {
        console.log(response);
        setRequestLoading(false);

        if (response.data.status === "Success") {
          setShowModal(false);
          setShowConfirmModal(true);
        } else {
          setRequestError("Unexpected response status");
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestLoading(false);
        setRequestError("Failed to create account");
      });
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10 min-h-screen">
          <div className="loader-container">
            <div className="progress-box">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="loading-text">Loading... {progress}%</p>
          </div>
        </div>
      )}

      <iframe
        src="https://spin-game-sandy.vercel.app"
        title="Full Screen Iframe"
        className="absolute top-0 left-0 w-full h-full border-none"
        allowFullScreen
        onLoad={() => {
          setIsLoading(false);
        }}
      ></iframe>

      {showModal && !showConfirmModal && (
        <div
          className="fixed inset-0 flex items-center justify-center h-auto bg-black bg-opacity-50 z-20"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="rounded-lg p-8 shadow-md px-6 h-auto bg-10% bg-no-repeat bg-center border-2 border-black flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/images/MessagePanel.png')" }}
          >
            <h2 id="modal-title" className="text-3xl font-bold font-sans text-white">
              You've Won 3 Free Slot Spins
            </h2>
            <p id="modal-description" className="font-bold font-serif mt-2 text-white">
              Win the Big Jackpot
            </p>

            <form onSubmit={handleSubmit} className="mt-4 text-black">
              <p className="text-white">Verify Your Email to Claim your spins:</p>
              <div className="mb-4 mt-[8px]">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/images/ExtraLongButton.png')",
                }}
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div
          className="fixed inset-0 flex items-center justify-center h-auto bg-black bg-opacity-50 z-30"
          role="dialog"
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
        >
          <div
            className="rounded-lg p-8 shadow-md px-6 h-auto bg-10% bg-no-repeat bg-center border-2 border-black flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/images/MessagePanel.png')" }}
          >
            <h2 id="confirm-modal-title" className="text-3xl font-sans mb-4 text-white font-bold">
              Verification Initiated
            </h2>
            <p id="confirm-modal-description" className="mt-2 text-center text-white">
              Please check your email for a confirmation link to verify your account.
              <br />
              Once verified, you can enjoy your 3 free spins!
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .loader-container {
          text-align: center;
        }

        .progress-box {
          width: 320px;
          height: 50px;
          background-color: #222222;
          border-radius: 5px;
          position: relative;
          margin-bottom: 10px;
        }

        .progress-bar {
          height: 50px;
          background-color: #ffea31;
          border-radius: 5px;
          transition: width 0.2s ease;
        }

        .loading-text {
          color: #ffffff;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default GameFrame;
