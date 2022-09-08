import React, { useEffect, useState } from "react";
import { Typography, Popover, Button } from "antd";
import Axios from "axios";
import "./favorite.css";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fecthFavoredMovie();
  }, []);

  const fecthFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorites(response.data.favorites);
      } else {
        alert("영화 정보 가져오기 실패");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fecthFavoredMovie();
        } else {
          alert("리스트에서 지우는 데 실패했습니다");
        }
      }
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          <></>
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieReleaseDate}</td>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> Favorite Movies By Me </h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Release</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
