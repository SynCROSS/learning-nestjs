import { Controller, Get, Param } from '@nestjs/common';

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

  @Get('/:id')
  getMovieById(@Param('id') id: number) {
    return this.movies[id - 1];
  }
}
