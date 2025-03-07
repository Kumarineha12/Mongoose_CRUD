import React, { useEffect, useState } from 'react'
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { EnquiryList } from './enquiry/EnquiryList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
const url='https://mern-crud-project-hrp6.onrender.com'


const Enquiry = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _id:''  //id we are using for updating
    //id is there then show update otherwise show save
  })

  const saveEnquiry = (e) => {
    e.preventDefault()
    //if id present update else insert
    if(formData._id){
      axios.put(`${url}/web/api/enquiry/enquiry-update/${formData._id}`,formData)
      .then((res)=>{
        toast.success("Data updated successfully")
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id:''
        })
        getAlldata();
      })
    }
      else{
        axios.post(`${url}/web/api/enquiry/enquiry-insert`, formData)
        .then((res) => {
          toast.success("Data saved successfully")
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          })
          getAlldata(); // refresh the list after saving
        })
      }
   
  }

  const getAlldata = () => {
    axios.get(`${url}/web/api/enquiry/enquiry-list`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryData)
        }
      })
  }

  useEffect(() => {
    getAlldata();
  }, [])

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="h-screen">
      <ToastContainer />
      <h1 className='text-[25px] text-center py-6 font-bold'>User Enquiry</h1>

      <div className="flex h-[calc(100vh-120px)] gap-6">
        
        {/* Left Sidebar (fixed height, scrollable) */}
        <div className="w-[30%] bg-gray-200 p-4 overflow-y-auto rounded-md shadow" style={{ maxHeight: '100%' }}>
          <h2 className='text-[18px] font-bold mb-4'>Enquiry Form</h2>
          <form onSubmit={saveEnquiry} className="space-y-3">
            <div>
              <Label htmlFor="name" value='Your Name' />
              <TextInput value={formData.name} onChange={getValue} type='text' name='name' placeholder='Enter Your Name' required />
            </div>
            <div>
              <Label htmlFor="email" value='Your Email' />
              <TextInput type='email' value={formData.email} onChange={getValue} name='email' placeholder='Enter Your Email' required />
            </div>
            <div>
              <Label htmlFor="phone" value='Your Phone' />
              <TextInput type='text' value={formData.phone} onChange={getValue} name='phone' placeholder='Enter Your Phone No' required />
            </div>
            <div>
              <Label htmlFor="message" value='Your Message' />
              <Textarea name='message' value={formData.message} onChange={getValue} placeholder='Message....' required rows={4} />
            </div>
            
            <Button type='submit' className='w-full'>Save</Button>
{/*              {formData._id?'Update':'Save'}
             {/* if id is there show Update otherwise show Save */} */}
          </form>
        </div>

        {/* Right Content (grows with content) */}
        <div className="w-[70%] overflow-y-auto p-2 pl-5 bg-gray-200 rounded-md shadow">
          <EnquiryList data={enquiryList} getAlldata={getAlldata} Swal={Swal} setFormData={setFormData}/>
        </div>

      </div>
    </div>
  )
}

export default Enquiry;
