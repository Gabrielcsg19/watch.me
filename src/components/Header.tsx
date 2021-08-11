import { memo } from "react"

type HeaderProps = {
  selectedGenreTitle: string;
}

export function HeaderComponent({selectedGenreTitle}: HeaderProps) {
  return (
    <header>
      <span className="category">
        Category: <span>{selectedGenreTitle}</span>
      </span>
   </header>
  )
}

export const Header = memo(HeaderComponent)