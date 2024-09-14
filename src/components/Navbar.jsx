import { useState, useEffect } from 'react';
import './navbar.css';

export default function Navbar({ onCategorySelect }) {
  const [selectedLink, setSelectedLink] = useState(0); // Default to "Top" category
  const categories = ['Top', 'Business', 'Technology', 'Sports', 'Entertainment', 'Politics'];
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    onCategorySelect(categories[0].toLowerCase()); // Set initial category

    // Update the date with custom format
    const formattedDate = formatDate(new Date());
    setCurrentDate(formattedDate);
  }, [onCategorySelect]);

  const handleLinkClick = (index, category) => {
    setSelectedLink(index);
    onCategorySelect(category.toLowerCase());
  };

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
    <nav className="navbar">
      <div className="navbarlinks">
        {categories.map((link, index) => (
          <a
            key={index}
            href="#"
            className={`nav-link ${selectedLink === index ? 'active' : ''}`}
            onClick={() => handleLinkClick(index, link)}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right-side date display 
      <div className="datetime">
        {currentDate}
      </div>
      */}
    </nav>
  );
}
