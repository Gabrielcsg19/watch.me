import { lazy, Suspense, useEffect, useState } from "react";

import { GenreResponseProps, MovieProps } from "../interfaces";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';
import { memo } from "react";
import { useCallback } from "react";

const Modal = lazy(() => import('./Modal'))


type ContentProps = {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
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

export function ContentComponent({ movies, selectedGenre }: ContentProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({} as ModalData);

  const openModal = useCallback((movieData: ModalData) => {
    setModalData(movieData)
    setIsOpen(true);
  }, [])

  const closeModal = useCallback(() => {
    setModalData(DEFAULT_MODAL_DATA)
    setIsOpen(false);
  }, [])
  
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

export const Content = memo(ContentComponent)