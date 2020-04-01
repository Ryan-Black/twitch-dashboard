import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function GameStreams({ match, location }) {
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    //connects to twitch api
    const fetchData = async () => {
      const res = await api.get(
        //gets the first 100 streams for specified game
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}&first=100`
      );
      //stores data from api request
      let dataArray = res.data.data;
      //changes the dimensions of each stream thumbnail
      let finalArray = dataArray.map(stream => {
        let newURL = stream.thumbnail_url
          .replace('{width}', '500')
          .replace('{height}', '250');
        stream.thumbnail_url = newURL;
        return stream;
      });

      //adds up the viewers for each of the 100 streams
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
              <Link
                className="link"
                to={{
                  pathname: 'stream/' + stream.user_name,
                  state: {
                    streamID: stream.user_id
                  }
                }}
              >
                <img
                  className="stream-img"
                  src={stream.thumbnail_url}
                  alt="stream-thumbnail"
                />
              </Link>
              <div className="stream-text">
                <Link
                  className="link"
                  to={{
                    pathname: 'stream/' + stream.user_name,
                    state: {
                      streamID: stream.user_id
                    }
                  }}
                >
                  <h4 className="text-center text-white mt-2">
                    {stream.user_name} -{stream.viewer_count} viewers
                  </h4>
                </Link>
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
