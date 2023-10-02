import React from 'react';
import './OnPageAssistant.css';

const OnPageAssistant = ({ character }) => {
  return (
    <div className={`on-page-assistant animate__animated animate__bounceInUp`}>
      <h3>Character Information</h3>
      <p>Name: {character.name}</p>
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>
      <p>Birth Year: {character.birth_year}</p>
    </div>
  );
};

export default OnPageAssistant;
