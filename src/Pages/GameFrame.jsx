import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const geoip2 = window.geoip2;

const GameFrame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const location = useLocation();
  const [geoData, setGeoData] = useState(null);
  const [params, setParams] = useState({
    camp: '',
    unid: '',
    email: '',
  });
  const [token,setToken] = useState('');
  const [userid,setUserid] = useState('');
  const effectRan = useRef(false);
  const registerEffectRan = useRef(false);

  useEffect(() => {
    geoip2.country(
      (response1) => {
        setGeoData(response1);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    if (geoData == null ) return;
    // if(params.camp == "" || params.camp == null) return;
    if (effectRan.current) return; // Return early if effect has already run once

    // Get the URLSearchParams object from the location search
    const urlParams = new URLSearchParams(location.search);

    // Extract the values from the URL
    const camp = urlParams.get('camp');
    const unid = urlParams.get('unid');
    const email = urlParams.get('email');

    let params = { camp, unid, email }
    setParams({...params });  

    // const hasValues = camp && unid && email;

    console.log(camp, unid, email);

    // const loadingToast = toast.loading("Loading");
    let postData = {
      ip_address: geoData?.traits?.ip_address? geoData?.traits?.ip_address : '34834',  
      campaign_name: params?.camp,
    }

    const trackPage = async () => {
      axios.defaults.withCredentials = true;
      return await axios.post(`https://onehubplay.com:8000/api/slot-game-1-visit`, postData);
    };
 
   trackPage()
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error);
    });

    // if(params?.camp){
      
    //   setCancelModal(true);
    // }
      
    effectRan.current = true; // Mark effect as run
    
  }, [geoData,params]);

  useEffect(()=>{
    if(showModal == true){

      if (geoData == null ) return;
      // if(params.camp == "" || params.camp == null) return;
      if (registerEffectRan.current) return; // Return early if effect has already run once

      // Get the URLSearchParams object from the location search
      const urlParams = new URLSearchParams(location.search);

      // Extract the values from the URL
      const camp = urlParams.get('camp');
      const unid = urlParams.get('unid');
      const email = urlParams.get('email');

      let params = { camp, unid, email }
      setParams({...params });  

      console.log(camp, unid, email);

      let postData = {
        ip_address: geoData?.traits?.ip_address? geoData?.traits?.ip_address : '34834',  
        campaign_name: params?.camp,
      }

      const trackPage = async () => {
        axios.defaults.withCredentials = true;
        return await axios.post(`https://onehubplay.com:8000/api/slot-game-1-register-visit`, postData);
      };
  
    trackPage()
      .then((resp) => {
        console.log(resp)
        // toast.dismiss(loadingToast);
      })
      .catch((error) => {
        console.log(error);
        // toast.dismiss(loadingToast);
        // toast.error(error?.message);
      });
        
      registerEffectRan.current = true;
    }
  },[showModal])

  useEffect(() => {

    let userToken = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("token") ? localStorage.getItem("token") : "")
    setToken(userToken)
    setUserid(user.id)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      email: email,
      camp: params?.camp
    };

    axios.defaults.withCredentials = true;
    await axios
      .post(
        `https://onehubplay.com:8000/api/slot-machine/register`,
        postData
      )
      .then((response) => {
        console.log(response);
        setRequestLoading(false);

        if (response.data.status === "Success") {
          setShowModal(false);

          const isVerified = response.data.data.hasVerified;

          // localStorage.setItem("isVerified", isVerified.toString());

          setVerified(isVerified);

          // if (isVerified) {
            // Save user data and token to localStorage
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
            localStorage.setItem("token", response.data.data.token);
            console.log(response.data.data.token)
            setToken(response.data.data.token)
            localStorage.setItem("user-id", response.data.data.user.id);
            console.log("USER ID" + response.data.data.user.id)
            setUserid(response.data.data.user.id)
            setRedirectTo("/game");
          // } else {
          //   setShowConfirmModal(true);
          // }
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
        <div
          className="absolute inset-0 flex items-center justify-center  z-10 min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/backload.png')" }}
        >
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <h1>{"https://spintest.vercel.app?token="+token + "&uid="+ userid}</h1>        
      <iframe
        src={"https://spintest.vercel.app?token="+token + "&uid="+ userid}
        title="Full Screen Iframe"
        className="absolute top-0 left-0 w-full h-full border-none hidden md:block"
        allowFullScreen
        onLoad={() => {
          setIsLoading(false);
        }}
      ></iframe>

      <iframe
        src={"https://mobileslot.vercel.app/?token="+token}
        title="Mobile Full Screen Iframe"
        className="absolute top-0 left-0 w-full h-full border-none block md:hidden"
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
            <h2
              id="modal-title"
              className="text-3xl font-bold font-sans text-white"
            >
              You've Won 3 Free Slot Spins
            </h2>
            <p
              id="modal-description"
              className="font-bold font-serif mt-2 text-white"
            >
              Win the Big Jackpot
            </p>

            <form onSubmit={handleSubmit} className="mt-4 text-black">
              <p className="text-white">
                Verify Your Email to Claim your spins:
              </p>
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
            className="rounded-lg p-8 shadow-md px-6 w-[500px] h-auto bg-10% bg-no-repeat bg-center border-2 border-black flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/images/MessagePanel.png')" }}
          >
            <h2
              id="confirm-modal-title"
              className="text-3xl font-sans mb-4 text-white font-bold"
            >
              Verification Initiated
            </h2>
            <p
              id="confirm-modal-description"
              className="mt-2 text-center text-white"
            >
              check your email for a confirmation link to verify your account
              before it expires
              <br />
              so you can use your 3 free spins to win the jackpot!
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .loader-container {
          text-align: center;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #222222; /* Border color */
          border-top: 5px solid #ffea31; /* Spinner color */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GameFrame;
