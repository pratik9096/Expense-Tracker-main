import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

 


const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);
    const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item?.source || 'Unknown',
            amount: item?.amount || 0,
        }));
        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
    }, [data]);


    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>
            <div style={{ height: '400px' }}>
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    colors={COLORS}
                    showTextAnchor
                />
            </div>
        </div>
    );
};

export default RecentIncomeWithChart;

