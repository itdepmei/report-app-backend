const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const todoRoute = require('./routes/todoRoute');
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const complaintsRoute = require("./routes/complaintsRoute");  
const obstaclesRoute = require("./routes/obstaclesRoute");
const outOfHoursWorkRoute = require("./routes/outOfHoursWorkRoute");
const reportRoute = require("./routes/reportRoute");
const suggestionsRoute = require("./routes/suggestionsRoute");
const taskRoute = require("./routes/taskRoute");
const logRoute = require("./routes/logRoute");

const cors = require('cors');

require("./utils/sendDailyReminder");


// Connect with db
dbConnection();

// express app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/todo', todoRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/complaints", complaintsRoute);
app.use("/api/v1/obstacles", obstaclesRoute);
app.use("/api/v1/out-of-hours-work", outOfHoursWorkRoute);
app.use("/api/v1/reports", reportRoute);
app.use("/api/v1/suggestions", suggestionsRoute);
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/log", logRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
