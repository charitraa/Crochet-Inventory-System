import React, { useContext } from 'react'
import { AppContext } from '../../context/ContextApp'

const UserDashboard = () => {
  const { user } = useContext(AppContext)
  return (
    <div>
      <p>
        Login Successfull !!
      </p>
      <p>Welcome {user.full_name}</p>
    </div>
  )
}

export default UserDashboard