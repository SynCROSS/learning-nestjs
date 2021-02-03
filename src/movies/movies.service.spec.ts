import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies()', () => {
    it('should returns the array', () => {
      expect(service.getAllMovies()).toBeInstanceOf(Array);
    });
  });

  describe('searchMovieByTitle(title)', () => {
    it('should return Movie', () => {
      expect(service.searchMovieByTitle('title1').title).toEqual('title1');
    });
  });

  describe('getMovieById(id)', () => {
    it('should return Movie', () => {
      expect(service.getMovieById(1).id).toEqual(1);
    });

    it('should throws the 404 error', () => {
      try {
        service.getMovieById(404);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Movie matching that id 404 is not found`,
        );
      }
    });
  });

  describe('addMovie(MovieData)', () => {
    it('should return Movie', () => {
      expect(
        service.addMovie({
          title: 'title',
          description: 'description',
          year: 2021,
          genres: ['serneg'],
        }),
      ).toEqual({
        id: 4,
        title: 'title',
        description: 'description',
        year: 2021,
        genres: ['serneg'],
      });
    });
  });

  describe('updateMovieById(id, MovieData)', () => {
    it('should return Movie', () => {
      service.addMovie({
        title: 'title',
        description: 'description',
        year: 2021,
        genres: ['serneg'],
      });
      expect(
        service.updateMovieById(4, {
          title: 'title4',
          description: 'description4',
          year: 3,
        }),
      ).toEqual({
        id: 4,
        title: 'title4',
        description: 'description4',
        year: 3,
        genres: ['serneg'],
      });
    });
  });
  describe('removeMovieById(id)', () => {
    it('should return boolean', () => {
      service.addMovie({
        title: 'title',
        description: 'description',
        year: 2021,
        genres: ['serneg'],
      });
      expect(service.removeMovieById(4)).toBe(true);
    });
  });
});
