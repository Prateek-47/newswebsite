import { useState, useEffect } from 'react';
import { database,ref, get, query, orderByChild, equalTo } from '../firebase'; // Adjust imports based on your Firebase config
import './Modal.css';
import SearchBar from './SearchBar'; // Import the SearchBar component

export default function ArticleGrid({ selectedCategory }) {
  const [articles, setArticles] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null); // For the modal
  const [searchResults, setSearchResults] = useState([]); // For search results modal
  const [showSearchModal, setShowSearchModal] = useState(false); // For controlling the search modal visibility

  useEffect(() => {
    const fetchArticlesFromFirebase = async () => {
      try {
        // Reference to your articles collection in Firebase
        const articlesRef = ref(database); // Access the root of the database
        const snapshot = await get(articlesRef); // Fetch the data once
        const data = snapshot.val();

        if (snapshot.exists()) {
          const data = snapshot.val();
          const articleArray = Object.values(data); // Convert object data to array

          // Filter based on selected category
          const filteredArticles = articleArray.filter(article => {
            if (Array.isArray(article.category)) {
              return article.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
            }
            return false;
          });

          setArticles(filteredArticles);

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

    fetchArticlesFromFirebase();
  }, [selectedCategory]);

  // Handle search query and show the search results in a modal
  const handleSearch = (query) => {
    const searchQuery = query.toLowerCase();

    const filteredArticles = articles.filter(article => {
      const title = article.title?.toLowerCase() || '';
      const description = article.description?.toLowerCase() || '';
      const content = article.content?.toLowerCase() || '';

      return title.includes(searchQuery) || description.includes(searchQuery) || content.includes(searchQuery);
    });

    if (filteredArticles.length > 0) {
      setSearchResults(filteredArticles);
      setShowSearchModal(true); // Open the search results modal
    } else {
      alert('No articles found for this search query.'); // You can replace this with any other feedback method
    }
  };

  // Load more articles
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  // Modal handling
  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Main Article Section */}
      {mainArticle && (
        <div
          className="main-article"
          onClick={() => openModal(mainArticle)}
          style={{ padding: '20px', marginBottom: '20px', cursor: 'pointer' }}
        >
          <h2 style={{ cursor: 'pointer', color: 'black' }}>{mainArticle.title}</h2>
          {mainArticle.image_url && <img src={mainArticle.image_url} alt={mainArticle.title} style={{ width: '100%', height: 'auto' }} />}
          <p>By: {mainArticle.creator ? mainArticle.creator.join(', ') : 'Unknown Author'}</p>
          <p>{mainArticle.description}</p>
        </div>
      )}

      {/* Article Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', cursor: 'pointer' }}>
        {articles.slice(0, visibleCount).map((article, index) => (
          <div key={index} className="article-grid-item" onClick={() => openModal(article)} style={{ padding: '10px' }}>
            <h3 style={{ cursor: 'pointer', color: 'black' }}>{article.title}</h3>
            {article.image_url && <img src={article.image_url} alt={article.title} style={{ width: '100%', height: 'auto' }} />}
            <p>By: {article.creator ? article.creator.join(', ') : 'Unknown Author'}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < articles.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="load-more-button" onClick={loadMore} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Load More Articles
          </button>
        </div>
      )}

      {/* Modal for Article Details */}
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
