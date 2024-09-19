import { useState, useEffect } from 'react';
import { database, ref, get } from '../../firebase'; // Import necessary Firebase modules and config
import './Modal.css'; // Import CSS for modal styling
import SearchBar from '../SearchBar/SearchBar'; // Import the SearchBar component

// ArticleGrid Component
export default function ArticleGrid({ selectedCategory }) {
  // State variables
  const [articles, setArticles] = useState([]); // Holds all articles from Firebase
  const [mainArticle, setMainArticle] = useState(null); // Main featured article
  const [visibleCount, setVisibleCount] = useState(6); // How many articles are shown initially
  const [selectedArticle, setSelectedArticle] = useState(null); // Holds the article for the modal view
  const [searchResults, setSearchResults] = useState([]); // Holds search results
  const [showSearchModal, setShowSearchModal] = useState(false); // Controls search modal visibility

  // Fetch articles from Firebase on component mount or when the selected category changes
  useEffect(() => {
    const fetchArticlesFromFirebase = async () => {
      try {
        // Reference to your Firebase database root
        const articlesRef = ref(database);
        // Get the data snapshot
        const snapshot = await get(articlesRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val(); // Fetch data
          const articleArray = Object.values(data); // Convert object data to array

          // Filter articles based on selected category
          const filteredArticles = articleArray.filter(article => {
            if (Array.isArray(article.category)) {
              return article.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
            }
            return false;
          });

          // Update the articles state with filtered articles
          setArticles(filteredArticles);

          // Randomly set one article as the main featured article
          if (filteredArticles.length > 0) {
            const randomArticle = filteredArticles[Math.floor(Math.random() * filteredArticles.length)];
            setMainArticle(randomArticle);
          } else {
            setMainArticle(null);
          }
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    // Call the function to fetch articles
    fetchArticlesFromFirebase();
  }, [selectedCategory]);

  // Handle search queries and display search results in a modal
  const handleSearch = (query) => {
    const searchQuery = query.toLowerCase(); // Convert query to lowercase for case-insensitive search

    // Filter articles based on the query
    const filteredArticles = articles.filter(article => {
      const title = article.title?.toLowerCase() || ''; // Check if title exists, convert to lowercase
      const description = article.description?.toLowerCase() || ''; // Check if description exists, convert to lowercase
      const content = article.content?.toLowerCase() || ''; // Check if content exists, convert to lowercase

      // Match query with article title, description, or content
      return title.includes(searchQuery) || description.includes(searchQuery) || content.includes(searchQuery);
    });

    // If articles match the search, display results in a modal
    if (filteredArticles.length > 0) {
      setSearchResults(filteredArticles); // Update search results state
      setShowSearchModal(true); // Show the search modal
    } else {
      alert('No articles found for this search query.'); // Notify user if no results found
    }
  };

  // Load more articles (increase visible count by 8)
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  // Open the article modal when an article is clicked
  const openModal = (article) => {
    setSelectedArticle(article);
  };

  // Close the article modal
  const closeModal = () => {
    setSelectedArticle(null);
  };

  // Close the search results modal
  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  return (
    <div>
      {/* Search Bar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* Main Featured Article */}
      {mainArticle && (
        <div
          className="main-article"
          onClick={() => openModal(mainArticle)}
          style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}
        >
          <h2 style={{ cursor: 'pointer', color: 'black' }}>{mainArticle.title}</h2>
          {mainArticle.image_url && <img src={mainArticle.image_url} alt={mainArticle.title} style={{ width: '100%', height: 'auto' }} />}
          <p>By: {mainArticle.creator ? mainArticle.creator.join(', ') : 'Unknown Author'}</p>
          <p>{mainArticle.description}</p>
        </div>
      )}

      {/* Article Grid - Display articles in a grid format */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0px', cursor: 'pointer' }}>
        {articles.slice(0, visibleCount).map((article, index) => (
          <div key={index} className="article-grid-item" onClick={() => openModal(article)} style={{ padding: '10px' }}>
            <h3 style={{ cursor: 'pointer', color: 'black' }}>{article.title}</h3>
            {article.image_url && <img src={article.image_url} alt={article.title} style={{ width: '100%', height: 'auto' }} />}
            <p>By: {article.creator ? article.creator.join(', ') : 'Unknown Author'}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>

      {/* Load More Button - Show if there are more articles to load */}
      {visibleCount < articles.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="load-more-button" onClick={loadMore} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Load More Articles
          </button>
        </div>
      )}

      {/* Modal for Viewing Article Details */}
      {selectedArticle && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedArticle.title}</h2>
            {selectedArticle.image_url && <img src={selectedArticle.image_url} alt={selectedArticle.title} style={{ width: '100%', height: 'auto' }} />}
            <p>By: {selectedArticle.creator ? selectedArticle.creator.join(', ') : 'Unknown Author'}</p>
            <p>
              <strong>Published on:</strong> {new Date(selectedArticle.pubDate).toLocaleDateString()}
            </p>
            <p>{selectedArticle.content || 'Content not available.'}</p>
          </div>
        </div>
      )}

      {/* Modal for Search Results */}
      {showSearchModal && (
        <div className="modal" onClick={closeSearchModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeSearchModal}>
              &times;
            </span>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((article, index) => (
                <li key={index} onClick={() => { openModal(article); closeSearchModal(); }} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                {article.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
