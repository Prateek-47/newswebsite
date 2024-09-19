import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for rendering modal outside the component tree
import '../ArticleGrid/Modal.css'; // Import modal styles

export default function Sidebar() {
  // State to hold the list of articles fetched from the JSON file
  const [articles, setArticles] = useState([]);
  
  // State to hold the currently selected article to be shown in the modal
  const [selectedArticle, setSelectedArticle] = useState(null);

  // useEffect to fetch the articles from a JSON file when the component mounts
  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/filtered_image_url.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch articles'); // Handle any errors during the fetch
        }
        return response.json(); // Parse the response data
      })
      .then((data) => setArticles(data.slice(0, 17))) // Store up to 17 articles in the state
      .catch((error) => console.error('Error fetching articles:', error)); // Log any errors to the console
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to open the modal when an article is clicked
  const openModal = (article) => {
    setSelectedArticle(article); // Set the clicked article as the selected article for the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedArticle(null); // Clear the selected article, closing the modal
  };

  // Function to render the modal with the selected article's details
  const renderModal = () => {
    // If no article is selected, return null (do not render the modal)
    if (!selectedArticle) return null;

    // Render the modal using ReactDOM.createPortal to ensure it's rendered outside the Sidebar's DOM hierarchy
    return ReactDOM.createPortal(
      <div className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent click inside the modal from closing it */}
          <span className="close" onClick={closeModal}>&times;</span> {/* Close button */}
          <h2>{selectedArticle.title}</h2>
          {selectedArticle.image_url && (
            <img
              src={selectedArticle.image_url}
              alt={selectedArticle.title}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          <p>
            <strong>Published on:</strong> {new Date(selectedArticle.pubDate).toLocaleDateString()} {/* Show the publication date */}
          </p>
          <p>{selectedArticle.content || 'Content not available.'}</p> {/* Show the content or fallback message */}
        </div>
      </div>,
      document.body // Render the modal in the body of the document
    );
  };

  return (
    <div className="article-grid-item" style={{ padding: '20px' }}>
      <h3>Top Articles</h3>
      {/* Render the list of articles */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {articles.map((article, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => openModal(article)} // Open modal on image click
              />
            )}
            {/* Article title as clickable link to open modal */}
            <a href="#" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} onClick={() => openModal(article)}>
              {article.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Render the modal when an article is selected */}
      {renderModal()}
    </div>
  );
}
