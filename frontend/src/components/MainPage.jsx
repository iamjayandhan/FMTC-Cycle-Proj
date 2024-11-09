import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/map image final.png'; // Adjust the path as needed
import SA from '../assets/cyc.png';

const MainPage = () => {
  const navigate = useNavigate();

  const [selectedStand, setSelectedStand] = useState('');
  const [mapWidth, setMapWidth] = useState(0); // To track map width
  const mapContainerRef = useRef(null); // Reference for the map container

  // Stands with proportional positions (percentages relative to the container)
  const stands = [
    { name: 'Stand A', top: '25.6%', left: '15.9%', image: SA },
    { name: 'Stand B', top: '39.7%', left: '54.5%', image: SA },
    { name: 'Stand C', top: '76.9%', left: '24%', image: SA },
    { name: 'Stand D', top: '15.6%', left: '45.9%', image: SA },
    { name: 'Stand E', top: '59.7%', left: '74.5%', image: SA },
    { name: 'Stand F', top: '76.9%', left: '54%', image: SA },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleStandClick = (standName) => {
    setSelectedStand(standName);
  };

  const handleDropdownChange = (event) => {
    setSelectedStand(event.target.value);
  };

  // Update map width when the map container resizes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mapContainerRef.current) {
        setMapWidth(mapContainerRef.current.offsetWidth);
      }
    });
    
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      boxSizing: 'border-box',
      backgroundColor:'#ffffff',
    }}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#ff4b5c',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>

      <h1 style={{ marginTop: '40px', textAlign: 'center', color: '#333' }}>
        Welcome user!
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>
        Please choose the preferred stand and cycle below!
      </p>

      {/* Map container with responsive sizing */}
      <div
        ref={mapContainerRef}
        style={{
          position: 'relative',
          width: '70vw',
          maxWidth: '700px',
          marginTop: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border:'2px solid black',
          overflow: 'hidden',
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={mapImage}
          alt="College Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />

        {/* Stand Placeholders with relative positioning */}
        {stands.map((stand, index) => {
          const placeholderSize = mapWidth * 0.14; // Adjust placeholder size dynamically
          const isSelected = selectedStand === stand.name;

          return (
            <div
              key={index}
              onClick={() => handleStandClick(stand.name)}
              style={{
                position: 'absolute',
                top: stand.top,
                left: stand.left,
                width: `${placeholderSize}px`, // Size relative to map width
                height: `${placeholderSize}px`, // Maintain square aspect ratio
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: isSelected ? '3px solid #00ff00' : 'none', // Highlight selected stand
                borderRadius: '8px',
                boxShadow: isSelected ? '0px 0px 10px 2px rgba(0, 255, 0, 0.5)' : 'none',
              }}
            >
              {stand.image ? (
                <img
                  src={stand.image}
                  alt={stand.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    border: '2px solid #ff4b5c',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  ▢
                </div>
              )}
              {/* Stand name label, positioned above the image */}
              <span
                style={{
                  position: 'absolute',
                  top: '-35px', // Adjust position above the image
                  fontSize: 'clamp(12px, 2vw, 18px)',
                  color: '#333',
                  width: '160%',
                  backgroundColor: '#fff',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                }}
              >
                {stand.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dropdown menu for selecting a stand */}
      <select
        value={selectedStand}
        onChange={handleDropdownChange}
        style={{
          marginTop: '20px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor:'#ff4b5c',
          width: '30%',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <option value="" disabled>Select</option>
        {stands.map((stand, index) => (
          <option key={index} value={stand.name}>
            {stand.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MainPage;
