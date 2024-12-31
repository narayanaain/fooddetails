import React, { useState } from "react";

export default function ExtraMealPopup({ onClose, onSave }) {
  const [meal, setMeal] = useState("");
  const [grams, setGrams] = useState("");
  const [type, setType] = useState("");

  const handleSave = () => {
    if (meal && grams && type) {
      onSave({ meal, grams, type });
      onClose();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Extra Meal</h2>
        <input
          type="text"
          placeholder="Meal Name"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          className="border w-full p-2 rounded-lg mb-4"
        />
        <input
          type="number"
          placeholder="Grams"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          className="border w-full p-2 rounded-lg mb-4"
        />
        <input
          type="text"
          placeholder="Type (e.g., Breakfast, Snack)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border w-full p-2 rounded-lg mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#014801] text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
