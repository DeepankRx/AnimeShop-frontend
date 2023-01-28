import React from 'react'
import LeftPane from '../components/menu/LeftPane'

const SellerProductsInternal = () => {
  return (
    <div className='flex flex-col'>
    <div className=' bg-lightbrown flex '>

    <div className='w-[300px]  h-[100%] smrev:hidden'> 
      <LeftPane/>
     </div>
<div className='w-[100%] p-4'>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th  class="px-6 py-3">
                    Product name
                </th>
                <th  class="px-6 py-3">
                    Color
                </th>
                <th  class="px-6 py-3">
                    Category
                </th>
                <th  class="px-6 py-3">
                    Price
                </th>
                <th  class="px-6 py-3">
                    Edit
                </th>
                <th  class="px-6 py-3">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Sliver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </div>
    </div>
    </div>
  )
}

export default SellerProductsInternal