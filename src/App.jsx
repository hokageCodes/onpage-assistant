import React, { useEffect, useState } from 'react';
import './App.css';
import OnPageAssistant from './components/OnPageAssistant';
import axios from 'axios'; // Import axios

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterBackground, setCharacterBackground] = useState(null); // State for character background
  const [activeModal, setActiveModal] = useState(null);
  const modals = [
    {
      title: 'Welcome to the Star Wars Dashboard!',
      content: 'Click on a character card to learn more about them.',
    },
    {
      title: 'Interactive Thumb',
      content: 'Click the thumb in the corner for additional information.',
    },
    // Add more modals as needed
  ];

  const handleCharacterClick = async (character) => {
    setSelectedCharacter(character);

    try {
      // Fetch character background image from NASA Images API
      const nasaResponse = await axios.get(
        'https://images-api.nasa.gov/search?q=star%20wars'
      );
      
      if (nasaResponse.data.collection.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * nasaResponse.data.collection.items.length);
        const imageUrl = nasaResponse.data.collection.items[randomIndex].links[0].href;
        setCharacterBackground(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching character background:', error);
      setCharacterBackground(null);
    }

    const spaceBackground = await fetchSpaceBackground();
    if (spaceBackground) {
      document.body.style.backgroundImage = `url(${spaceBackground})`;
    }
  };

  const fetchSpaceBackground = async () => {
    try {
      const response = await axios.get(
        'https://api.nasa.gov/planetary/apod?api_key=mnYnVqHqG1MAiq82vQTmzivuIVWYyzi50BB0lOZn'
      );
      return response.data.url;
    } catch (error) {
      console.error('Error fetching space background:', error);
      return null;
    }
  };

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
      });

    // Show the first modal immediately when the component mounts
    setActiveModal(modals[0]);
  }, []);

  // Function to handle modal close
  const closeModal = () => {
    setActiveModal(null);
  };

  // Function to handle thumb click
  const handleThumbClick = () => {
    // Show the next modal in the array
    const currentIndex = modals.indexOf(activeModal);
    if (currentIndex < modals.length - 1) {
      setActiveModal(modals[currentIndex + 1]);
    }
  };

  return (
    <div className="App">
      <h1 className="animate__animated animate__fadeIn">Star Wars Dashboard</h1>
      <div className="character-list">
        {characters.map((character, index) => (
          <div
            key={index}
            className="character-card animate__animated animate__fadeIn"
            style={{
              backgroundImage: `url(${characterBackground})`,
            }}
            onClick={() => handleCharacterClick(character)}
          >
            {character.name}
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div className="character-details animate__animated animate__fadeIn">
          <h2>{selectedCharacter.name}</h2>
          <p>Height: {selectedCharacter.height} cm</p>
          <p>Mass: {selectedCharacter.mass} kg</p>
          <p>Birth Year: {selectedCharacter.birth_year}</p>
        </div>
      )}
      <div className="thumb" onClick={handleThumbClick}></div>

      {/* Modals */}
      {activeModal && (
        <div className={`modal active`}>
          <h2>{activeModal.title}</h2>
          <p>{activeModal.content}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}

      {/* Render OnPageAssistant component */}
      {selectedCharacter && <OnPageAssistant character={selectedCharacter} />}
    </div>
  );
}

export default App;
