const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/usermodel"); // Changed from 'user' to 'User'
const cors = require("cors");
const bcrypt = require('bcrypt');
const Personal = require("./model/personalmodel");
const Food = require("./model/foodmodel");
const Meal = require("./model/mealmodel");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
// const loginRoutes = require("./routes/loginroute");
// const RegisterRoutes = require("./routes/registerroute");


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5174', 
  methods: ['GET', 'POST'],
  credentials: true // Your frontend URL
}));
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;
// // const CONNECTION = process.env.CONNECTION;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// if (!CONNECTION) {
//   console.error("Connection string is not provided.");
//   process.exit(1);
// }

// app.get("/", (req, res) => {
//   try {
//     return res.send("Welcome to the fitness app");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Server error");
//   }
// });

// app.use("/login", loginRoutes);
// app.post("/register", RegisterRoutes);
app.post('/login', async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Find user by email
    const user = await User.findOne({ mail });

    const validateEmail = (mail) => {
      const validDomains = ["@gmail.com", "@outlook.com", "@yaahoo.com"];
      return validDomains.some((domain) => mail.endsWith(domain));
    };
  
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!validateEmail(mail)) {
      setErrorMessage("Invalid email. Please use @gmail.com, @outlook.com, or @yaahoo.com.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // You might want to generate and send a JWT token here
    res.status(200).json({ 
      message: 'Login successful',
      user: { 
        id: user._id,
        mail: user.mail 
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, mail, password } = req.body;

    // Validate required fields
    if (!name || !mail || !password ) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate email
    const validateEmail = (mail) => {
      const validDomains = ["@gmail.com", "@outlook.com", "@yahoo.com"];
      return validDomains.some((domain) => mail.endsWith(domain));
    };

    if (!validateEmail(mail)) {
      return res.status(400).json({
        message: "Invalid email. Please use @gmail.com, @outlook.com, or @yahoo.com"
      });
    }

    // Validate password
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      mail,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        mail: user.mail
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/personal-details', async (req, res) => {
  try {
    const { name, mail, password, scope, height, weight, eatingHabit, target } = req.body;

    // Validate required fields
    if (!name || !mail || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await Personal.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new personal details record
    const personalDetails = new Personal({
      name,
      mail,
      password: hashedPassword,
      scope,
      height,
      weight,
      eatingHabit,
      target
    });

    await personalDetails.save();

    res.status(201).json({ 
      message: 'Personal details saved successfully',
      user: {
        id: personalDetails._id,
        name: personalDetails.name,
        mail: personalDetails.mail,
        scope: personalDetails.scope,
        height: personalDetails.height,
        weight: personalDetails.weight,
        eatingHabit: personalDetails.eatingHabit,
        target: personalDetails.target
      }
    });

  } catch (error) {
    console.error('Personal details save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/personal-details/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Fetching details for email:', email); // Debug log

    const personalDetails = await Personal.findOne({ mail: email });
    
    if (!personalDetails) {
      console.log('No user found for email:', email); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user details:', personalDetails); // Debug log
    res.status(200).json({
      user: {
        name: personalDetails.name,
        scope: personalDetails.scope,
        height: personalDetails.height,
        weight: personalDetails.weight,
        eatingHabit: personalDetails.eatingHabit,
        target: personalDetails.target
      }
    });

  } catch (error) {
    console.error('Error fetching personal details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/user-details', async (req, res) => {
  try {
    const { email } = req.query;
    const userData = await PersonalDetails.findOne({ mail: email });
    
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add food items endpoint
app.post('/add-food', async (req, res) => {
  try {
    const { image, title, category, calories, benefits } = req.body;
    
    const newFood = new Food({
      image,
      title,
      category,
      calories,
      benefits
    });

    await newFood.save();
    res.status(201).json({ 
      message: 'Food item added successfully',
      food: newFood
    });

  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all food items endpoint
app.get('/food-items', async (req, res) => {
  try {
    const foodItems = await Food.find({});
    console.log('Found food items:', foodItems); // Debug log
    res.status(200).json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get meals by type (breakfast, lunch, dinner, snacks)
app.get('/meals/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const meal = await Meal.findOne({ type: type.toLowerCase() });
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json(meal);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily calorie summary
app.get('/daily-calories', async (req, res) => {
  try {
    const meals = await Meal.find({});
    const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
    const targetCalories = 2000; // You can make this dynamic based on user's goals
    
    res.json({
      targetCalories,
      consumedCalories: totalCalories,
      remainingCalories: targetCalories - totalCalories
    });
  } catch (error) {
    console.error('Error fetching daily calories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const start = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('MongoDB client connected');
    
    await mongoose.connect(uri);
    console.log('Mongoose connected');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1);
  }
};

start();
