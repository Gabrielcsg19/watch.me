import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal';

import { GenreResponseProps } from "../interfaces";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

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

Modal.setAppElement('#root');

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
            key={movie.imdbID} data-message="Button to open modal"
            className="movie-card"
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
    </main>

    <Modal
      isOpen={modalIsOpen}
      contentLabel="Movie Card"
      overlayClassName="Overlay"
      className="Modal"
    >
      <div className="modal-content">
        <div className="modal-poster-area">
          <img src={modalData.moviePoster} alt="Poster image" />
        </div>
        <div className="modal-content-area">
          <button onClick={closeModal} data-message="Button to close modal">
            <AiOutlineCloseCircle size={45} color="red" />
          </button>
          <h1>{modalData.movieTitle}</h1>
          <p>{modalData.moviePlot}</p>
          <span><strong>Actors: </strong>{modalData.movieActors}</span>
          <span><strong>Awards: </strong>{modalData.movieAwards}</span>
        </div>
      </div>
    </Modal>
  </div>
  )
}