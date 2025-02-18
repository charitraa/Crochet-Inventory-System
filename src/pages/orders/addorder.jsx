import React, { useState } from 'react';
import Dashboard from "../../components/dashboard/Dashboard";
import "./addorder.css";

const AddOrders = () => {
  const [orderDate, setOrderDate] = useState('');

  return (
    <>
      <Dashboard mainContent={
        <div className='Container'>
          <h1>Add Orders</h1>
          <form>
            <label htmlFor="customername">Customer Name</label>
            <input type="text" id="customername" placeholder='Name' />

            <label htmlFor="orderitem">Order Item</label>
            <input type="text" id="orderitem" placeholder='Name' />

            <label htmlFor="orderdate">Order Date</label>
            <input 
              type="date" 
              id="orderdate" 
              value={orderDate} 
              onChange={(e) => setOrderDate(e.target.value)} 
            />

            <label htmlFor="quantity">Quantity</label>
            <input type="text" id="quantity" placeholder='Quantity' />

            <label htmlFor="price">Price</label>
            <input type="text" id="price" placeholder='Price' />

            <label htmlFor="status">Status</label>
            <select id="status" className="p-2 border rounded-lg w-64">
              <option value="">Select a category</option>
              <option value="pending">Pending</option>
              <option value="placed">Placed</option>
              <option value="completed">Completed</option>
            </select>

            <label htmlFor="customization">Customization</label>
            <input type="text" id="customization" placeholder='Describe' />

            <button type='button'>ADD</button>
            <button type='button'>CANCEL</button>
          </form>
        </div>
      } />
    </>
  )
}

export default AddOrders;
