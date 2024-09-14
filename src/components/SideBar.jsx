import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; 

export default function Sidebar() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetch('/filtered_image_url.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        return response.json();
      })
      .then((data) => setArticles(data.slice(0, 17)))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const renderModal = () => {
    if (!selectedArticle) return null;

    return ReactDOM.createPortal(
      <div className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>{selectedArticle.title}</h2>
          {selectedArticle.image_url && (
            <img
              src={selectedArticle.image_url}
              alt={selectedArticle.title}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          <p>
            <strong>Published on:</strong> {new Date(selectedArticle.pubDate).toLocaleDateString()}
          </p>
          <p>{selectedArticle.content || 'Content not available.'}</p>
         
        </div>
      </div>,
      document.body // This renders the modal outside of the sidebar component
    );
  };

  return (
    <div className="article-grid-item" style={{ padding: '20px' }}>
      <h3>Top Articles</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {articles.map((article, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => openModal(article)}
              />
            )}
            <a href="#" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} onClick={() => openModal(article)}>
              {article.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Render the modal */}
      {renderModal()}
    </div>
  );
}
