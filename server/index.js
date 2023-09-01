const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/Db');



dotenv.config()
connectDB();


const app = express();

// middleware
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));


app.use('/auth', require('./routes/Auth'));
app.use('/invantory', require('./routes/invantorys'));
app.use('/analytics', require('./routes/Analustic'));
app.use('/admin', require('./routes/Admin'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
})