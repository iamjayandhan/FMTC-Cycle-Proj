import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Handle regular registration
  const handleRegister = (event) => {
    event.preventDefault();
    // Your registration logic for regular users goes here
    // After successful registration, redirect to the login page
    navigate('/login');
  };

  // Handle guest registration
  const handleGuestRegister = (event) => {
    event.preventDefault();
    const mobileNumber = event.target.mobile.value;
    
    // Check if mobile number is a 10-digit integer
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    // Your registration logic for guest users goes here
    // After successful registration, redirect to the login page
    navigate('/main');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <p className='font-sherif'>This text uses font-family</p>

      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333333' }}>
        Cycle Project Registration
      </h1>

      {/* Register Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          margin: '10px 0',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: 'black',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: 'black',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </form>
      </div>

      {/* Guest Register Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          margin: '10px 0',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>Register as Guest</h2>
        <form onSubmit={handleGuestRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>
              Mobile:
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              required
              pattern="\d{10}"
              title="Please enter a valid 10-digit mobile number."
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: 'black',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: 'black',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Register as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
