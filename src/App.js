import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LOGIN from "./Pages/login";
import Signup from "./Pages/Signup";
// import Amount from "./Pages/Amount";
import Sorry from "./Pages/Sorry";
import Amount from "./Pages/Amount";
import Payment from "./Pages/Payment";
import GameFrame from "./Pages/GameFrame";
import LoadingPage from "./Pages/LoadingPage";

function App() {
  return (
    < Router>
      <Routes>
      <Route path="/" element={<GameFrame/>} />
      <Route path="/game" element={<GameFrame />} />
        <Route path="/amount" element={<Amount />} />
        <Route path="/verify" element={<LoadingPage />} />
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/login" element={<LOGIN />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/sorry" element={<Sorry />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
