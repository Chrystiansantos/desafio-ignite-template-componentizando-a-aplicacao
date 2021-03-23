import { MovieCard } from "./MovieCard";

interface IGenres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface IContentProps {
  selectedGenre: IGenres,
  movies: MovieProps[]
}

export function Content({ movies, selectedGenre }: IContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:
          <span>
            {' '}
            Acao
            {selectedGenre.title}
          </span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}
