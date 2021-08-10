import { lazy, Suspense, useEffect, useState } from "react";

import { GenreResponseProps } from "../interfaces";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

const Modal = lazy(() => import('./Modal'))

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  Plot: string;
  Actors: string;
  Awards: string;
}

type ContentProps = {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}

type ModalData = {
  moviePoster: string;
  movieTitle: string;
  moviePlot: string;
  movieActors: string;
  movieAwards: string;
}

const DEFAULT_MODAL_DATA = {
  movieTitle: '',
  moviePoster: '',
  moviePlot: '',
  movieActors: '',
  movieAwards: ''
}

export function Content({selectedGenreId, selectedGenre}: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({} as ModalData);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre])

  function openModal(movieData: ModalData) {
    setModalData(movieData)
    setIsOpen(true);
  }

  function closeModal() {
    setModalData(DEFAULT_MODAL_DATA)
    setIsOpen(false);
  }
  
  return (
    <div className="container">
    <Header selectedGenreTitle={selectedGenre.title} />
    
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <div
            onClick={() => openModal({
              movieTitle: movie.Title,
              moviePoster: movie.Poster,
              moviePlot: movie.Plot,
              movieActors: movie.Actors,
              movieAwards: movie.Awards
            })}
            key={movie.imdbID}
            data-message="Button to open modal"
            className="movie-card"
            role="button"
          >
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <Suspense fallback={<div>Carregando...</div>}>
          <Modal
            modalIsOpen={modalIsOpen}
            modalData={modalData}
            closeModal={closeModal}
          />
        </Suspense>
      )}
    </main>
  </div>
  )
}