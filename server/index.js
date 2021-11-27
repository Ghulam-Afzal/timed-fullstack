const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const taskRouter = require("./controllers/routes");
const loginRouter = require('./controllers/login'); 
const userRouter = require('./controllers/userRoutes'); 

// initilize app
const app = express();
app.use(express.static('static'));

// connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/pomodoro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error.message);
  });

// use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

// use routes
app.use("/api/tasks", taskRouter);
app.use("/api/login", loginRouter); 
app.use("/api/signup", userRouter); 
app.get('/*', (req, res) =>{
  // send the html from the build folder 


});


// use remaining middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is connected to ${PORT}`);
});
