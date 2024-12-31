const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  mail: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /@(gmail|outlook|yahoo)\.com$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  scope: { 
    type: String,
    enum: ['Weight Loss', 'Weight Gain', 'Maintenance'],
    required: true
  },
  height: { 
    type: Number,
    min: [0, 'Height cannot be negative'],
    required: true
  },
  weight: { 
    type: Number,
    min: [0, 'Weight cannot be negative'],
    required: true
  },
  eatingHabit: { 
    type: String,
    enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
    required: true
  },
  target: { 
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add validation middleware
personalSchema.pre('save', function(next) {
  // Additional custom validation can be added here
  next();
});

module.exports = mongoose.model('Personal', personalSchema);