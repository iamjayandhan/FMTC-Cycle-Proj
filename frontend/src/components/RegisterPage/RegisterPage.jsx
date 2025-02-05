import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bikeLogo from '../../assets/bike.png';
import BikeLoader from '../BikeLoader/BikeLoader';
// import './RegisterPage.css';


const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const { rollNumber, userName, mobile, password, passnumber } = formData;
    const body = isStudent
      ? { rollNumber, userName, mobile, password }
      : { passnumber, mobile, password };  // Include mobile for guests

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
    } finally{
      setIsLoading(false);
    }
  };

  const handleLogin = () => navigate('/login');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
  
      {/* Loader centered */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="flex flex-col items-center justify-center">
            <BikeLoader />
            <span className="mt-4 text-white text-2xl font-semibold">Hold on! We’re setting up your new account.</span>
          </div>
        </div>
      )}

      <div className="text-center mb-8 md:mb-10 flex items-center justify-center">
        <img src={bikeLogo} alt="Bike Logo" className="w-32 h-32 mr-4" />
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2 drop-shadow-lg">Pedals</h1>
          <p className="text-lg md:text-xl font-medium text-gray-300 tracking-wide italic">"Anytime Mobility"</p>
        </div>
      </div>
  
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-6 sm:p-8 bg-gray-800 shadow-xl rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-6">
          {isStudent ? 'Register as Student' : 'Register as Guest'}
        </h2>
  
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsStudent(true)}
            className={`w-32 py-2 rounded-l-md ${isStudent ? 'bg-blue-500 text-gray-100' : 'bg-gray-600 text-gray-400'}`}
          >
            Student
          </button>
          <button
            onClick={() => setIsStudent(false)}
            className={`w-32 py-2 rounded-r-md ${!isStudent ? 'bg-blue-500 text-gray-100' : 'bg-gray-600 text-gray-400'}`}
          >
            Guest
          </button>
        </div>
  
        <form onSubmit={handleRegister} className="space-y-6">
          {isStudent && (
            <>
              <div className="w-full text-left">
                <label htmlFor="userName" className="block text-lg md:text-m font-medium text-gray-300 mb-1">Username:</label>
                <input
                  name="userName"
                  minLength={4}
                  type="text"
                  placeholder="Enter your username"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="w-full text-left">
                <label htmlFor="rollNumber" className="block text-lg md:text-m font-medium text-gray-300 mb-1">Roll Number:</label>
                <input
                  name="rollNumber"
                  minLength={4}
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </>
          )}
  
          {/* For Mobile */}
          <div className="w-full text-left">
            <label htmlFor="mobile" className="block text-m md:text-lg font-medium text-gray-300 mb-1">Mobile:</label>
            <input
              name="mobile"
              type="text"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              pattern="\d{10}"
              maxLength="10"
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {!isStudent && (
            <div className="w-full text-left">
              <label htmlFor="passnumber" className="block text-m md:text-lg font-medium text-gray-300 mb-1">Passnumber:</label>
              <input
                name="passnumber"
                type="text"
                placeholder="Enter your passnumber"
                value={formData.passnumber}
                onChange={handleInputChange}
                maxLength="30"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
            </div>
          )}
  
          <div className="w-full text-left">
            <label htmlFor="password" className="block text-m md:text-lg font-medium text-gray-300 mb-1">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              minLength={4}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-gray-100 font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
  
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a
            onClick={handleLogin}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
  
  
};

export default RegisterPage;
