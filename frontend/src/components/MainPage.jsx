import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/map image final.png'; // Adjust the path as needed

const MainPage = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State to show modal
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [selectedStand, setSelectedStand] = useState(''); // State for selected stand
  const imageRef = useRef(null); // Reference to the image element

  // Define rectangular areas with top-left and bottom-right coordinates
  const areas = [
    { name: 'Stand A', x1: 10, y1: 100, x2: 90, y2: 140 }, // Rectangle for Stand A
    { name: 'Stand B', x1: 150, y1: 150, x2: 230, y2: 200 }, // Rectangle for Stand B
    { name: 'Stand C', x1: 57.19999885559082, y1: 324.8874816894531, x2: 103.19999885559082, y2: 373.8874816894531 }, // Rectangle for Stand C
  ];

  const handleLogout = () => {
    // Redirect to the Login page on logout
    navigate('/login');
  };

  // Function to handle clicks on the image map areas
  const handleAreaClick = (e) => {
    const img = imageRef.current;

    // Get the click position relative to the image
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the click is within any defined rectangular area
    for (let area of areas) {
      if (
        x >= area.x1 && x <= area.x2 &&  // Check X range
        y >= area.y1 && y <= area.y2      // Check Y range
      ) {
        // Update the state for selected stand and show modal
        setSelectedStand(area.name);
        setModalMessage(`${area.name} clicked at position: x=${x}, y=${y}`);
        setShowModal(true);
        return; // Exit after showing the first matched area
      }
    }

    // If clicked outside predefined areas, do not trigger an alert (no action)
    setShowModal(false);
  };

  // Handle Dropdown Change
  const handleDropdownChange = (event) => {
    setSelectedStand(event.target.value); // Update selected stand state
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
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

      <h1 className="font-bona" style={{ marginTop: '40px', textAlign: 'center', color: '#333333' }}>
        Welcome user!
      </h1>
      <p style={{ textAlign: 'center', color: '#666666', marginTop: '10px' }}>
        Please choose the preferred stand and cycle below!
      </p>

      {/* College Map Image with interactive areas */}
      <div
        style={{
          marginTop: '60px', // Space below the logout button
          padding: '4px',
          backgroundColor: '#b20d0d',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <img
          ref={imageRef}
          src={mapImage}
          alt="College Map"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
          onClick={handleAreaClick} // Trigger the area click function
        />
      </div>

      {/* Dropdown to select Stand */}
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="stand-dropdown" style={{ fontSize: '16px', marginRight: '10px' }}>
          Select Stand:
        </label>
        <select
          id="stand-dropdown"
          value={selectedStand}
          onChange={handleDropdownChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        >
          <option value="">--Select Stand--</option>
          <option value="Stand A">Stand A</option>
          <option value="Stand B">Stand B</option>
          <option value="Stand C">Stand C</option>
        </select>
      </div>

      {/* Custom Modal for showing popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
              textAlign: 'center',
              color: 'black',
            }}
          >
            <h3>{modalMessage}</h3>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: '20px',
                backgroundColor: '#ff4b5c',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
