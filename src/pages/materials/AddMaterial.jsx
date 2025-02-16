import React from 'react'
import Dashboard from "../../components/dashboard/Dashboard";

const AddMaterials = () => {
  return (
    <>
      <Dashboard mainContent={
        <div className=' text-2xl text-red-700'>
         <h1>Add Material</h1>
         <form>
            <label htmlFor="materialname">Material Name</label>
            <input type="text" placeholder='Material Name' />

            <label htmlFor="colour">Colour</label>
            <input type="text" placeholder='colour' />
         </form>
        </div>
      } />
    </>
  )
}

export default AddMaterials