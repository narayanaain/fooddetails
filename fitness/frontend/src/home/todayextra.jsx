import React from "react";

export default function TodayExtraMeals({ extraMeals }) {

  const today = new Date().toLocaleDateString();
  return (
    <div className="bg-[#cfe6cf] w-[400px] rounded-lg">
      <h3 className="p-3 text-xl font-semibold">Today's Extra Meals ({today})</h3>
      <ul className="p-3">
        {extraMeals.map((meal, index) => (
          <li key={index} className="flex justify-between items-center bg-white p-2 rounded-lg mb-2">
            <div className="gauge-chart-container"> {/* New container for gauge chart */}
              <h3>{meal.meal}</h3> {/* Meal name */}
              {/* Add progress bar component here */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
