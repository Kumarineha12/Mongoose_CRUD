import React from 'react'
import { Table } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
//now do destructure of data which ha spassed as a props from parent

export function EnquiryList({ data, getAlldata, Swal, setFormData }) {
  let deleteRow = (delId) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/web/api/enquiry/enquiry-delete/${delId}`)
        .then((res) => {
          toast.success('data deleted successfully')
          getAlldata()//by using this after delete , that row wll be deleted from UI also even without refreshing
        })
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
   
  }
  let editRow = (editId) => {
    axios.get(`http://localhost:4000/web/api/enquiry/single/${editId}`)
    .then((res)=>{
      let data=res.data;
      console.log(data.enquiry);
      setFormData(data.enquiry)//now all filled data will come in form when we click on edit
    })
  }
  return (

    <div className='bg-gray-200'>
      <ToastContainer />
      <h2 className='text-[18px] font-bold mb-4 '>Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">

            {
              data.length >= 1 ?
                data.map((item, index) => {
                  return (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.phone}</Table.Cell>
                      <Table.Cell>{item.message}</Table.Cell>
                      <Table.Cell>
                        <button onClick={() => { deleteRow(item._id) }} className='bg-red-500 text-white px-4 py-1 rounded-md'>Delete</button>
                      </Table.Cell>

                      <Table.Cell>
                        <button onClick={()=>{editRow(item._id)}} className='bg-green-500 text-white px-4 py-1 rounded-md'>Edit</button>

                      </Table.Cell>
                    </Table.Row>
                  )
                })
                :
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className='colSpan={7} text-center'>
                    NO data found
                  </Table.Cell>
                </Table.Row>

            }


          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
//   export default Enquiry
