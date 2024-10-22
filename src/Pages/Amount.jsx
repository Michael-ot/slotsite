import React from "react";

const Amount = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Background_1.png')" }}
      >
        <div className="relative ">
          <img src="/images/MessagePanel.png" alt="#" />

          <h1 className="absolute text-4xl text-white  top-[70px] left-[27%] max-[576px]:left-[25%]">Click On Amount</h1>
          <div className="absolute top-[160px] left-[30px] grid grid-cols-3 gap-3 flex justify-center max-[576px]:top-[130px] ">
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl  mt-[15px]  mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              10$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl mt-[15px]  max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              50$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              100$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              200$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              300$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl  mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              400$
            </button>
            <button
              type="submit"
              className="w-[160px] font-bold text-2xl mt-[15px] max-[576px]:w-[130px] h-[50px] text-black py-2 rounded-md bg-100% h-[40px] bg-no-repeat bg-center "
              style={{ backgroundImage: "url('/images/ExtraLongButton.png')" }}
            >
              500$
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Amount;
