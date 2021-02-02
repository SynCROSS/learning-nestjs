import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
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
import { MovieDataDTO } from './dto/MovieData.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Get('search')
  searchMovieByTitle(@Query('title') title: string) {
    return this.moviesService.searchMovieByTitle(title);
  }

  @Get(':id')
  getMovieById(@Param('id') id: number): Movie {
    return this.moviesService.getMovieById(id);
  }

  @Post('add')
  addMovie(@Body() movieData: MovieDataDTO) {
    return this.moviesService.addMovie(movieData);
  }

  @Patch(':id')
  updateMovieById(
    @Param('id') id: number,
    @Body() movieData: Partial<MovieDataDTO>,
  ) {
    return this.moviesService.updateMovieById(id, movieData);
  }

  @Delete(':id')
  removeMovieById(@Param('id') id: number): boolean {
    return this.moviesService.removeMovieById(id);
  }
}
