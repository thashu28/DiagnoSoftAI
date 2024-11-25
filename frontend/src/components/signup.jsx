<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup
import { signup } from '../../services/authservice';
=======
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup
// import { signup } from '../../services/authservice';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     role: "patient", // Default to patient
//     age: "",
//     gender: "male", // Default to male
//     bloodType: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Hook for navigation after signup

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   // Check if passwords match
//   //   if (formData.password !== formData.confirmPassword) {
//   //     setMessage("Passwords do not match.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await HTTPCommon.post("api/auth/signup", formData); // Call your signup API
//   //     if (response.status === 201) {
//   //       setMessage("Signup successful!");
//   //       // Redirect to login page or dashboard after successful signup
//   //       navigate('/login'); // Adjust the path as necessary
//   //     } else {
//   //       setMessage("Signup failed! Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during signup:", error);
//   //     setMessage("Signup failed! Ensure all fields are correct.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }
  
//     try {
//       const response = await signup(formData); // Call the signup function from authService

//       if (response && response.success) {
//         setMessage("Signup successful!");
//         navigate('/login'); // Redirect to the login page after successful signup
//       } else {
//         setMessage("Signup failed! Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setMessage("Signup failed! Ensure all fields are correct.");
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Password */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Confirm Password */}
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               id="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Phone */}
//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-sm font-medium mb-2">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               id="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Role */}
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-sm font-medium mb-2">
//               Role
//             </label>
//             <select
//               name="role"
//               id="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             >
//               <option value="patient">Patient</option>
//               <option value="admin">Admin</option>
//               <option value="doctor">Doctor</option>
//               <option value="labtech">Lab Tech</option>
//             </select>
//           </div>
//           {/* Age */}
//           <div className="mb-4">
//             <label htmlFor="age" className="block text-sm font-medium mb-2">
//               Age
//             </label>
//             <input
//               type="number"
//               name="age"
//               id="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>
//           {/* Gender */}
//           <div className="mb-4">
//             <label htmlFor="gender" className="block text-sm font-medium mb-2">
//               Gender
//             </label>
//             <select
//               name="gender"
//               id="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           {/* Blood Type */}
//           <div className="mb-4">
//             <label htmlFor="bloodType" className="block text-sm font-medium mb-2">
//               Blood Type
//             </label>
//             <select
//               name="bloodType"
//               id="bloodType"
//               value={formData.bloodType}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             >
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//             </select>
//           </div>
//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition ease-in-out duration-300"
//           >
//             Sign Up
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authservice";
>>>>>>> Stashed changes

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
<<<<<<< Updated upstream
    role: "patient", // Default to patient
    age: "",
    gender: "male", // Default to male
    bloodType: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation after signup

=======
    role: "patient", // Default value
    age: "",
    gender: "male", // Default value
    bloodType: "A+", // Default value
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
>>>>>>> Stashed changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

<<<<<<< Updated upstream
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if passwords match
  //   if (formData.password !== formData.confirmPassword) {
  //     setMessage("Passwords do not match.");
  //     return;
  //   }

  //   try {
  //     const response = await HTTPCommon.post("api/auth/signup", formData); // Call your signup API
  //     if (response.status === 201) {
  //       setMessage("Signup successful!");
  //       // Redirect to login page or dashboard after successful signup
  //       navigate('/login'); // Adjust the path as necessary
  //     } else {
  //       setMessage("Signup failed! Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //     setMessage("Signup failed! Ensure all fields are correct.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
=======
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
>>>>>>> Stashed changes
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
<<<<<<< Updated upstream
  
    try {
      const response = await signup(formData); // Call the signup function from authService

      if (response && response.success) {
        setMessage("Signup successful!");
        navigate('/login'); // Redirect to the login page after successful signup
=======

    try {
      const response = await signup(formData); // Call signup service

      if (response && response.success) {
        setMessage("Signup successful!");
        navigate("/login"); // Redirect to login
>>>>>>> Stashed changes
      } else {
        setMessage("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Signup failed! Ensure all fields are correct.");
    }
  };
<<<<<<< Updated upstream
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
=======

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
          Create Your Account
        </h2>
>>>>>>> Stashed changes
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
<<<<<<< Updated upstream
=======
              required
>>>>>>> Stashed changes
            >
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
<<<<<<< Updated upstream
              <option value="labtech">Lab Tech</option>
            </select>
          </div>
=======
              <option value="labtech">Lab Technician</option>
            </select>
          </div>

>>>>>>> Stashed changes
          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
<<<<<<< Updated upstream
          {/* Blood Type */}
          <div className="mb-4">
=======

          {/* Blood Type */}
          <div className="mb-6">
>>>>>>> Stashed changes
            <label htmlFor="bloodType" className="block text-sm font-medium mb-2">
              Blood Type
            </label>
            <select
              name="bloodType"
              id="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
<<<<<<< Updated upstream
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition ease-in-out duration-300"
=======

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
>>>>>>> Stashed changes
          >
            Sign Up
          </button>
        </form>
<<<<<<< Updated upstream
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
=======

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default SignupPage;
