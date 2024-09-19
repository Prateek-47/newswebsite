import { Mosaic } from "react-loading-indicators"; // Importing the Mosaic loading indicator component
import { useState, useEffect } from 'react';
import './TopBar.css'; // Importing the CSS file for styling the TopBar component

export default function TopBar() {
  const [currentDate, setCurrentDate] = useState(''); // State to store the formatted current date

  // useEffect to update the date every minute
  useEffect(() => {
    const updateDate = () => {
      const now = new Date(); // Get the current date and time
      setCurrentDate(formatDate(now)); // Set the formatted date to the state
    };

    updateDate(); // Initial call to set the date when the component mounts
    const intervalId = setInterval(updateDate, 60000); // Update the date every minute

    return () => clearInterval(intervalId); // Cleanup the interval when the component unmounts
  }, []);

  // Helper function to format the date into the desired format
  const formatDate = (date) => {
    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name
    const year = date.getFullYear(); // Get the year
    const daySuffix = getDaySuffix(day); // Get the appropriate suffix for the day (st, nd, rd, th)

    return `${day}${daySuffix} ${month} ${year}`; // Return the formatted date string
  };

  // Helper function to determine the suffix for the day
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Exception for 11th, 12th, and 13th
    switch (day % 10) {
      case 1:
        return 'st'; // 1st
      case 2:
        return 'nd'; // 2nd
      case 3:
        return 'rd'; // 3rd
      default:
        return 'th'; // All other cases
    }
  };

  return (
    <div className='topbar'>
      {/* Logo area with the loading indicator as the logo */}
      <div className='logo'>
        <Mosaic color='#000'/> {/* Mosaic loading indicator */}
      </div>

      {/* Website Name area */}
      <div className='website-name'>
        PrimeHeadlines
      </div>

      {/* Current Date display */}
      <div className="datetime">
        {currentDate} {/* Display the current formatted date */}
      </div>
    </div>
  );
}
