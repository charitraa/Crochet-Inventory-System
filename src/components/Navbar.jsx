import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='sidenav'>
      <ul>
        <li>
          <Link to="/materials">Materials</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
