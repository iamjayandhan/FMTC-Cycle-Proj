import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = (event) => {
    event.preventDefault();
    // Your authentication logic goes here
    // Example: Perform validation or API request
    // If login is successful, navigate to the main page
    navigate('/main');
  };

  // Navigate to the registration page
  const handleRegister = () => {
    navigate('/register'); // Replace '/register' with the path to your registration page
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333333' }}>
        Cycle Project Login
      </h1>

      {/* Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ fontSize:30, marginBottom: '15px', color: '#333333' }}>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '5px', color: '#333333' }}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: '#333333',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', marginBottom: '5px', color: '#333333' }}
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f1f3f5',
                color: '#333333',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
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
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Login
          </button>
        </form>

        {/* Register Option */}
        <p style={{ marginTop: '20px', color: '#333333', textAlign: 'center' }}>
          Don't have an account?{' '}
          <button
            onClick={handleRegister}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0',
              fontSize: 'inherit',
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
