import React, { useState, useEffect } from "react";
import Header from "./header";
import ExtraMealPopup from "./Extrameal";
import TodayExtraMeals from "./todayextra";
import CalorieCalculator from "./caloriescalc";

export default function Components() {
  const [showPopup, setShowPopup] = useState(false);
  const [extraMeals, setExtraMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [mealItems, setMealItems] = useState([]);
  const [dailyCalories, setDailyCalories] = useState({
    targetCalories: 243,
    consumedCalories: 0
  });

  useEffect(() => {
    fetchMealItems(selectedMeal);
    fetchDailyCalories();
  }, [selectedMeal]);

  const fetchMealItems = async (mealType) => {
    try {
      const response = await fetch(`http://localhost:3000/meals/${mealType}`);
      if (response.ok) {
        const data = await response.json();
        setMealItems(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching meal items:', error);
      // Fallback to default items if fetch fails
      setMealItems([
        { name: "1/2 Glass Milk", image: "/milk.png", calories: 60 },
        { name: "1 Apple", image: "/apple.png", calories: 95 },
        { name: "2 Bread", image: "/Bread.png", calories: 88 }
      ]);
    }
  };

  const fetchDailyCalories = async () => {
    try {
      const response = await fetch('http://localhost:3000/daily-calories');
      if (response.ok) {
        const data = await response.json();
        setDailyCalories(data);
      }
    } catch (error) {
      console.error('Error fetching daily calories:', error);
    }
  };

  const handleAddMeal = (meal) => {
    setExtraMeals([...extraMeals, meal]);
  };

  const totalCalories = extraMeals.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  return (
    <>
      <Header onAddMeal={() => setShowPopup(true)} />
      {showPopup && (
        <ExtraMealPopup 
          onClose={() => setShowPopup(false)}
          onSave={handleAddMeal}
        />
      )}
      <div className="flex gap-2 bg-white p-3 ml-3">
        <div className="flex p-4 rounded-lg gap-5 ml-2">
          <div className="flex flex-col w-28 justify-center gap-3">
            <h6 className="bg-[#014801] p-3 rounded-lg text-white flex justify-center">
              Today
            </h6>
            <ul className="flex flex-col gap-3 items-center">
              <li 
                className={selectedMeal === 'breakfast' ? "bg-[#cfe6cf] p-2 rounded-lg" : ""}
                onClick={() => setSelectedMeal('breakfast')}
              >
                Breakfast
              </li>
              <li 
                className={selectedMeal === 'lunch' ? "bg-[#cfe6cf] p-2 rounded-lg" : ""}
                onClick={() => setSelectedMeal('lunch')}
              >
                Lunch
              </li>
              <li 
                className={selectedMeal === 'dinner' ? "bg-[#cfe6cf] p-2 rounded-lg" : ""}
                onClick={() => setSelectedMeal('dinner')}
              >
                Dinner
              </li>
              <li 
                className={selectedMeal === 'snacks' ? "bg-[#cfe6cf] p-2 rounded-lg" : ""}
                onClick={() => setSelectedMeal('snacks')}
              >
                Snacks
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 justify-center">
              {mealItems.map((item, index) => (
                <div key={index} className="border-2 border-black/50 rounded-lg gap-2 p-4 flex flex-col items-center">
                  <img src={item.image} className="size-24" alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p className="bg-[#cfe6cf] rounded-lg p-1">
                Today Target - {dailyCalories.targetCalories} Calories
              </p>
              <p className="bg-[#cfe6cf] rounded-lg p-1">
                Your Customize - {totalCalories} Calories
              </p>
            </div>
          </div>
        </div>
        <CalorieCalculator />
        <TodayExtraMeals extraMeals={extraMeals} />
      </div>
    </>
  );
}
