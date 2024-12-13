import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-64 bg-gray-800 text-white h-screen fixed">
      <ul className="p-10 pt-14">
        <li className="mb-4">
          <Link to="/introduction" className="block p-2 rounded hover:bg-gray-700">React starter</Link>
        </li>
        <li className="mb-4">
          <Link to="/callApi" className="block p-2 rounded hover:bg-gray-700">Les calls API</Link>
        </li>
        <li className="mb-4">
          <Link to="/mutations" className="block p-2 rounded hover:bg-gray-700">Les mutations react queries</Link>
        </li>
        <li className="mb-4">
          <button onClick={() => setOpen1(!open1)} className="w-full text-left p-2 rounded hover:bg-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            Les Components
          </button>
          {open1 && (
            <ul className="pl-4">
              <li className="mb-2">
                <Link to="/ReactMemo" className="block p-2 rounded hover:bg-gray-700">React.memo</Link>
              </li>
              <li className="mb-2">
                <Link to="/ReactForwardRef" className="block p-2 rounded hover:bg-gray-700">React.forwardRef</Link>
              </li>
              <li className="mb-2">
                <Link to="/ReactSuspense" className="block p-2 rounded hover:bg-gray-700">React.suspense</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-4">
          <button onClick={() => setOpen(!open)} className="w-full text-left p-2 rounded hover:bg-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            Les Hooks
          </button>
          {open && (
            <ul className="pl-4">
              <li className="mb-2">
                <Link to="/useReducer" className="block p-2 rounded hover:bg-gray-700">useReducer</Link>
              </li>
              <li className="mb-2">
                <Link to="/useMemo" className="block p-2 rounded hover:bg-gray-700">useMemo</Link>
              </li>
              <li className="mb-2">
                <Link to="/useCallback" className="block p-2 rounded hover:bg-gray-700">useCallback</Link>
              </li>
              <li className="mb-2">
                <Link to="/useMyHooks" className="block p-2 rounded hover:bg-gray-700">useMyHooks</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
