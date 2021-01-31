import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

interface MovieData {
  title: string;
  description: string;
}
@Controller('movies')
export class MoviesController {
  movies = [
    {
      id: 1,
      title: 'title1',
      description: 'description1',
    },
    {
      id: 2,
      title: 'title2',
      description: 'description2',
    },
    {
      id: 3,
      title: 'title3',
      description: 'description3',
    },
  ];

  @Get()
  getAllMovies() {
    return this.movies;
  }

  // * Why It put this on top of get(':id') is
  // * because all get methods under get(:id) are
  // * recognized as get(:id) methods.
  // * This Problem occurs when using express.js
  @Get('search')
  searchMovieByTitle(@Query('title') title: string) {
    const filteredMovie = this.movies.filter(movie => title === movie.title);

    return filteredMovie;
  }

  @Get(':id')
  getMovieById(@Param('id') id: number) {
    return this.movies[+id - 1];
  }

  @Post('add')
  addMovie(@Body() movieData: MovieData) {
    for (const movie of this.movies) {
      if (movieData.title === movie.title) {
        return null;
      }
    }

    const newMovie = {
      id: this.movies.length + 1,
      title: movieData.title,
      description: movieData.description,
    };

    this.movies.push(newMovie);

    return newMovie;
  }

  @Patch(':id')
  updateMovieById(@Param('id') id: number, @Body() movieData?: MovieData) {
    this.movies[+id - 1] = {
      id,
      title: movieData.title,
      description: movieData.description,
    };

    return this.movies;
  }

  @Delete(':id')
  removeMovieById(@Param('id') id: number): boolean {
    const filteredMovies = this.movies.filter(movie => +id !== movie.id);

    if (this.movies.length > filteredMovies.length) {
      this.movies = filteredMovies;
      return true;
    }
    return false;
  }
}
