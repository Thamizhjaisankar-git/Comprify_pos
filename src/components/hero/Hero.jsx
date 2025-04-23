// import React from 'react';
// import { ReactTyped } from "react-typed";
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {

//   const navigate = useNavigate();

//   const navToSignUp = () => {
//     navigate('/login');
//   };

//   return (
//     <div className='text-white bg-gradient-to-b from-black via-gray-900 to-black h-screen flex items-center'>

//       <div className='absolute top-4 left-6'>
//         <h1 className='text-white font-extrabold md:text-2xl sm:text-2xl text-xl tracking-wide'>
//           COMPRIFY .
//         </h1>
//       </div>
//       <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
//         <p className='text-[#00df9a] font-bold p-2'>
//           EFFICIENT & SMART POINT OF SALE SYSTEM
//         </p>
//         <h1 className='md:text-5xl sm:text-6xl text-4xl font-bold md:py-6'>
//           Elevate Your Business.
//         </h1>
//         <div className='flex justify-center items-center'>
//           <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
//             Experience seamless
//           </p>
//           <ReactTyped
//             className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
//             strings={['Billing', 'Inventory', 'Sales']}
//             typeSpeed={250}
//             backSpeed={200}
//             loop
//           />
//         </div>
//         <p className='md:text-2xl text-xl font-bold text-gray-400'>
//           Comprify POS helps businesses streamline transactions, manage inventory, and boost sales with ease.
//         </p>
//         <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black
// transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-500 cursor-pointer' onClick={navToSignUp}>
//   Get Started
// </button>

//       </div>
//     </div>
//   );
// };

// export default Hero;
"use client";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const navToSignUp = () => {
    navigate("/login");
  };

  return (
    <div className="text-white bg-gradient-to-b from-black via-gray-900 to-black h-screen flex items-center">
      <div className="absolute top-4 left-6">
        <h1 className="text-white font-extrabold md:text-2xl sm:text-2xl text-xl tracking-wide">
          COMPRIFY .
        </h1>
      </div>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
          EFFICIENT & SMART POINT OF SALE SYSTEM
        </p>
        <h1 className="md:text-5xl sm:text-6xl text-4xl font-bold md:py-6">
          Elevate Your Business.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Experience seamless
          </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["Billing", "Inventory", "Sales"]}
            typeSpeed={250}
            backSpeed={200}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-400">
          Comprify POS helps businesses streamline transactions, manage
          inventory, and boost sales with ease.
        </p>
        <button
          className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black 
transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-500 cursor-pointer"
          onClick={navToSignUp}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
