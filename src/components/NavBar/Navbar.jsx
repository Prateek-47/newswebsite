import { useState, useEffect } from 'react';
import './navbar.css'; // Import the CSS file for styling

export default function Navbar({ onCategorySelect }) {
  // State to track which category link is currently selected (default to the first category "Top")
  const [selectedLink, setSelectedLink] = useState(0);
  
  // List of categories to be displayed in the navbar
  const categories = ['Top', 'Business', 'Technology', 'Sports', 'Entertainment', 'Politics'];
  
  // State to hold the current date in a custom formatted string
  const [currentDate, setCurrentDate] = useState('');

  // useEffect to set the initial category and update the date on component mount
  useEffect(() => {
    // Trigger the callback function with the default category "Top" (in lowercase)
    onCategorySelect(categories[0].toLowerCase());

    // Format and set the current date when the component is loaded
    const formattedDate = formatDate(new Date());
    setCurrentDate(formattedDate);
  }, [onCategorySelect]);

  // Handle link click to update the selected category
  const handleLinkClick = (index, category) => {
    setSelectedLink(index); // Update the selected link state
    onCategorySelect(category.toLowerCase()); // Call the callback to update the selected category in lowercase
  };

  // Function to format the date into "DayNumber + Suffix Month Year" (e.g., "3rd September 2024")
  const formatDate = (date) => {
    const day = date.getDate(); // Get day of the month
    const month = date.toLocaleString('default', { month: 'long' }); // Get the full name of the month
    const year = date.getFullYear(); // Get the year
    const daySuffix = getDaySuffix(day); // Get the appropriate suffix for the day (e.g., "st", "nd", "rd", "th")

    // Return the formatted date as a string
    return `${day}${daySuffix} ${month} ${year}`;
  };

  // Function to get the correct suffix for the day (st, nd, rd, th)
  const getDaySuffix = (day) => {
    // Handle special cases for numbers like 11, 12, 13
    if (day > 3 && day < 21) return 'th';
    
    // Handle the general cases for numbers ending in 1, 2, 3
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
    <nav className="navbar">
      {/* Render the category links */}
      <div className="navbarlinks">
        {categories.map((link, index) => (
          <a
            key={index}
            href="#"
            className={`nav-link ${selectedLink === index ? 'active' : ''}`} // Apply 'active' class to the selected link
            onClick={() => handleLinkClick(index, link)} // Handle link click event
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right-side date display - commented out for now */}
      {/* 
      <div className="datetime">
        {currentDate} // Display the formatted current date
      </div>
      */}
    </nav>
  );
}
