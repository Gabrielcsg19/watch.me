type HeaderProps = {
  selectedGenreTitle: string;
}

export function Header({selectedGenreTitle}: HeaderProps) {
  return (
    <header>
      <span className="category">
        Category: <span>{selectedGenreTitle}</span>
      </span>
   </header>
  )
}