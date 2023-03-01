import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wish = ({ wish }) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h4>{wish.title}</h4>
      {isOpen &&
        <>
          <p>{wish.description}</p>
          <p>{wish.url ? wish.url : ''}</p>
        </>
      }
      <button>Delete</button>
      <button>Edit</button>
      <button>Reserve</button>
    </div>
  );
};

export default Wish;