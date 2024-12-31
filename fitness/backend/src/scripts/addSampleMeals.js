const mongoose = require('mongoose');
const Meal = require('../model/mealmodel');

const sampleMeals = [
  {
    type: 'breakfast',
    items: [
      {
        name: '1/2 Glass Milk',
        image: '/milk.png',
        calories: 60,
        quantity: '120ml'
      },
      {
        name: '1 Apple',
        image: '/apple.png',
        calories: 95,
        quantity: '1 medium'
      },
      {
        name: '2 Bread',
        image: '/Bread.png',
        calories: 88,
        quantity: '2 slices'
      }
    ],
    totalCalories: 243
  },
  {
    type: 'lunch',
    items: [
      {
        name: 'Rice',
        image: '/rice.png',
        calories: 130,
        quantity: '1 cup'
      },
      {
        name: 'Dal',
        image: '/dal.png',
        calories: 150,
        quantity: '1 bowl'
      },
      {
        name: 'Vegetables',
        image: '/vegetables.png',
        calories: 100,
        quantity: '1 serving'
      }
    ],
    totalCalories: 380
  },
  {
    type: 'dinner',
    items: [
      {
        name: 'Chicken',
        image: '/chicken.png',
        calories: 200,
        quantity: '100g'
      } 
    ],
    totalCalories: 200
  },
  {
    type: 'snacks',
    items: [],
    totalCalories: 0    
  },
  // Add similar objects for dinner and snacks
];

async function addSampleMeals() {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Meal.deleteMany({});
    await Meal.insertMany(sampleMeals);

    console.log('Sample meals added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample meals:', error);
    process.exit(1);
  }
}

addSampleMeals(); 