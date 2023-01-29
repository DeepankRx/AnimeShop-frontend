import { Button } from '@mui/material'
import React from 'react'
import LeftPane from '../components/menu/LeftPane'
import AddProduct from './AddProduct'

const SellerProductsInternal = () => {

    const TableRow=()=>{
        return(
            <tr class="bg-white border-b ">
            <th  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">Apple MacBook Pro 17"</th>
            <td class="px-6 py-4">Sliver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600  hover:underline">Delete</a>
            </td>
        </tr>
        )
    }
  return (
    <div className='flex flex-col h-[calc(100vh_-_110px)] bg-background '>
    <div className='absolute right-8 bottom-8 z-10'>
        <AddProduct/>
    </div>
    <div className=' flex bg-background w-[100%]'>
    <div className='w-[300px]  h-[calc(100vh_-_142px)] smrev:hidden bg-white rounded-2xl my-4 ml-4'> 
      <LeftPane/>
     </div>
     {/* <div className='h-[calc(100vh_-_110px)] p-4 flex flex-col gap-4'> */}

    <div className=' overflow-x-hidden  m-4 w-[100%] h-[calc(100vh_-_142px)] flex flex-col gap-4 rounded-2xl'>
    <div class="relative  shadow-md sm:rounded-2xl  overflow-x-auto overflow-y-auto">
    <table class=" text-sm text-left text-gray-500  w-[100%] ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th  class="px-6 py-3">Product name</th>
                <th  class="px-6 py-3">Color</th>
                <th  class="px-6 py-3">Category</th>
                <th class="px-6 py-3">Price</th>
                <th  class="px-6 py-3">Edit</th>
                <th  class="px-6 py-3">Delete</th>
            </tr>
        </thead>
        <tbody>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>


        </tbody>
    </table>
</div>
</div>

    </div >
    </div>
  )
}

export default SellerProductsInternal