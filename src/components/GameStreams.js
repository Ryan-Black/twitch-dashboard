import React, { useState, useEffect } from 'react';
import api from '../api';

function GameStreams({ match, location }) {
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}&first=100`
      );
      let dataArray = res.data.data;
      let finalArray = dataArray.map(stream => {
        let newURL = stream.thumbnail_url
          .replace('{width}', '500')
          .replace('{height}', '250');
        stream.thumbnail_url = newURL;
        return stream;
      });

      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      setViewers(totalViewers);
      setStreamData(finalArray);
    };
    fetchData();
  });

  return (
    <div>
      <h1 className="text-purple">{match.params.id}</h1>
      <h3 className="text-center text-white">
        <strong className="text-purple">{viewers}</strong> Viewers
      </h3>
      <div className="row">
        {streamData.map(stream => (
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-4">
            <div className="container-fluid d-flex flex-column overflow-hidden">
              <a
                className="link"
                href={'https://twitch.tv/' + stream.user_name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="stream-img"
                  src={stream.thumbnail_url}
                  alt="stream-thumbnail"
                />
              </a>
              <div className="stream-text">
                <a
                  className="link"
                  href={'https://twitch.tv/' + stream.user_name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 className="text-center text-white mt-2">
                    {stream.user_name} -{stream.viewer_count} viewers
                  </h4>
                </a>
                <h6 className="text-white">{stream.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameStreams;