import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const geoip2 = window.geoip2;

const Sorry = () => {
  const location = useLocation();
  const [geoData, setGeoData] = useState(null);

  const effectRan = useRef(false);

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
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Background_1.png')" }}
      >
        <div className="w-96 h-96 relative flex flex-col items-center">
          <img src="/images/MessagePanel.png" alt="#" className="absolute" />
          <div className="absolute flex flex-col items-center top-[90px]">
            <p className="text-white text-1xl mb-[10px] w-[80%] text-center">
              {" "}
              you have exhausted your spinning credits.Upgrade now to purchase
              additional credit to win the jackpot
            </p>
            <Link to={"/"}>
              <button
                className="w-full text-black my-[20px] py-2 px-4 rounded-md bg-100% h-[40px] bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/images/ExtraLongButton.png')",
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sorry;
