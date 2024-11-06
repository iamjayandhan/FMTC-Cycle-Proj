import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = (event) => {
    event.preventDefault();
    // Your authentication logic goes here
    // After successful login, redirect to the main page
    navigate('/main'); // Replace '/main' with the path to your main page
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
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
        position: 'relative',
      }}
    >
      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 12px',
          backgroundColor: '#6c757d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back
      </button>

      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333333' }}>
        Cycle Project Login
      </h1>

      {/* Login Card */}
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
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>Login</h2>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
