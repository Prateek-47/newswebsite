import { Mosaic } from "react-loading-indicators";
import { useState, useEffect } from 'react';

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
    <div className='topbar' style={{height:'50px', backgroundColor: '#fff', padding: '5px 10px', textAlign: 'center', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      
      {/* Loading Component as Logo */}
      <div className='logo' style={{ marginRight: '-0.5px', transform: 'scale(0.3)' }}> {/* Reduced size with transform */}
        <Mosaic color='#000'/>
      </div>

      {/* Website Name */}
      <div className='website-name' style={{ color:'#000', fontSize: '24px', fontWeight: 'bold' }}>
        PrimeHeadlines
      </div>

      {/* Current Date */}
      <div className="datetime" style={{ fontWeight: 'bold',color:'#000', fontSize: '16px', paddingRight: '20px', marginTop: '1px' ,marginLeft: 'auto', }}>
        {currentDate}
      </div>
    </div>
  );
}
