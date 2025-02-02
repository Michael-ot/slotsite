import React, { useState, useEffect, useRef } from "react";
import { SparklesIcon, MailIcon } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const geoip2 = window.geoip2;

const glowStyle = `
 @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700; }
    50% { box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
  }
  @-webkit-keyframes glow {
    0%, 100% { box-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700; }
    50% { box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
  }
  .glow {
    -webkit-animation: glow 2s ease-in-out infinite;
    animation: glow 2s ease-in-out infinite;
  }
`;
const isValidEmail = async (email) => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  let emailValidity = false;

  axios.defaults.withCredentials = false;
  await axios
    .get(
      "https://emailvalidation.abstractapi.com/v1/?api_key=fb718f22f2eb4a89b7a2e8997ab92050&email=" +
        email
    )
    .then((response) => {
      if (
        response.data?.deliverability === "DELIVERABLE" &&
        response.data?.is_valid_format?.value &&
        !response.data?.is_disposable_email?.value
      ) {
        emailValidity = true;
      } else {
        emailValidity = false;
      }
    })
    .catch((error) => {
      emailValidity = false;
    });

  return emailValidity;
};

export default function LandingPage() {
  const [token, setToken] = useState("");
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(true);
  const location = useLocation();
  const [geoData, setGeoData] = useState(null);
  const [params, setParams] = useState({
    camp: "",
    unid: "",
    email: "",
  });
  const [requestError, setRequestError] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const effectRan = useRef(false);
  const navigate = useNavigate();

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
    console.log("This use Effect is called");
    if (geoData == null) return;
    if (effectRan.current) return;

    const urlParams = new URLSearchParams(location.search);
    const camp = urlParams.get("camp");
    const unid = urlParams.get("unid");
    const email = urlParams.get("email");
    let dailys = urlParams.get("dl");
    let params = { camp, unid, email };
    setParams({ ...params });

    let postData = {
      ip_address: geoData?.traits?.ip_address
        ? geoData?.traits?.ip_address
        : "34834",
      campaign_name: params?.camp,
      dailys: dailys,
    };

    const trackPage = async () => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `https://onehubplay.com:8000/api/slot-game-1-register-visit`,
        postData
      );
    };

    trackPage()
      .then((resp) => {
        console.log("tracked Page ", resp);
      })
      .catch((error) => {
        console.log("tracked Page error ",error);
      });

    if (email) {
      let postData = {
        email: email,
        camp: params?.camp,
      };

      doRegister(postData);
      return;
    } else {
      setIsEmailLoading(false);
    }

  
    effectRan.current = true;
  }, [geoData, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let checkValidity = await isValidEmail(email);
    if (!checkValidity) {
      toast.error("Your email address is invalid.");
      setIsLoading(false);
      return;
    }
    let postData = {
      email: email,
      camp: params?.camp,
    };

    doRegister(postData);
  };

  const doRegister = async (postData) => {
    axios.defaults.withCredentials = true;
    await axios
      .post(`https://onehubplay.com:8000/api/slot-machine/register`, postData)
      .then((response) => {
        setIsLoading(false);
        if (response.data.status === "Success") {
          navigate("/game");
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("user-id", response.data.data.user.id);
          setToken(response.data.data.token);
          setUserid(response.data.data.user.id);

          const isVerified = response.data.data.hasVerified;
          setVerified(isVerified);

          if (isVerified) {
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
          }
        } else {
          setRequestError("Unexpected response status");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setRequestError("Failed to create account");
      });
  };

  return (
    <>
      {!isEmailLoading ? (
        <div
          className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8 sm:py-12 overflow-hidden"
          style={{
            backgroundImage: "url('/images/landing.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: glowStyle }} />

          <div
            className="absolute inset-0 bg-black/30 bg-opacity-30"
            style={{ backdropFilter: "blur(4px)" }}
            aria-hidden="true"
          />

          <header className="text-center mb-8 sm:mb-12 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 sm:mb-4 text-yellow-400">
              Win Big!
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
              Play for{" "}
              <span className="text-green-400 text-3xl sm:text-4xl md:text-5xl">
                FREE
              </span>
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white">
              No Deposit Needed!
            </p>
          </header>

          <main className="text-center mb-8 sm:mb-12 w-full max-w-md relative z-10">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-lg border-4 border-yellow-400 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                Collect your Daily Spins for a Chance to Win the{" "}
                <span className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl font-extrabold animate-pulse">
                  $1,000,000
                </span>{" "}
                Jackpot!
              </h3>
              <p className="mb-3 sm:mb-4 text-white text-sm sm:text-base">
                Sign up and start playing now!
              </p>
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
                  <MailIcon
                    className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow bg-white/10 border-white/20 text-white placeholder-gray-300 text-sm sm:text-base p-[5px]"
                    required
                    aria-label="Email address"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 rounded-full text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  {isLoading || isEmailLoading
                    ? "Loading..."
                    : "Get Your Free Spins!"}
                </button>
              </form>
            </div>

            <div
              className="bg-yellow-400 text-black rounded-lg p-6 sm:p-8 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border-4 border-yellow-600 glow"
              style={{
                WebkitTransform: "rotate(3deg)",
                WebkitTransition: "-webkit-transform 0.3s",
              }}
            >
              <SparklesIcon
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-600"
                aria-hidden="true"
              />
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">
                $1,000,000
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                Jackpot Prize!
              </p>
            </div>
          </main>
          <section className="text-center mb-8 sm:mb-12 relative z-10 w-full max-w-md">
            <div className="bg-purple-900/80 rounded-lg p-4 sm:p-6 border-2 border-purple-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                How to Win:
              </h3>
              <ol className="list-decimal list-inside text-left mx-auto text-white/90 text-sm sm:text-base">
                <li className="mb-1 sm:mb-2">Sign up with your email</li>
                <li className="mb-1 sm:mb-2">Collect your daily free spins</li>
                <li className="mb-1 sm:mb-2">
                  Spin the reels on our exciting slot machines
                </li>
                <li className="mb-1 sm:mb-2">Match the winning symbols</li>
                <li>Celebrate your massive $1,000,000 win!</li>
              </ol>
            </div>
          </section>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/backload.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="loader-container">
            <div
              className="absolute inset-0 bg-black/30 bg-opacity-30"
              style={{ backdropFilter: "blur(4px)" }}
              aria-hidden="true"
            />

            <div className="spinner"></div>
          </div>

          <style jsx>{`
            .loader-container {
              text-align: center;
            }

            .spinner {
              width: 50px;
              height: 50px;
              border: 5px solid #222222;
              border-top: 5px solid #ffea31;
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
      )}
    </>
  );
}
