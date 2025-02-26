import React from 'react'
import Dashboard from "../../components/dashboard/Dashboard";
import "./AddMaterial.css"

const AddMaterials = () => {
  return (
    <>
      <Dashboard mainContent={
        <div className='Container'>
         <h1>Add Material</h1>
         <form>
            <label htmlFor="materialname">Material Name</label>
            <input type="text" placeholder='Material Name' />

            <label htmlFor="colour">Colour</label>
            <input type="text" placeholder='Colour' />

            <label htmlFor="category">Category</label>
            <select id="category" className="p-2 border rounded-lg w-64">
  <option value="">Select a category</option>
  <option value="wool">Wool</option>
  <option value="beads">Beads</option>
  <option value="paper">Wrapping Paper</option>
  <option value="ribbon">Ribbon</option>
</select>

            <label htmlFor="stock">Stock Quantity</label>
            <input type="text" placeholder='Stock' />

            <label htmlFor="price">Price</label>
            <input type="text" placeholder='Price' />

            <label htmlFor="image">Image</label>
            <input type="file" placeholder='Upload Image' name='image'/>

            <button type='button'>ADD</button>
            <button type='button'>CANCEL</button>

                
         </form>
        </div>
      } />
    </>
  )
}

export default AddMaterials