import React from "react";
import { Link } from "react-router-dom";

const Sorry = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Background_1.png')" }}
      >
        <div className="w-96 h-96 relative flex flex-col items-center">
          <img src="/images/MessagePanel.png" alt="#" className="absolute" />
          <div className="absolute flex flex-col items-center top-[90px]">
          
            <p className="text-white text-1xl mb-[10px]"> Sorry!!  You have no money</p>
            {/* <Link to={"/login"}> */}
              <button
                className="w-full text-black my-[20px] py-2 px-4 rounded-md bg-100% h-[40px] bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
              >
                Buy More?
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sorry;
