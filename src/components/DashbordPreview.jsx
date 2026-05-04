import React from "react";
import { RiBarChartLine } from "react-icons/ri"; // Importing the icon

const chartData = [
  { month: "Jan", income: 5000, expense: 2000 },
  { month: "Feb", income: 6000, expense: 3000 },
  { month: "Mar", income: 7000, expense: 4000 },
  { month: "Apr", income: 8000, expense: 4500 },
  { month: "May", income: 6500, expense: 2500 },
  { month: "Jun", income: 7200, expense: 4100 },
];

const DashbordPreview = () => {
  return (
    <div className="flex-1 relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-8 lg:p-12">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-lg space-y-8">
        {/* Summary Card */}
        <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-white/20 p-3 rounded-2xl">
              <RiBarChartLine className="text-white w-6 h-6" />
            </div>
            <span className="text-white/80 text-sm">Track Your Income & Expenses</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">$430,000</div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white/80">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-white/80">Expense</span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">All Transactions</h3>
            <span className="text-white/60 text-sm">2nd Jan to 21th Dec</span>
          </div>

          {/* Bar Chart */}
          <div className="space-y-4">
            <div className="flex items-end justify-between h-40 space-x-2">
              {chartData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center space-y-1">
                  {/* Income Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg relative group cursor-pointer"
                    style={{ height: `${(item.income / 8000) * 100}%` }}
                  >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      Income: ${item.income.toLocaleString()}
                    </div>
                  </div>

                  {/* Expense Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-b-lg relative group cursor-pointer"
                    style={{ height: `${(item.expense / 8000) * 100}%` }}
                  >
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      Expense: ${item.expense.toLocaleString()}
                    </div>
                  </div>

                  {/* Month Label */}
                  <span className="text-white/70 text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* View More Button */}
          <div className="mt-6">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 cursor-pointer">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordPreview;
