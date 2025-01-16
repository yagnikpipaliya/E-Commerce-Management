const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const routes = require('./routes/routes')
const storeRoutes = require('./routes/store')
const productRoutes = require('./Items/routes/Items.route')

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const DBURL = process.env.DATABASE_URL;

mongoose
  .connect(DBURL)
  .then(() =>
    console.log(`
Connected to MongoDB at ${DBURL}`)
  )
  .catch((err) => console.error);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/products', (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
}, productRoutes); 

app.use('/', storeRoutes);
app.use('/admin', routes); 
// app.use(express.static('uploads'))
app.listen(PORT,() => console.log(`http://localhost:${PORT}`));

// const Role = async(req,res,next)=>{
//   console.log(role)
//   if(req.body.role ==='admin'){
//       next()
//   }else{
//       res.status(403).json({ message: 'Unauthorized' });
//   }
// }
