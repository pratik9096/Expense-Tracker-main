import React from "react";
import CARD_2 from "../../assets/images/card2.png"
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section: Form */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section: Image and Cards (only visible on md and above) */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 relative overflow-hidden">
        
        {/* Decorative floating shapes */}
        {/* These are positioned absolutely relative to the parent container */}
        <div className="w-56 h-56 rounded-[40px] bg-purple-600/90 absolute -top-12 -left-12 rotate-12"></div>
        <div className="w-64 h-64 rounded-[40px] border-[25px] border-fuchsia-500/80 absolute top-[25%] -right-16 rotate-[25deg]"></div>
        <div className="w-52 h-52 rounded-[40px] bg-violet-500/80 absolute -bottom-12 left-8 -rotate-12"></div>

        {/* Container for the centered content to ensure proper layering */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">

          {/* Stats Info Card */}
          {/* Positioned towards the top of the container */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-11/12 max-w-sm">
            <StatsInfoCard
              icon={<LuTrendingUpDown size={28} />}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-purple-600"
            />
          </div>

          {/* Main Content Card Image */}
          {/* This image is centered in the available space */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-xl mt-12">
             <img
                // Using a placeholder for the transaction card image
                src={CARD_2}
                className="w-full rounded-2xl shadow-2xl shadow-purple-400/20 border border-gray-200/50"
                alt="All Transactions Chart"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;



const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
