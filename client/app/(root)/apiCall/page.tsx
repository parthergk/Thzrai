'use client';
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    async function handleApiCall() {
      try {
        const response = await fetch('/api/user'); // Add leading '/'
        const data = await response.json(); // Parse JSON response
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    handleApiCall();
  }, []);

  return <div>Page</div>;
};

export default Page;
