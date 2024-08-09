import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonComponent = ({ text, onClick }) => {
  return (
    <Button
      className="!bg-blue-600 !text-white hover:!bg-blue-700 focus:ring-blue-500 focus:border-blue-500 mx-3 rounded-5 p-2"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
