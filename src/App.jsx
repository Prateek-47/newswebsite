import { useState, useEffect } from 'react';
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/NavBar/Navbar';
import ArticleGrid from './components/ArticleGrid/ArticleGrid';
import Sidebar from './components/SideBar/SideBar'; // Import Sidebar component
import Loading from './components/Loading'; // Import Loading component

export default function App() {
  // State to manage the selected category for articles
  const [selectedCategory, setSelectedCategory] = useState('top');
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to manage the mobile view detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Effect to simulate loading when selectedCategory changes
  useEffect(() => {
    setIsLoading(true); // Set loading to true when category changes
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false); // Stop loading after articles are "loaded"
    }, 1800); // Adjust time based on actual fetch duration
  }, [selectedCategory]);

  // Effect to handle window resizing and update mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize); // Add event listener for window resize
    return () => window.removeEventListener('resize', handleResize); // Clean up listener on unmount
  }, []);

  return (
    <div>
      {/* TopBar component */}
      <TopBar />

      {/* Navbar component with category selection and search handling */}
      <Navbar onCategorySelect={setSelectedCategory} onSearch={handleSearch} />

      <div style={{ display: 'flex', paddingTop: '10px' }}>
        <div style={{ flex: isMobile ? '1' : '2' }}>
          {/* Conditionally render loading screen or article grid based on loading state */}
          {isLoading ? (
            // Center the Loading component in the viewport
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh', // Full viewport height
            }}>
              <Loading />
            </div>
          ) : (
            <ArticleGrid selectedCategory={selectedCategory} searchQuery={searchQuery} />
          )}
        </div>

        {/* Conditionally render Sidebar based on mobile view */}
        {!isMobile && (
          <div style={{ flex: 1, marginLeft: '20px', marginTop: '-20px' }}>
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
}
