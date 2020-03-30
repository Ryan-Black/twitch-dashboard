import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(
        'https://api.twitch.tv/helix/games/top?first=100'
      );

      let dataArray = res.data.data;
      let finalArray = dataArray.map(game => {
        let newURL = game.box_art_url
          .replace('{width}', '250')
          .replace('{height}', '350');
        game.box_art_url = newURL;
        return game;
      });
      setGames(finalArray);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-purple text-center">Browse Games</h1>
      <div className="row">
        {games.map(game => (
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-8 mt-4">
            <div className=" container d-flex flex-column">
              <Link
                className="link"
                to={{
                  pathname: 'game/' + game.name,
                  state: {
                    gameID: game.id
                  }
                }}
              >
                <img
                  className="game-img"
                  src={game.box_art_url}
                  alt="box-art-img"
                />
              </Link>
              <div className="game-text mt-2">
                <Link
                  className="link"
                  to={{
                    pathname: 'game/' + game.name,
                    state: {
                      gameID: game.id
                    }
                  }}
                >
                  <h5 className="text-center text-white">{game.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
