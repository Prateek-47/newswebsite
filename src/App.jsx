import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import ArticleGrid from './components/ArticleGrid';
import Sidebar from './components/SideBar'; // Make sure the import name matches
import Loading from './components/Loading';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Whenever selectedCategory changes, we simulate fetching new articles
  useEffect(() => {
    setIsLoading(true); // Set loading to true when category changes
    // Simulate an API call delay
    setTimeout(() => {
      setIsLoading(false); // Stop loading after articles are "loaded"
    }, 1800); // Adjust this time based on actual fetch duration
  }, [selectedCategory]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <TopBar />
      <Navbar onCategorySelect={setSelectedCategory} onSearch={handleSearch} />

      <div style={{ display: 'flex', padding: '20px' }}>
        <div style={{ flex: isMobile ? '1' : '2' }}>
          {/* Show loading screen or article grid based on loading state */}
          {isLoading ? (
            // Wrapper to center the Loading component
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',  // Set to full viewport height
            }}>
              <Loading />
            </div>
          ) : (
            <ArticleGrid selectedCategory={selectedCategory} searchQuery={searchQuery} />
          )}
        </div>
        {!isMobile && (
          <div style={{ flex: 1, marginLeft: '20px', marginTop: '-20px' }}>
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
}
