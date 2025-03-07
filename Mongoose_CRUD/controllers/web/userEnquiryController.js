const enquirymodel = require("../../models/enquiry_model");

enquirymodel
// let enquiryInsert=(req,res)=>{
//     let{sName,sEmail,sPhone,sMessage}=req.body;
//     let enquiry= new enquirymodel({
//         name:sName,
//         email:sEmail,
//         phone:sPhone,
//         message:sMessage
//     });
//     enquiry.save().then(()=>{
//         res.send({
//             status:1,
//             message:"Enquiry saved successfully"
//         })
//     }).catch((err)=>{
//         res.send({
//             status:0,
//             message:"Error while savinng enquiry",error:err
//         })
//     })
// }
let enquiryInsert=(req,res)=>{
    let{name,email,phone,message}=req.body;
    let enquiry= new enquirymodel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({
            status:1,
            message:"Enquiry saved successfully"
        })
    }).catch((err)=>{
        res.send({
            status:0,
            message:"Error while savinng enquiry",error:err
        })
    })
}

let enquiryList=async (req,res)=>{
    let enquiryList=await enquirymodel.find();
    res.status(200).json({
        status:1,
        message:"Enquiry List",
        enquiryData: enquiryList
    })
}

let enquiryDelete=async(req,res)=>{
    let enquiryId=req.params.id;
    let deleteEnquiry=await enquirymodel.deleteOne({_id:enquiryId});
    res.send({
      status:1,
      message:"Enquiry deleted successfully",
      id:enquiryId,
      delRes:deleteEnquiry
    })
  }

  let enquirySingleRow=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquirymodel.findOne({_id:enId});
    res.send({
        status:1,
        enquiry
    })
  }

  let enquiryUpdate= async(req,res)=>{
    let enquiryId=req.params.id;
    let{name,email,phone,message}=req.body;
    let updateObj={
     name,
     email,
     phone,
     message 
    } ;
    let updateRes=await enquirymodel.updateOne({_id:enquiryId},updateObj)
    res.send({status:1,
     message:"Enquiry updated successfully",
     updateRes
    })
 }

module.exports={enquiryInsert,enquiryList,enquiryDelete,enquiryUpdate,enquirySingleRow}
