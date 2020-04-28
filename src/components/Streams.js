import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Streams({ match, location }) {
  const [channels, setChannels] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    //connects to the twitch api
    const fetchData = async () => {
      //returns the 100 most viewed streams on the site
      const result = await api.get(
        'https://api.twitch.tv/helix/streams?first=100'
      );
      //stores data from api request
      let dataArray = result.data.data;
      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });

      let baseURL = 'https://api.twitch.tv/helix/games?';
      let queryParams = '';
      gameIDs.map((id) => {
        return (queryParams = queryParams + `id=${id}&`);
      });

      let finalURL = baseURL + queryParams;
      let gameNames = await api.get(finalURL);
      let gameNameArray = gameNames.data.data;

      //gets the game name for each of the top viewed streams
      let finalArray = dataArray.map((stream) => {
        stream.gameName = '';
        gameNameArray.map((name) => {
          if (stream.game_id === name.id) {
            return (stream.gameName = name.name);
          }
        });

        //changes the dimensions of the thumbnail for each stream
        let newURL = stream.thumbnail_url
          .replace('{width}', '500')
          .replace('{height}', '250');
        stream.thumbnail_url = newURL;
        return stream;
      });

      //adds up the viewers for each stream to get a total
      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      setViewers(totalViewers);
      setChannels(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-purple">Top Viewed Streams</h1>
      <h3 className="text-center text-white">
        <strong className="text-purple">{viewers}</strong> Viewers
      </h3>
      <div className="row">
        {channels.map((stream) => (
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-4">
            <div className="container d-flex flex-column overflow-hidden">
              <Link
                className="link"
                to={{
                  pathname: 'top-streams/stream/' + stream.user_name,
                  state: {
                    streamID: stream.user_id,
                  },
                }}
              >
                <img
                  className="stream-img"
                  src={stream.thumbnail_url}
                  alt="stream_thumbnail"
                />
                <div className="stream-overlay text-center">
                  <div className="stream-overlay-items">
                    <p>{stream.viewer_count} viewers</p>
                  </div>
                </div>
              </Link>
              <div className="stream-text">
                <Link
                  className="link"
                  to={{
                    pathname: 'top-streams/stream/' + stream.user_name,
                    state: {
                      streamID: stream.user_id,
                    },
                  }}
                >
                  <h4 className="text-center text-white mt-2">
                    {stream.user_name}
                  </h4>
                </Link>
                <Link
                  className="link"
                  to={{
                    pathname: 'game/' + stream.gameName,
                    state: {
                      gameID: stream.game_id,
                    },
                  }}
                >
                  <h6 className="text-center text-purple">
                    {' '}
                    {stream.gameName}
                  </h6>
                </Link>
                <h6 className="text-white">{stream.title} </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streams;
