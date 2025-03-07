let express=require('express')
let mongoose=require('mongoose');
let cors=require('cors')

// const enquirymodel = require('./models/enquiry_model');
// const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require('./controllers/web/userEnquiryController');
const enquiryRoutes = require('./routes/web/enquiryRoutes');
require('dotenv').config();

let app=express();

app.use(cors());

//connect to mongoDB
app.use(express.json());

app.use("/web/api/enquiry",enquiryRoutes)


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Databse connected");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on port "+process.env.PORT);

    })
})

// app.get()