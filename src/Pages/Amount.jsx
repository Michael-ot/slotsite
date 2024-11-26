import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Amount = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleAmountClick = async (amount) => {
    setSelectedAmount(amount);
    console.log(`Selected amount: ${amount}`);

    const token = localStorage.getItem("token");
    setError(null);

    try {
      const response = await axios.post(
        "https://onehubplay.com:8000/api",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response from server:", response.data);
      const paymentLink = response.data.data.paymentLink;
      if (paymentLink) {
        window.location.href = paymentLink;
      }
    } catch (error) {
      console.error("Error sending amount:", error);
      setError("Failed to send amount. Please try again.");
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Background_1.png')" }}
      >
        <div className="relative">
          <img src="/images/MessagePanel.png" alt="#" />
          <h1 className="absolute text-4xl text-white top-[70px] left-[27%] max-[576px]:left-[25%]">
            Click On Amount
          </h1>

          <div className="absolute top-[160px] left-[30px] grid grid-cols-3 gap-3 flex justify-center max-[576px]:top-[130px]">
            {[10, 50, 100, 200, 300, 400, 500].map((amount) => (
              <button
                key={amount}
                type="button"
                className="w-[160px] font-bold text-2xl mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/images/ExtraLongButton.png')",
                }}
                onClick={() => handleAmountClick(amount)}
              >
                {amount}$
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amount;
