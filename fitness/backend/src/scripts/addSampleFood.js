const mongoose = require('mongoose');
const Food = require('../model/foodmodel');

const sampleFoodItems = [
  {
    image: "/Salad.png",
    title: "Fresh Salad with Vibrant Vegetables",
    category: "Salad",
    calories: 150,
    benefits: "Rich in vitamins and fiber"
  },
  {
    image: "/veg.png",
    title: "Eat Fresh Vegetable and Fruits",
    category: "Fresh Produce",
    calories: 100,
    benefits: "Essential nutrients"
  },
  {
    image: "/Salad1.png",
    title: "Healthy Fruits and Nuts Mix",
    category: "Snacks",
    calories: 200,
    benefits: "Protein rich"
  },
  {
    image: "/Water.png",
    title: "Refreshing Splashing Water 4 Liter PerDay",
    category: "Beverages",
    calories: 0,
    benefits: "Hydration"
  },
  {
    image: "/dry.png",
    title: "Healthy Dried Fruits and Nuts Mix",
    category: "Snacks",
    calories: 250,
    benefits: "Healthy fats"
  },
  {
    image: "/shake.png",
    title: "Protein Milkshake",
    category: "Beverages",
    calories: 180,
    benefits: "Muscle recovery"
  },
  {
    image: "/Roast.jpg",
    title: "Roasted Vegetables",
    category: "Sides",
    calories: 120,
    benefits: "Fiber rich"
  }
];

async function addSampleFood() {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing items
    await Food.deleteMany({});

    // Add new items
    await Food.insertMany(sampleFoodItems);

    console.log('Sample food items added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample food items:', error);
    process.exit(1);
  }
}

addSampleFood(); 