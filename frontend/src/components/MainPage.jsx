import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/map.jpeg';
import SA from '../assets/gps1.png';

const MainPage = () => {
  const navigate = useNavigate();

  // User state
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupDescription, setPopupDescription] = useState('');

  // Map state
  const [mapWidth, setMapWidth] = useState(0);
  const mapContainerRef = useRef(null);

  // Stand and cycle states
  const [selectedStand, setSelectedStand] = useState('');
  const [standIdentity, setStandIdentity] = useState('');
  const [cycles, setCycles] = useState({});
  const [availableCount, setAvailableCount] = useState("");
  const [isCyclePopupVisible, setIsCyclePopupVisible] = useState(false);

  const stands = [
    { id: '1ef603aa-61cd-43fd-bcfa-c7e2cb657ca0', name: 'Stand A', top: '25.6%', left: '15.9%', image: SA },
    { id: '8de75d9e-e105-44e4-a925-dbe7c1bbae6e', name: 'Stand B', top: '39.7%', left: '54.5%', image: SA },
    { id: '8a7ca3a7-e985-4e9a-b3eb-99c324754e50', name: 'Stand C', top: '76.9%', left: '24%', image: SA },
    { id: '3d58f6a4-3bc4-4323-ab3d-745907b89d27', name: 'Stand D', top: '15.6%', left: '45.9%', image: SA },
    { id: 'a4c83600-2324-4da9-982b-089064d24026', name: 'Stand E', top: '59.7%', left: '74.5%', image: SA },
    { id: 'b3a574ef-6006-40f0-9b7f-3fa6d22e05d6', name: 'Stand F', top: '76.9%', left: '54%', image: SA },
  ];

  const handleLogout = () => navigate('/login');

  const handleClose = () => {
    setIsCyclePopupVisible(false);
    setAvailableCount("");
    setCycles([]);
  };
  
  const handleStandClick = (standId) => setSelectedStand(standId.toString());
  
  const handleDropdownChange = (event) => setSelectedStand(event.target.value);

  // Adjust map width based on container size
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mapContainerRef.current) setMapWidth(mapContainerRef.current.offsetWidth);
    });
    if (mapContainerRef.current) resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Fetch user booking status on component mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/main`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const { message, description } = data;
        if (message !== 'ok') {
          setPopupDescription(description);
          setIsPopupVisible(true);
        }
      })
      .catch(error => console.error("Error fetching user booking status:", error));
  }, []);

  // Fetch cycle details for the selected stand
  useEffect(() => {
    if (selectedStand) {
      console.log(selectedStand);
      
      const timer = setTimeout(() => {
        console.log(selectedStand)
        fetch(`http://localhost:8080/api/v1/stands/${selectedStand}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.data);
            const { availability, cycles, standIdentity } = data.data;
            if (availability === 0) {
              setStandIdentity(standIdentity)
              setPopupDescription('No cycles available at this stand.');
              setIsCyclePopupVisible(true);
            } else if (availability > 0) {
              setCycles(cycles);
              setStandIdentity(standIdentity)
              setAvailableCount(Object.keys(cycles).length);
              setIsCyclePopupVisible(true);
            }
          })
          .catch(error => console.error("Error fetching cycle availability:", error));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedStand]);

  const handleUnlockClick = (selectedStandId, cycleNumber) => {
    // Step 1: Find the stand object based on the selected stand ID
    const selectedStand = stands.find(stand => stand.id === selectedStandId);
    
    // Extract the last character of the stand name (e.g., "A" from "Stand A")
    const standIdentity = selectedStand ? selectedStand.name.slice(-1) : null;
  
    // Step 2: Retrieve the cycle ID using the cycle number
    const cycleId = cycles[cycleNumber];
  
    // Step 3: Send the request if both standIdentity and cycleId are found
    if (standIdentity && cycleId) {

      console.log('standID:',standIdentity);
      console.log('cycleID:',cycleId);
      
      
      fetch(`http://localhost:8080/api/v1/cycles/unlock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          standIdentity: standIdentity,
          cycleId: cycleId
        }),
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          const { message, description } = data;
          setPopupDescription(
            message === 'ok'
              ? `Cycle ${cycleId} at Stand ${standIdentity} unlocked successfully!`
              : `Failed to unlock cycle ${cycleId} at Stand ${standIdentity}. ${description}`
          );
          setIsCyclePopupVisible(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000)
        })
        .catch(error => {
          setPopupDescription('An error occurred while unlocking the cycle.');
          setIsCyclePopupVisible(true);
        });
    } else {
      setPopupDescription('Invalid stand or cycle selection.');
      setIsCyclePopupVisible(true);
    }
  };
  

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh',
      padding: '20px', position: 'relative', backgroundColor: '#ffffff'
    }}>
      
      {/* Logout Button */}
      <button onClick={handleLogout} style={{
        position: 'absolute', top: '20px', right: '20px', backgroundColor: '#ff4b5c',
        color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer'
      }}>Logout</button>

      <h1 style={{ marginTop: '40px', textAlign: 'center', color: '#333' }}>Welcome user!</h1>
      <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>Please choose the preferred stand and cycle below!</p>

      {/* Map container with responsive sizing */}
      <div ref={mapContainerRef} style={{
        position: 'relative', width: '70vw', maxWidth: '700px', marginTop: '20px',
        backgroundColor: 'white', borderRadius: '8px', border: '2px solid black',
        overflow: 'hidden', height: 'auto'
      }}>
        <img src={mapImage} alt="College Map" style={{
          width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px'
        }} />

        {/* Stand Placeholders */}
        {stands.map((stand) => {
          const placeholderSize = mapWidth * 0.14;
          const isSelected = selectedStand === stand.id.toString();
          return (
            <div key={stand.id} onClick={() => handleStandClick(stand.id)} style={{
              position: 'absolute', top: stand.top, left: stand.left,
              width: `${placeholderSize}px`, height: `${placeholderSize}px`, cursor: 'pointer',
              transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center',
              border: isSelected ? '3px solid green' : 'none', borderRadius: '8px',
              // boxShadow: isSelected ? '0px 0px 5px 1px green' : 'none',
            }}>
              <img src={stand.image} alt={stand.name} onClick={(e) => {
                e.stopPropagation(); handleStandClick(stand.id);
              }} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
              <span style={{
                position: 'absolute', top: '-35px', fontSize: 'clamp(12px, 2vw, 18px)', color: '#333',
                width: '160%', backgroundColor: '#fff', padding: '2px 6px', borderRadius: '4px',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)', pointerEvents: 'none',
              }}>{stand.name}</span>
            </div>
          );
        })}
      </div>

      {/* Dropdown menu */}
      <select value={selectedStand} onChange={handleDropdownChange} style={{
        marginTop: '20px', padding: '5px', fontSize: '12px', borderRadius: '4px',
        border: '1px solid #ccc', width: '25%', maxWidth: '200px', textAlign: 'center'
      }}>
        <option value="" disabled>Select</option>
        {stands.map((stand) => (
          <option key={stand.id} value={stand.id}>{stand.name}</option>
        ))}
      </select>

      {/* User booking popup */}
      {isPopupVisible && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          padding: '20px', zIndex: 1000, maxWidth: '200px'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>Alert</h2>
          <p style={{
            color: '#666', maxWidth: '200px', wordWrap: 'break-word',
            overflowWrap: 'break-word', textAlign: 'center', margin: '10px 0'
          }}>{popupDescription}</p>
          <button onClick={() => navigate('/login')} style={{
            backgroundColor: '#ff4b5c', color: '#fff', border: 'none', borderRadius: '4px',
            padding: '8px 12px', cursor: 'pointer', marginTop: '10px', width: '100%'
          }}>OK</button>
        </div>
      )}

      {/* Cycle availability popup */}
      {isCyclePopupVisible && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          padding: '20px', zIndex: 1000, maxWidth: '400px'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>{`Stand: ${standIdentity}`}</h2>
          <p style={{ color: '#666', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 14px)' }}>
            {availableCount ? `Available Cycles: ${availableCount}` : 'No cycles available at this stand.'}
          </p>
          <ul style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0,
            listStyle: 'none', gap: '10px', fontSize: 'clamp(12px, 2vw, 16px)'
          }}>
            {Object.entries(cycles).map(([cycleName, cycleId]) => (
              <li key={cycleId} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                backgroundColor: '#ff4b5c', color: '#fff', borderRadius: '4px',
                padding: '3px 15px', minWidth: '40%', textAlign: 'center', marginBottom: '8px'
              }}>
                <span>{'C' + cycleName}</span>
                <button 
                  onClick={() => handleUnlockClick(selectedStand, cycleName)}
                  style={{
                    backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px',
                    padding: '4px 8px', cursor: 'pointer', marginLeft: '10px'
                  }}
                >
                  Unlock
                </button>
              </li>
            ))}

          </ul>
          <button onClick={handleClose} style={{
            backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px',
            padding: '4px 12px', cursor: 'pointer', marginTop: '10px', width: '50%'
          }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;