import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LOGIN from "./Pages/login";
import Signup from "./Pages/Signup";
import Sorry from "./Pages/Sorry";
import Amount from "./Pages/Amount";
import Payment from "./Pages/Payment";
import GameFrame from "./Pages/GameFrame";
import LoadingPage from "./Pages/LoadingPage";
import Suscribe from "./Pages/Suscribe";
import LandingPage from "./Pages/LandingPage";
import { Toaster } from "react-hot-toast";


function App() {
  const [hasData, setHasData] = useState(null);
  const [dl,setDL] = useState(null);

  useEffect(() => {
    // Function to check if user data exists in localStorage
    const getUserData = () => {
      let userData = localStorage.getItem("user");
      return userData && userData !== "null" && userData !== "";
    };

    const hasUserData = getUserData();
    // Get the query string from the current URL
    const queryString = window.location.search;
    // Initialize URLSearchParams with the query string
    const urlParams = new URLSearchParams(queryString);
    let dailys = urlParams.get('dl');
    setDL(dailys)
    if (hasUserData) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, []);

  return (
    <>    <Toaster />
    <Router>
      <Routes>
        {
          !hasData? (<Route path="/" element={<LandingPage />} />): (<Route path="/" element={<Navigate to={"/game"+window.location.search} replace />} />)
        }
        <Route path="/buy-coins" element={<Suscribe />} />
        <Route path="/game" element={<GameFrame />} />
        <Route path="/amount" element={<Amount />} />
        <Route path="/verify" element={<LoadingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<LOGIN />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>

    </>

  );
}

export default App;
