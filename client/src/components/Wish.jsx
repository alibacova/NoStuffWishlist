import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wish = () => {

  return (
    <div>
      <h4>Title</h4>
      <p>Description</p>
      <p>Link</p>
      <button>Delete</button>
      <button>Edit</button>
      <button>Reserve</button>
    </div>
  );
};

export default Wish;