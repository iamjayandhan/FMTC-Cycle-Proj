import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({
    rollNumber: "",
    userName: "",
    mobile: "",
    password: "",
    passnumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { rollNumber, userName, mobile, password, passnumber } = formData;
    const body = isStudent
      ? { rollNumber, userName, mobile, password }
      : { passnumber, password };

    const endpoint = isStudent ? `${apiUrl}/users` : `${apiUrl}/users/guest`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registration successful:", responseData);
        toast.success('Registration successful!');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Error: Unable to register. Please try again.`);
    }
  };

  const handleLogin = () => navigate('/login');

  // Styles object for cleaner styling
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      padding: '20px',
      boxSizing: 'border-box'
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box'
    },
    button: (isActive) => ({
      padding: '10px 20px',
      backgroundColor: isActive ? '#007bff' : '#f0f0f0',
      color: isActive ? '#ffffff' : '#333333',
      border: 'none',
      borderRadius: isActive ? '4px 0 0 4px' : '0 4px 4px 0',
      cursor: 'pointer'
    }),
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      backgroundColor: '#f1f3f5',
      color: 'black'
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h1 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '20px', color: '#333333' }}>
        Cycle Project Registration
      </h1>

      {/* Toggle Button */}
      <div style={styles.toggleContainer}>
        <button onClick={() => setIsStudent(true)} style={styles.button(isStudent)}>Student</button>
        <button onClick={() => setIsStudent(false)} style={styles.button(!isStudent)}>Guest</button>
      </div>

      {/* Registration Form */}
      <div style={styles.formContainer}>
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>
          {isStudent ? 'Register as Student' : 'Register as Guest'}
        </h2>
        <form onSubmit={handleRegister}>
          {isStudent && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Roll No:</label>
                <input
                  name="rollNumber"
                  minLength={4}
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Username:</label>
                <input
                  name="userName"
                  minLength={4}
                  type="text"
                  placeholder="Enter your username"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Mobile:</label>
                <input
                  name="mobile"
                  type="text"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  pattern="\d{10}"
                  maxLength="10"
                  style={styles.input}
                />
              </div>
            </>
          )}
          {!isStudent && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Passnumber:</label>
              <input
                name="passnumber"
                type="text"
                placeholder="Enter your passnumber (up to 30 characters)"
                value={formData.passnumber}
                onChange={handleInputChange}
                maxLength="30"
                required
                style={styles.input}
              />
            </div>
          )}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              minLength={4}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>Register</button>
        </form>

        {/* Register Option */}
        <p style={{ marginTop: '20px', color: '#333333', textAlign: 'center' }}>
          Already have an account?{' '}
          <button
            onClick={handleLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0',
              fontSize: 'inherit'
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
