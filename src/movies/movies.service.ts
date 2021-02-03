import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieDataDTO } from './dto/MovieData.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'title1',
      description: 'description1',
      year: 0,
      genres: ['g', 'e', 'n', 'r', 'e', 's'],
    },
    {
      id: 2,
      title: 'title2',
      description: 'description2',
      year: 1,
      genres: ['gen', 'res'],
    },
    {
      id: 3,
      title: 'title3',
      description: 'description3',
      year: 2,
      genres: ['genres'],
    },
  ];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  searchMovieByTitle(title: string): Movie {
    const movie = this.movies.find(movie => title === movie.title);
    return this.getMovieById(movie?.id ?? NaN);
  }

  getMovieById(id: number): Movie {
    const movie = this.movies[id - 1];

    if (!movie) {
      throw new NotFoundException(`Movie matching that id ${id} is not found`);
    }
    return movie;
  }

  addMovie(movieData: MovieDataDTO): Movie {
    for (const movie of this.movies) {
      if (movieData.title === movie.title) {
        return null;
      }
    }

    const newMovie: Movie = {
      id: this.movies.length + 1,
      title: movieData.title,
      description: movieData.description ?? '',
      year: movieData.year,
      genres: movieData.genres ?? [''],
    };

    this.movies.push(newMovie);

    return newMovie;
  }

  updateMovieById(id: number, movieData: Partial<MovieDataDTO>): Movie {
    const originalMovie = this.getMovieById(id);

    const updatedMovie: Movie = (this.movies[id - 1] = {
      id,
      title: movieData.title ?? originalMovie.title,
      description: movieData.description ?? originalMovie.description,
      year: movieData.year ?? originalMovie.year,
      genres: movieData.genres ?? originalMovie.genres,
    });

    return updatedMovie;
  }

  removeMovieById(id: number): boolean {
    this.getMovieById(id);

    const filteredMovies = this.movies.filter(movie => id !== movie.id);

    if (this.movies.length > filteredMovies.length) {
      this.movies = filteredMovies;
      return true;
    }
    return false;
  }
}
