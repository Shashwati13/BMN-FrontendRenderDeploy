import React from 'react';

const RentalItem = ({ item }) => {
  return (
    <div className="rental-item">
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <p>{item.location}</p>
    </div>
  );
};

export default RentalItem;
