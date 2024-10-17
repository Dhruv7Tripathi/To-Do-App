// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const reqBody = await req.json();
//     const { email, password } = reqBody;
//     console.log(email, password);

//     return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
//   }
// }
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // To parse JSON bodies

// Example User schema for Mongoose
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb+srv://<db_username>:<db_password>@cluster0.dcomx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

app.post('/register', async (req: any, res: any) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).send('User registered!');
});

app.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

  res.json({ token });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

