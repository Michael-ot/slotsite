import React from "react";

const LoadingPage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/Background_1.png")' }}
    >
      <div className="w-full max-w-lg h-2 bg-yellow-500 relative overflow-hidden">
        <div className="absolute h-full w-full bg-orange-500 animate-loading" style={{ animation: 'loading 2s linear infinite' }}></div>
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