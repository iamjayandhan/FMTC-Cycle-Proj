import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bikeLogo from '../../assets/bike.png';
import BikeLoader from '../BikeLoader/BikeLoader';
// import './login.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log(apiUrl);

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ rollNumber: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); // State for the loader


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success('Login Successful! Redirecting...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/main');
        }, 2000);
      } else {
        const errorData = (await response.json());
        console.log(errorData);
        toast.error(`Login failed: ${errorData.message}`, {
          position: 'top-center',
          autoClose: 3000,
        });
        setIsLoading(false); 
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error: Unable to login. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="text-center mb-8 md:mb-10 flex items-center justify-center">


         {/* Loader */}
       {/* Loader Screen */}
       {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 opacity-100 transition-opacity duration-4000">
          <div className="flex flex-col items-center">
            <BikeLoader/>
            <span className="mt-2 text-white text-2xl font-semibold">Getting you ready to ride... almost there!</span>
          </div>
        </div>
      )}

            
      <img src={bikeLogo} alt="Bike Logo" className="w-32 h-32 mr-4" />
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2 drop-shadow-lg">Pedals</h1>
        <p className="text-lg md:text-xl font-medium text-gray-300 tracking-wide italic">"Anytime Mobility"</p>
      </div>
    </div>


        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 sm:p-8 bg-gray-800 shadow-xl rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-6">User Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="w-full text-left">
              <label
                htmlFor="rollNumber"
                className="block text-sm md:text-lg font-medium text-gray-300 mb-1"
              >
                Roll Number:
              </label>
              <input
                id="rollNumber"
                name="rollNumber"
                type="text"
                placeholder="Enter your Roll Number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="w-full text-left">
              <label
                htmlFor="password"
                className="block text-sm md:text-lg font-medium text-gray-300 mb-1"
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
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-gray-100 font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <a
              onClick={handleRegister}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Register
            </a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
