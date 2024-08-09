import React from 'react';
import { Form } from 'react-bootstrap';
 
import '../index.css'; 

const CustomButton = ({ text, onClick }) => {
  return (
    <div 
      className="custom-button bg-gray-500 bg-opacity-90% text-white p-3 rounded-lg border-2  my-4 mx-auto text-center cursor-pointer text-lg transition-all duration-300 hover:bg-opacity-80"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const Sidebar = () => {
  const buttonLabels = [
    'Start Event',
    'User Event',
    'Conditional Event',
    'Sub Processes',
    'End Event'
  ];

  return (
    <div className="sidebar p-3 end-0 top-0 bottom-0 mt-0  bg-white-200 " style={{ width: '400px' }}>
      
      <div className="relative">
      <select
        id="underline_select"
        className="block py-2.5 px-0 w-full text-md  text-gray-500 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black"
      >
        <option value=""  disabled selected>Select Workflow</option>
        <option value="1">Workflow 1</option>
        <option value="2">Workflow 2</option>
        <option value="3">Workflow 3</option>
      </select>
     
      <svg
        className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>



      <h5 className="mb-4 mt-4">You can drag these nodes to the pane on the right.</h5>

      {buttonLabels.map((label, index) => (
        <CustomButton key={index} text={label} onClick={() => alert(`${label} clicked!`)} />
      ))}
    </div>
  );
};

export default Sidebar;
