import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const geoip2 = window.geoip2;

const Sorry = () => {
  const location = useLocation();
  const [geoData, setGeoData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/Background_1.png"
  );

  const effectRan = useRef(false);

  useEffect(() => {
    // Detect screen size on window resize
    const updateBackgroundImage = () => {
      if (window.innerWidth <= 500) {
        setBackgroundImage("/images/Background_2.png"); // Mobile background image
      } else {
        setBackgroundImage("/images/Background_1.png"); // Default background image
      }
    };

    // Run the function on mount and when the window is resized
    window.addEventListener("resize", updateBackgroundImage);
    updateBackgroundImage(); // Set initial background image based on the screen size

    return () => {
      window.removeEventListener("resize", updateBackgroundImage);
    };
  }, []);

  useEffect(() => {
    geoip2.country(
      (response1) => {
        setGeoData(response1);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (geoData == null) return;
    // if(params.camp == "" || params.camp == null) return;
    if (effectRan.current) return; // Return early if effect has already run once

    // Get the URLSearchParams object from the location search
    const urlParams = new URLSearchParams(location.search);

    // Extract the values from the URL
    const camp = urlParams.get("camp");

    let params = { camp };

    // const hasValues = camp && unid && email;

    console.log(camp);

    // const loadingToast = toast.loading("Loading");
    let postData = {
      ip_address: geoData?.traits?.ip_address
        ? geoData?.traits?.ip_address
        : "34834",
      campaign_name: params?.camp,
    };

    const trackPage = async () => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `https://onehubplay.com:8000/api/slot-game-1-no-funds`,
        postData
      );
    };

    trackPage()
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });

    // if(params?.camp){

    //   setCancelModal(true);
    // }

    effectRan.current = true; // Mark effect as run
  }, [geoData]);

  return (
    <>
      <div className="relative min-h-screen bg-cover bg-center flex justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          className="blur-sm absolute bg-cover bg-center  inset-0 bg-black"
        ></div>
        <div className="w-96 h-96 relative flex flex-col items-center">
          <img src="/images/MessagePanel.png" alt="#" className="absolute" />
          <div className="absolute flex flex-col items-center top-[90px]">
            <p className="text-white text-1xl mb-[10px] w-[80%] text-center">
              You have exhausted your spinning credits. Purchase addditional
              credits to win the jackpot
              {/* Service not available in your location */}
            </p>
            <Link to={"/buy-coins"}>
              <button
                className="w-full text-black my-[20px] py-2 px-4 rounded-md bg-100% h-[40px] bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/images/ExtraLongButton.png')",
                }}
              >
                Buy more credits
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sorry;
