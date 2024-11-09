import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/map image final.png';
import SA from '../assets/cyc.png';

const MainPage = () => {
  const navigate = useNavigate();

  //user
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [popupDescription, setPopupDescription] = useState('');

  //map
  const [mapWidth, setMapWidth] = useState(0);
  const mapContainerRef = useRef(null);

  //stand
  const [selectedStand, setSelectedStand] = useState('');
  
  //cycle
  const [cycles, setCycles] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [isCyclePopupVisible, setIsCyclePopupVisible] = useState(false);

  const stands = [
    { id:1 , name: 'Stand A', top: '25.6%', left: '15.9%', image: SA },
    { id:2 , name: 'Stand B', top: '39.7%', left: '54.5%', image: SA },
    { id:3 , name: 'Stand C', top: '76.9%', left: '24%', image: SA },
    { id:4 , name: 'Stand D', top: '15.6%', left: '45.9%', image: SA },
    { id:5 , name: 'Stand E', top: '59.7%', left: '74.5%', image: SA },
    { id:6 , name: 'Stand F', top: '76.9%', left: '54%', image: SA },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleStandClick = (standId) => {
    setSelectedStand(standId.toString()); // Update selected stand by ID
  };
  
  // Dropdown change handler
  const handleDropdownChange = (event) => {
    const selectedStandId = event.target.value;
    setSelectedStand(selectedStandId); // Ensure this sets the ID too
  };
  
  

  // USEEFFECT => Update map width when the map container resizes
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
      resizeObserver.disconnect();
    };
  }, []);


  // USE EFFECT => Fetch user booking status when enters main page.
  useEffect(() => {
      fetch(`http://localhost:8080/api/v1/users/main`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
      })
        .then(response => response.json())
        .then(data => {
          const { message, description } = data;
          if (message !== 'ok') {
            setPopupDescription(description);
            setIsPopupVisible(true); 
          }
          console.log("User already have a ride to complete");
        })
        .catch(error => {
          console.log("User side Error");
          console.error("Error fetching user booking status:", error);

          //testing!
          // setPopupDescription('You already have a ride to complete. Kindly leave the previously booked cycle before going for new booking.');
          // setIsPopupVisible(true); 
        });
  }, []);

// USE EFFECT => Fetch cycle details from stand
useEffect(() => {
  if (selectedStand) {
    const timer = setTimeout(() => {
      fetch(`http://localhost:8080/api/v1/stand/${selectedStand}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          const { message, available, cycles } = data;
          if (available === 0) {
            setPopupDescription(message || 'No cycles available at this stand.');
            setIsCyclePopupVisible(true);
            console.log("No cycles available at this stand.");
          } else if (available > 0) {
            setCycles(cycles);
            setAvailableCount(cycles.length); 
            setIsCyclePopupVisible(true);
            console.log("Total cycle available count: ", availableCount);
            console.log("List of cycles by their names: ", cycles);
          }
        })
        .catch(error => {
          console.log("Cycle details fetch error.");
          console.error("Error fetching cycle availability:", error);
          console.log(selectedStand);
        });
    }, 2000);
    
    return () => clearTimeout(timer);
  }
}, [selectedStand]);

// Ensure the popup visibility updates when cycles or availableCount change
useEffect(() => {
  if (cycles.length > 0 || availableCount > 0) {
    setIsCyclePopupVisible(true);
  }
}, [cycles, availableCount]);


  
  
  //FUNC => Fetch cycle's availability
  const handleUnlockClick = (cycleName) => {
    // Send the selected cycle to the backend
    fetch(`http://localhost:8080/api/v1/cycle/${cycleName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const { message, description } = data;
        if (message === 'success') {
          // Display success message in popup
          setPopupDescription(`Cycle ${cycleName} unlocked successfully!`);
          console.log("Unlocked successfully!");
          
        } else {
          // Display failure message in popup
          setPopupDescription(`Failed to unlock cycle ${cycleName}. ${description}`);
          console.log(`Failed to unlock cycle ${cycleName}. ${description}`);
        }
        setIsCyclePopupVisible(true); // Show popup with the response message
      })
      .catch(error => {
        console.error("Error unlocking cycle:", error);
        setPopupDescription('An error occurred while unlocking the cycle.');
        setIsCyclePopupVisible(true);
        console.log(cycleName);
        
      });
  };

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
  const isSelected = selectedStand === stand.id.toString(); // Compare IDs as strings
  
  return (
    <div
      key={index}
      onClick={() => handleStandClick(stand.id)}
      style={{
        position: 'absolute',
        top: stand.top,
        left: stand.left,
        width: `${placeholderSize}px`,
        height: `${placeholderSize}px`,
        cursor: 'pointer',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isSelected ? '3px solid #00ff00' : 'none', // Green highlight if selected
        borderRadius: '8px',
        boxShadow: isSelected ? '0px 0px 10px 2px rgba(0, 255, 0, 0.5)' : 'none',
      }}
    >
      {/* Stand image with onClick */}
      
      <img
        src={stand.image}
        alt={stand.name}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering outer div click event
          handleStandClick(stand.id);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />
      <span style={{
        position: 'absolute',
        top: '-35px', 
        fontSize: 'clamp(12px, 2vw, 18px)',
        color: '#333',
        width: '160%',
        backgroundColor: '#fff',
        padding: '2px 6px',
        borderRadius: '4px',
        pointerEvents: 'none',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
      }}>
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
        {stands.map((stand) => (
          <option key={stand.id} value={stand.id}>
            {stand.name}
          </option>
        ))}
      </select>

      {/* Popup message if booking exists */}
            {isPopupVisible && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          padding: '20px',
          zIndex: 1000,
          maxWidth:'200px',
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Alert</h2>
          <p style={{ color: '#666',
            maxWidth: '200px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word', 
            textAlign: 'center',
            margin: '10px 0', 
           }}>{popupDescription}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#ff4b5c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>
      )}

    <div>
      {/* Popup for cycle availability */}
      {isCyclePopupVisible && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          width: '300px',
          zIndex: '1000',
          color:'black',
        }}>


          <h3 style={{ marginBottom:'20px'}}>Total Cycles Available: {availableCount}</h3>
                      {cycles && cycles.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Available Cycles:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cycles.map((cycle) => (
                    <li key={cycle.id} style={{ marginBottom: '10px' }}>
                      <span>{cycle.name}</span>
                      <button
                        onClick={() => handleUnlockClick(cycle.id)} 
                        style={{
                          marginLeft: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Unlock
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}


          <button onClick={() => setIsCyclePopupVisible(false)} style={{
            backgroundColor: '#ff4b5c',
            color: 'white',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            marginTop: '10px',
            cursor: 'pointer',
          }}>
            Close
          </button>
        </div>
      )}
    </div>

    </div>
  );
};

export default MainPage;
