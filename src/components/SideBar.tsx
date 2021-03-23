import { Button } from "./Button";

interface IGenres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISideBarProps {
  genres: IGenres[],
  selectedGenreId: number,
  handleClickButton: (id: number) => void
}

export function SideBar({ genres, selectedGenreId, handleClickButton }: ISideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch
        <p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
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
  );
}
