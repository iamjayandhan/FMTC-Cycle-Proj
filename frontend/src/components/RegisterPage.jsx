import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
console.log(import.meta.env.VITE_API_URL)
const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl)
const RegisterPage = () => {
  const navigate = useNavigate();
  const serverUrl = `${apiUrl}/users`; // Replace with your server URL
  const [isStudent, setIsStudent] = useState(true); // Toggle state, "Student" as default

  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Collect form data based on toggle state
    const mobile = "" + event.target.mobile.value;
    const password = event.target.password.value;

    // For Student, also collect rollNumber and userName
    const body = isStudent
      ? {
          rollNumber: event.target.rollNo.value,
          userName: event.target.username.value,
          mobile,
          password,
        }
      : {
          mobile,
          password,
        };

    try {
      const endpoint = isStudent ? serverUrl : `${serverUrl}/guest`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseData = await response.json(); // Convert response to JSON
        console.log(responseData); // Log or use the response data if needed
        toast.success(`${isStudent ? 'Student' : 'Guest'} registration successful!`);
        navigate(isStudent ? '/login' : '/main'); // Redirect accordingly
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error: Unable to register. Please try again.`);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', padding: '20px', boxSizing: 'border-box' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '20px', color: '#333333' }}>Cycle Project Registration</h1>

      {/* Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setIsStudent(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: isStudent ? '#007bff' : '#f0f0f0',
            color: isStudent ? '#ffffff' : '#333333',
            border: 'none',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer',
          }}
        >
          Student
        </button>
        <button
          onClick={() => setIsStudent(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: isStudent ? '#f0f0f0' : '#007bff',
            color: isStudent ? '#333333' : '#ffffff',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
          }}
        >
          Guest
        </button>
      </div>

      {/* Registration Form */}
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>{isStudent ? 'Register as Student' : 'Register as Guest'}</h2>
        <form onSubmit={handleRegister}>
          {isStudent && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Roll No:</label>
                <input name="rollNo" minLength={4} type="text" placeholder="Enter your roll number" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Username:</label>
                <input name="username" minLength={4} type="text" placeholder="Enter your username" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
              </div>
            </>
          )}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Mobile:</label>
            <input name="mobile" type="text" placeholder="Enter your 10-digit mobile number" required pattern="\d{10}" maxLength="10" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Password:</label>
            <input name="password" minLength={4} type="password" placeholder="Enter your password" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Register
          </button>
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
              fontSize: 'inherit',
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
