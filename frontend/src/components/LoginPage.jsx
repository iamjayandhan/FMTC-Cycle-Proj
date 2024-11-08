import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Login Successful! Redirecting...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.message}`, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error: Unable to login. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
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
                htmlFor="username"
                style={{ display: 'block', marginBottom: '5px', color: '#333333' }}
              >
                Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
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

        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
