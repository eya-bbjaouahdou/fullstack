import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import {TMDB_BASE_URL , API_KEY }from "../utils/constants";
  import axios from "axios"; 

  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };

  export const getGenres = createAsyncThunk("movieflix/genres",async()=> {
    const {data : {genres}} = await axios.get
    (`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres ;
  });

  const createArrayFromRawData = (array, moviesArray, genres) => {
          array.forEach((movie) => {
          const movieGenres = [];
          movie.genre_ids.forEach((genre) => {
           const name = genres.find(({ id }) => id === genre);
           if(name) movieGenres.push(name.name);
          });
          if(movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            })
          }
          });
  };

  const getRawData = async (api,genres,paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {data: {results}, } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
        
      }
      return moviesArray;
  };

  export const fetchMovies = createAsyncThunk("movieflix/trending",async({type},thunkApi)=> {
    const { movieflix: { genres } ,
     } = thunkApi.getState();
    return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
     genres,
     true
    );
    
    }
  );
   //return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)export const fetchMovies = createAsyncThunk("movieflix/trending",async({type},thunkApi)=> {
    export const fetchDataByGenre = createAsyncThunk("movieflix/moviesByGenres",async({type},thunkApi)=> {
      const { movieflix: { genres } ,
       } = thunkApi.getState();
      const data = getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`,
       genres
      );
      console.log(data);
      return data ;
      }
    );

    export const getUsersLikedMovies = createAsyncThunk(
      "movieflix/getLiked",
      async (email) => {
        const {
          data: { movies },
        } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
        return movies;
      }
    );

   export const removeMovieFromLiked = createAsyncThunk(
    "movieflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
         email,
        movieId,
      });
      return movies;
    }
  );

  const MovieflixSlice = createSlice({
    name : "Movieflix",
    initialState,
    extraReducers:(builder)=> {
        builder.addCase(getGenres.fulfilled,(state,action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
    },
  });

  export const store = configureStore({
    reducer: {
        movieflix: MovieflixSlice.reducer,
    }
  })