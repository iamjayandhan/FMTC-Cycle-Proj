import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl);
const RegisterPage = () => {
  const navigate = useNavigate();
  const serverUrl = `${apiUrl}/users`; // Replace with your server URL

  const handleRegister = async (event) => {
    event.preventDefault();

    const rollNumber = event.target.rollNo.value;
    const userName = event.target.username.value;
    const mobile = "" + event.target.mobile.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' ,
        body: JSON.stringify({ rollNumber, userName, mobile, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1000); 
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Error: Unable to register. Please try again.');
    }
  };

  const handleGuestRegister = async (event) => {
    event.preventDefault();

    const mobileNumber = event.target.mobile.value;
    const password = event.target.password.value;

    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.warn('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: mobileNumber, password }),
      });

      if (response.ok) {
        toast.success('Guest registration successful!');
        navigate('/main'); // Redirect to main page on success
      } else {
        const errorData = await response.json();
        toast.error(`Guest registration failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Error: Unable to register as guest. Please try again.');
    }
  };

  const handleLogin = () => {
    navigate('/login'); // Replace '/register' with the path to your registration page
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', padding: '20px', boxSizing: 'border-box' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '20px', color: '#333333' }}>
        Cycle Project Registration
      </h1>

      {/* Register Card */}
      <div style={{ width: '100%', maxWidth: '400px', margin: '10px 0', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Roll No:</label>
            <input name="rollNo" minLength={4} type="text" placeholder="Enter your roll number" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Username:</label>
            <input name="username"  minLength={4} type="text" placeholder="Enter your username" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Mobile:</label>
            <input name="mobile" type="text" placeholder="Enter your 10-digit mobile number" required pattern="[0-9]{10}" maxLength="10" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Password:</label>
            <input name="password"  minLength={4} type="password" placeholder="Enter your password" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Register
          </button>
        </form>
      </div>

      {/* Guest Register Card */}
      <div style={{ width: '100%', maxWidth: '400px', margin: '10px 0', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <h2 style={{ marginBottom: '15px', color: '#333333' }}>Register as Guest</h2>
        <form onSubmit={handleGuestRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Mobile:</label>
            <input name="mobile" type="text" placeholder="Enter your mobile number" required pattern="\d{10}" title="Please enter a valid 10-digit mobile number." style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', marginBottom: '5px', color: '#333333' }}>Password:</label>
            <input name="password" minLength={4} type="password" placeholder="Enter your password" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f1f3f5', color: 'black' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Register as Guest
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
