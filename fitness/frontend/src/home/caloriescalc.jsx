import React, { useState, useEffect } from 'react';
import GaugeChart from "react-gauge-chart";

const CalorieCalculator = () => {
  const [calorieData, setCalorieData] = useState({
    targetCalories: 0,
    consumedCalories: 0,
    remainingCalories: 0
  });

  useEffect(() => {
    fetchCalorieData();
  }, []);

  const fetchCalorieData = async () => {
    try {
      const response = await fetch('http://localhost:3000/daily-calories');
      if (response.ok) {
        const data = await response.json();
        setCalorieData(data);
      }
    } catch (error) {
      console.error('Error fetching calorie data:', error);
    }
  };

  const percentage = calorieData.consumedCalories / calorieData.targetCalories;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#e6f2e6] rounded-lg w-80 h-70 shadow-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <p className="text-sm font-bold text-green-800 ml-2">Calories</p>
        </div>
        <p className="text-sm font-semibold text-green-800">Today</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <GaugeChart
          id="calorie-gauge"
          nrOfLevels={1}
          colors={["#145D00", "#145D00"]}
          arcWidth={0.2}
          percent={percentage}
          textColor="#000"
        />
        <p className="text-lg font-bold text-green-900 mt-2">
          {calorieData.consumedCalories} / {calorieData.targetCalories} cal
        </p>
      </div>
    </div>
  );
};

export default CalorieCalculator;
