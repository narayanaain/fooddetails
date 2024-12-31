import React, { useState, useEffect } from "react";

export default function Header({ onAddMeal }) {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the user email from localStorage (saved during login)
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        const response = await fetch(`http://localhost:3000/personal-details/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log('Fetched user data:', data); // Debug log
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-green-100">
      <h2 className="ml-3 colo font-bold text-lg text-green-800">Your Diet Planner</h2>
      <div className="flex items-center gap-4">
        <button
          className="bg-[#014801] px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90"
          onClick={onAddMeal}
        >
          Add Your Extra Meal
        </button>
        <div className="relative">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#014801] shadow-md hover:opacity-90"
            onClick={() => setShowUserInfo(!showUserInfo)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          {showUserInfo && userData && (
            <div className="absolute right-0 mt-2 w-72 bg-[#e6f2e6] text-[#014801] rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-lg">{userData.name}</h3>
              <div className="text-sm mt-2 space-y-1">
                <p>
                  <span className="font-semibold">Scope: </span>
                  {userData.scope}
                </p>
                <p>
                  <span className="font-semibold">Height: </span>
                  {userData.height} |{" "}
                  <span className="font-semibold">Weight: </span>
                  {userData.weight}
                </p>
                <p>
                  <span className="font-semibold">Eating habit: </span>
                  {userData.eatingHabit}
                </p>
                <p>
                  <span className="font-semibold">Target: </span>
                  {userData.target}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
