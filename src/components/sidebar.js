import React from 'react';
import '../index.css'; 

const CustomButton = ({ text, onClick }) => {
  return (
    <div 
      className="bg-gray-300 bg-opacity-90 text-black p-3 rounded-lg border-2 my-4 mx-auto text-center cursor-pointer text-lg transition-all duration-300 hover:bg-opacity-80"
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
    
    <div className="p-3 bg-white border-r border-gray-200" style={{ width: '400px' }}>
      <div className="relative mb-4">
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-b-2 border-black focus:outline-none focus:ring-0 focus:border-black"
        >
          <option value="" disabled selected>Select Workflow</option>
          <option value="1">Workflow 1</option>
          <option value="2">Workflow 2</option>
          <option value="3">Workflow 3</option>
        </select>
      </div>

      <h5 className="mb-4 mt-4 text-lg font-semibold">You can drag these nodes to the pane on the right.</h5>

      {buttonLabels.map((label, index) => (
        <CustomButton key={index} text={label} onClick={() => alert(`${label} clicked!`)} />
      ))}
    </div>
  );
};

export default Sidebar;
