import React, { useState, useEffect } from 'react';
import api from '../api';

function Stream({ match, location }) {
  const [streamData, setStreamData] = useState([]);

  useEffect(() => {
    //connects to twitch api
    const fetchData = async () => {
      const res = await api.get(
        `https://api.twitch.tv/helix/streams?user_id=${location.state.streamID}`
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
  });

  return (
    <div className="stream-page">
      {streamData.map(stream => (
        <div className="stream-info">
          <h1 className="text-purple mt-4">{match.params.id}</h1>
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
            <h4 className="text-center text-white mt-5">
              Click here to head to {match.params.id}'s stream
            </h4>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Stream;
