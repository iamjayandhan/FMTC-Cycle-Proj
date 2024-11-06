import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the Register page on logout
    navigate('/');
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

      <div className='h-20 w-60 bg-emerald-500 border-4 border-sky-500'>
      </div>
      
      <h1 className='text-gray-50' >hi</h1>
     <h1 className='font-bona' style={{textAlign: 'center', color: '#333333' }}>Welcome to the Cycle Project!</h1>
      <p style={{ textAlign: 'center', color: '#666666', marginTop: '10px' }}>
        This is the main page of the Cycle Project. You can explore the features and functionalities
        of the project from here.
      </p>
    </div>
  );
};

export default MainPage;
