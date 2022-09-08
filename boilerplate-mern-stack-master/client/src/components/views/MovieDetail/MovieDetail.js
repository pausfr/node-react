import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../../commons/GridCards";
import { Row } from "antd";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState();
  const [Casts, setCasts] = useState();
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {Movie && (
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userId={localStorage.getItem("userId")}
            />
          )}
        </div>
        {/* Movie Info */}
        {Movie && <MovieInfo movie={Movie} />}
        <br />
        {/* Actors Grid */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    landingPage={false}
                    image={
                      movie.profile_path
                        ? `${IMAGE_BASE_URL}w500${movie.profile_path}`
                        : null
                    }
                    characterName={movie.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
