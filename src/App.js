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

function App() {
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    // Function to check if user data exists in localStorage
    const getUserData = () => {
      let userData = localStorage.getItem("user");
      return userData && userData !== "null" && userData !== "";
    };

    const hasUserData = getUserData();
    if (hasUserData) {
      setRedirectTo("/game");
    } else {
      setRedirectTo("/");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {redirectTo === "/" && <Route path="/" element={<LandingPage />} />}
        {redirectTo === "/game" && (
          <Route path="/" element={<Navigate to="/game" replace />} />
        )}
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
  );
}

export default App;
