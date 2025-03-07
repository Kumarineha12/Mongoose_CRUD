let express=require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate, enquirySingleRow } = require('../../controllers/web/userEnquiryController');
let enquiryRoutes=express.Router();

enquiryRoutes.post("/enquiry-insert",enquiryInsert)

enquiryRoutes.get("/enquiry-list",enquiryList)

enquiryRoutes.delete("/enquiry-delete/:id",enquiryDelete)

enquiryRoutes.put("/enquiry-update/:id",enquiryUpdate)

enquiryRoutes.get("/single/:id", enquirySingleRow)

module.exports=enquiryRoutes;
