import { AiOutlineCloseCircle } from 'react-icons/ai'
import ReactModal from 'react-modal'

export interface ModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  modalData: {
    moviePoster: string;
    movieTitle: string;
    moviePlot: string;
    movieActors: string;
    movieAwards: string;
  }
}

ReactModal.setAppElement('#root');

export default function Modal({ modalIsOpen, modalData, closeModal }: ModalProps) {
  return (
    <ReactModal
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
  </ReactModal>
  )
}