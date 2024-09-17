import { Mosaic } from "react-loading-indicators";
import { useState, useEffect } from 'react';
import './TopBar.css'; // Ensure you have a CSS file for styling

export default function TopBar() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setCurrentDate(formatDate(now));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month} ${year}`;
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Exceptions for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <div className='topbar'>
      {/* Loading Component as Logo */}
      <div className='logo'>
        <Mosaic color='#000'/>
      </div>

      {/* Website Name */}
      <div className='website-name'>
        PrimeHeadlines
      </div>

      {/* Current Date */}
      <div className="datetime">
        {currentDate}
      </div>
    </div>
  );
}
