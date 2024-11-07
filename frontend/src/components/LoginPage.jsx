import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast notifications

const LoginPage = () => {
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = (event) => {
    event.preventDefault();

    // Placeholder logic for authentication
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Here you can add your actual authentication logic
    if (email === 'jd@gmail.com' && password === '123') {
      // Success toast
      toast.success('Login Successful! Redirecting...', {
        position: 'top-center',
        autoClose: 2000, // Automatically close after 2 seconds
      });
      
      // Redirect to the main page after a delay (e.g., to let the toast show)
      setTimeout(() => {
        navigate('/main');
      }, 2000); // 2 seconds delay for the toast to show
    } else {
      // Error toast
      toast.error('Invalid credentials. Please try again.', {
        position: 'top-center',
        autoClose: 3000, // Automatically close after 3 seconds
      });
    }
  };

  // Navigate to the registration page
  const handleRegister = () => {
    navigate('/register');
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
        <h2 style={{ fontSize: 30, marginBottom: '15px', color: '#333333' }}>Welcome Back!</h2>
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
              name="email"
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
              name="password"
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

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
