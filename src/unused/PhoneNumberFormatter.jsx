import React from 'react';

const MyComponent = () => {
  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters from the phone number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Split the cleaned phone number into groups of 3 digits
    const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    return formattedPhoneNumber;
  };

  const phoneNumber = '0879879219'; // Example phone number to format
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  return <div>{formattedPhoneNumber}</div>; // Render the formatted phone number
};

export default MyComponent;
