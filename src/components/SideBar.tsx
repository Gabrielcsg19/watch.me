import { memo } from 'react';

import { Button } from './Button';
import { GenreResponseProps } from '../interfaces';
import '../styles/sidebar.scss';

type SideBarProps = {
  selectedGenreId: number;
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
}

function SideBarComponent({ genres, handleClickButton, selectedGenreId }: SideBarProps) {
  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>
    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>
  )
}

export const SideBar = memo(SideBarComponent)