import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const App = ({  }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [breedId, setBreedId] = useState('');
  const [jsonResp, setJsonResp] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBreedId(inputValue);
    // Perform any necessary actions with the input value
    console.log('Submitted value:', inputValue);
    // Reset the input value
    setInputValue('');
  };

  useEffect(() => {
    const getCatImagesByBreed = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          headers: {
            'x-api-key': 'YOUR_API_KEY' // Replace with your actual API key
          },
          params: {
            breed_ids: breedId
          }
        });

        const data = response.data;
        setJsonResp(JSON.stringify(data));
        const urls = data.map(image => image.url);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCatImagesByBreed();
  }, [breedId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {imageUrls.length > 0 ? (
        <div>
          <h2>Cat Images</h2>
          <div>
            {imageUrls.map(url => (
              <img key={url} src={url} alt="Cat" style={{ width: '300px', height: 'auto' }} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading cat images...</p>
      )}
      <div>
        {jsonResp}
      </div>
    </div>
  );
};


export default App;
