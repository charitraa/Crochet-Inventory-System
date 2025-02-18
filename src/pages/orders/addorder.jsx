import React from 'react'
import Dashboard from "../../components/dashboard/Dashboard";
const AddOrders = () => {
  return (
       <>
         <Dashboard mainContent={
           <div className='Container'>
            <h1>Add Orders</h1>
            <form>
            <label htmlFor="customernameroductname">Customer Name</label>
            <input type="text" placeholder='Name' />

            <label htmlFor="orderitem">Order Item</label>
            <input type="text" placeholder='Name' />

            <label htmlFor="orderdate">Order Date</label>
            

            <label htmlFor="quantity">Quantity</label>
            <input type="text" placeholder='Quantity' />

            <label htmlFor="Price">Price</label>
            <input type="text" placeholder='Price' />

            <label htmlFor="status">Status</label>
            <select id="status" className="p-2 border rounded-lg w-64">
            <option value="">Select a category</option>
            <option value="pending">Pending</option>
            <option value="placed">Placed</option>
            <option value="completed">Completed</option>

           </select>
           <label htmlFor="customization">Customization</label>
           <input type="text" placeholder='Describe' />

           <button type='button'>ADD</button>
            <button type='button'>CANCEL</button>






          
             </form>

            
           </div>
         } />
       </>
  )
}

export default AddOrders