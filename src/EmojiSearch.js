import React, { useState } from 'react';
import emojiData from './emojiData.json';
import './EmojiSearch.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmojiSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredEmojis = emojiData.filter((emoji) =>
      emoji.keywords.includes(event.target.value.toLowerCase()) 
    );
    setSearchResults(filteredEmojis);
  };

  const handleCopy = async (emoji) => {
    try {
      await navigator.clipboard.writeText(emoji.symbol);
      console.log('Emoji copied to clipboard:', emoji.symbol);
      toast.success(emoji.symbol+' Copied to Clipboard!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      
    } catch (error) {
      console.error('Failed to copy emoji:', error);
    }
  };



  const notify = ()=>{
    
  }



  return (
    <div className="emoji-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for an emoji"
      />
      <div className="emoji-results">
        {searchResults.map((emoji) => (
          <div
            key={emoji.title}
            className="emoji-card"
            onClick={() => {handleCopy(emoji);notify()}}
          >
            {emoji.symbol}
          </div>
        ))}
      </div>

      <div className='toast'>
          <ToastContainer/>
      </div>
    </div>
  );
};

export default EmojiSearch;
