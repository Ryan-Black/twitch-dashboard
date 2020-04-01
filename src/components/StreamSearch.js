import React, { useState, useEffect } from 'react';
import api from '../api';

function StreamSearch({ match, location }) {
  const [streamData, setStreamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //retrieves search term
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    //connects to twitch api and retrieves stream with the username that was searched for
    const fetchData = async () => {
      const res = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${searchTerm}`
      );
      //stores the data
      let dataArray = res.data.data;
      //changes the dimensions of the stream thumbnail
      let finalArray = dataArray.map(stream => {
        let newURL = stream.thumbnail_url
          .replace('{width}', '1100')
          .replace('{height}', '550');
        stream.thumbnail_url = newURL;
        return stream;
      });
      setStreamData(finalArray);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="stream-page">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="search-box"
      />
      {streamData.map(stream => (
        <div className="stream-info">
          <h1 className="text-purple mt-4">{stream.user_name}</h1>
          <h3 className="text-center text-white">
            <strong className="text-purple">{stream.viewer_count}</strong>{' '}
            Viewers
          </h3>
          <h3 className="text-white">{stream.title}</h3>
          <img
            className="stream-img img-fluid"
            src={stream.thumbnail_url}
            alt="stream-thumbnail"
          />
          <a
            className="link"
            href={'https://twitch.tv/' + stream.user_name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className="text-center text-white mt-4">
              Click here to head to {stream.user_name}'s stream
            </h4>
          </a>
        </div>
      ))}
    </div>
  );
}

export default StreamSearch;
