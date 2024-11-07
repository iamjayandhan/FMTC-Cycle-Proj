import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/map image final.png'; // Adjust the path as needed

const MainPage = () => {
  const navigate = useNavigate();

  const [selectedStand, setSelectedStand] = useState('');
  const [mapWidth, setMapWidth] = useState(0); // To track map width
  const mapContainerRef = useRef(null); // Reference for the map container

  // Stands with proportional positions (percentages relative to the container)
  const stands = [
    { name: 'Stand A', top: '24.4%', left: '15.9%' },
    { name: 'Stand B', top: '38.5%', left: '54.5%' },
    { name: 'Stand C', top: '75.55%', left: '24%' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleStandClick = (standName) => {
    setSelectedStand(standName);
    alert(`${standName} selected`);
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
          const placeholderSize = mapWidth * 0.14; // Adjust placeholder size dynamically (10% of map width)
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
                fontSize: 'clamp(16px, 5vw, 25px)', // Dynamically scale the font size
                cursor: 'pointer',
                color: '#ff4b5c',
                transform: 'translate(-50%, -35%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #ff4b5c',
                borderRadius: '25%',
                backgroundColor: '#fff',
              }}
            >
              ▢
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
