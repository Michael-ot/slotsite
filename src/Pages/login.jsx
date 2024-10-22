import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import images from 'public'
//
function LOGIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Simulate a login process (replace with your login logic)
    console.log("Logging in with:", { email, password });
    setError("");
    // Reset fields after submission
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Background_1.png')" }}
      >
        <div
          className="rounded-lg p-8  shadow-md w-96 h-auto  bg-10% bg-no-repeat bg-center 
border-2 border-black"
          style={{ backgroundImage: "url('/images/MessagePanel.png')" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            LOGIN
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <Link to={"/amount"}>
              <button
                type="submit"
                className="w-full text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
                style={{
                  backgroundImage: "url('/images/ExtraLongButton.png')",
                }}
              >
                Login
              </button>
            </Link>
            <p className="text-white text-right mt-[10px]">
              Dont have an account? <Link to="/signup"> sign up </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LOGIN;
