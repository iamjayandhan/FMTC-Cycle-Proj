import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/finalMap.jpeg';
import SA from '../assets/gps1.png';
import bikeLogo from '../assets/bike.png';
import BikeLoader from './BikeLoader';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';


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

  // Loader
  const [isLoading, setIsLoading] = useState(true);

  const stands = [
    { id: '1ef603aa-61cd-43fd-bcfa-c7e2cb657ca0', name: 'Stand A', top: '25.6%', left: '30.9%', image: SA }, //KGCAS
    { id: '8de75d9e-e105-44e4-a925-dbe7c1bbae6e', name: 'Stand B', top: '45.7%', left: '4.5%', image: SA }, //KGISL PARKING
    { id: '8a7ca3a7-e985-4e9a-b3eb-99c324754e50', name: 'Stand C', top: '56.9%', left: '36%', image: SA }, //Girls Hostel
    { id: '3d58f6a4-3bc4-4323-ab3d-745907b89d27', name: 'Stand D', top: '12.6%', left: '42.9%', image: SA }, //Boys Hostel
    { id: 'a4c83600-2324-4da9-982b-089064d24026', name: 'Stand E', top: '69.7%', left: '4.5%', image: SA }, //Front Gate
    { id: 'b3a574ef-6006-40f0-9b7f-3fa6d22e05d6', name: 'Stand F', top: '61.9%', left: '64%', image: SA }, //Admin
  ];

  const handleLogout = () => navigate('/login');

  const handleClose = () => {
    setIsCyclePopupVisible(false);
  };
  
  const handleStandClick = (standId) => 
    {
      setSelectedStand(standId.toString());
      fetchCycleDetails(standId);
    }
  
  const handleDropdownChange = (event) => {
    setSelectedStand(event.target.value);
    setIsCyclePopupVisible(false);
  }

  // Loader
  useEffect(() => {
    // Simulate loading time of 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);


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
    fetch(`${apiUrl}/users/main`, {
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

  // Define the fetchCycleDetails function
  const fetchCycleDetails = (stand) => {
    setIsLoading(true);

    setCycles({});
    setAvailableCount(0);

    if (stand) {
      console.log(stand);
      setTimeout(() => {
        console.log(stand);
        fetch(`${apiUrl}/stands/${stand}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.data);
            const { availability, cycles, standIdentity } = data.data;
            if (availability === 0) {
              setStandIdentity(standIdentity);
              setPopupDescription('No cycles available at this stand.');
              setIsLoading(false);
              setIsCyclePopupVisible(true);
            } else if (availability > 0) {
              setCycles(cycles);
              setStandIdentity(standIdentity);
              setAvailableCount(Object.keys(cycles).length);
              setIsLoading(false);
              setIsCyclePopupVisible(true);
            }
          })
          .catch(error => console.error("Error fetching cycle availability:", error));
      }, 2000);
    }
  };

  // Example of calling the function directly, passing in `selectedStand`
  useEffect(() => {
    fetchCycleDetails(selectedStand);
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

      setIsLoading(true);
      setIsCyclePopupVisible(false);
      
      
      fetch(`${apiUrl}/cycles/unlock`, {
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
          setIsLoading(false);
          setPopupDescription(
            message === 'ok'
              ? `Cycle ${cycleNumber} at Stand ${standIdentity} unlocked successfully!`
              : `Failed to unlock cycle ${cycleNumber} at Stand ${standIdentity}. ${description}`
          );
          setIsPopupVisible(true);
          setTimeout(() => {
            window.location.reload();
          }, 4000)
        })
        .catch(error => {
          setIsLoading(false);
          setPopupDescription('An error occurred while unlocking the cycle.');
          setIsPopupVisible(true);
        });
    } else {
      setIsLoading(false);
      setPopupDescription('Invalid stand or cycle selection.');
      setIsPopupVisible(true);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Logout Button */}
      <header className="w-full flex justify-end p-4">
        <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200" onClick={handleLogout}>
          Logout
        </button>
      </header>



      {/* Loader centered */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="flex flex-col items-center justify-center">
            <BikeLoader />
            <span className="mt-4 text-white text-2xl font-semibold">Fetching Necessary Details...</span>
          </div>
        </div>
      )}
  
      {/* Title and Subtitle */}
      <div className="text-center mb-8 md:mb-10 flex items-center justify-center">
        <img src={bikeLogo} alt="Bike Logo" className="w-36 h-36 mr-4" />
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2 drop-shadow-lg">Pedals</h1>
          <p className="text-lg md:text-xl font-medium text-gray-300 tracking-wide italic">"Anytime Mobility"</p>
        </div>
      </div>



      {/* Greeting and Stand Selection Prompt */}
      <div className="text-center mb-1">
        <p className="text-xl md:text-2xl font-semibold text-white">
          Hello, welcome to Pedals!
        </p>
        <p className="text-md md:text-lg text-white mt-1">
          Please select a stand to view available cycles.
        </p>
      </div>
  
      {/* Map Container */}
      <div 
  ref={mapContainerRef} 
  className="relative w-[90vw] max-w-[700px] mt-2 bg-white border border-black overflow-x-auto md:overflow-hidden mx-auto"
>
  <div className="relative w-full min-w-[900px] md:min-w-full">
    <img 
      src={mapImage} 
      alt="College Map" 
      className="w-full h-[50vh] object-cover rounded-lg" 
    />
  
    {/* Stand Placeholders */}
    {stands.map((stand) => {
      const placeholderSize = 40;
      const isSelected = selectedStand === stand.id.toString();
      return (
        <div 
          key={stand.id} 
          onClick={() => handleStandClick(stand.id)} 
          className={`absolute cursor-pointer flex justify-center items-center rounded-lg ${isSelected ? 'border-4 border-green-500' : ''}`}
          style={{
            top: stand.top,
            left: stand.left,
            width: `${placeholderSize}px`,
            height: `${placeholderSize}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img 
            src={stand.image} 
            alt={stand.name} 
            className="w-full h-full object-contain rounded-lg"
          />
          <span className="absolute -top-7 w-[80px] text-gray-700 font-semibold bg-white px-2 py-1 rounded-md shadow-md text-sm text-center">
            {stand.name}
          </span>
        </div>
      );
    })}
  </div>
</div>


  
      {/* Dropdown Menu */}
      <select
        value={selectedStand}
        onChange={handleDropdownChange}
        className="mt-5 px-1 py-1 text-sm border border-gray-400 rounded-md w-1/4 max-w-[200px] text-center bg-gray-700 text-gray-200"
      >
        <option value="" disabled>Select</option>
        {stands.map((stand) => (
          <option key={stand.id} value={stand.id}>{stand.name}</option>
        ))}
      </select>
  
      {/* User Booking Popup */}
      {isPopupVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 w-[90%] max-w-[300px] text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Alert</h2>
          <p className="text-gray-500 mb-4">{popupDescription}</p>
          <button 
            onClick={() => navigate('/login')} 
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            OK
          </button>
        </div>
      )}
  
      {/* Cycle Availability Popup */}
      {isCyclePopupVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 z-50 w-[80%] max-w-[400px]">
          <h2 className="text-xl font-bold text-gray-700 mb-2">{`Stand: ${standIdentity}`}</h2>
          <p className="text-gray-500 text-m font-bold text-center mb-4">
            {availableCount ? `Available Cycles: ${availableCount}` : 'No cycles available at this stand.'}
          </p>
          <ul className="flex flex-wrap justify-center gap-4 mb-4">
            {Object.entries(cycles).map(([cycleName, cycleId]) => (
              <li key={cycleId} className="flex items-center justify-between bg-red-500 text-white rounded-md px-4 py-2 min-w-[40%]">
                <span>{'C' + cycleName}</span>
                <button 
                  onClick={() => handleUnlockClick(selectedStand, cycleName)}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md ml-2"
                >
                  Unlock
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={handleClose} 
            className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-md mx-auto"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
  
};

export default MainPage;