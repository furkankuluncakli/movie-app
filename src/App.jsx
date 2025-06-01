import "bootstrap-icons/font/bootstrap-icons.min.css";
import useMovies from "./hooks/useMovies";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavbarSearch from "./components/Navbar/NavbarSearch";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MyMovieList from "./components/SelectedMovies/MyMovieList";
import Summary from "./components/SelectedMovies/Summary";
import MovieDetails from "./components/Movies/MovieDetails";



const api_key = "c3a794a3386a1e9481790de74e0b3f75";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    total_results,
    nextPage,
    previousPage,
  } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (selectedMovie === id ? null : id));
  }

  function handleUnselectedMovie() {
    setSelectedMovie(null);
  }

  function handleAddToSelectedList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectedMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavbarSearch total_results={total_results} />
      </Nav>
      <Main>
        <ListContainer>
          {loading && <Loading />}
          {!loading && !error && (
            <>
              {movies.length > 0 && (
                <>
                  <MovieList
                    movies={movies}
                    onSelectedMovie={handleSelectedMovie}
                    selectedMovieStyle={selectedMovie}
                  />
                  <Pagination
                    nextPage={nextPage}
                    previousPage={previousPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </>
          )}
          {error && <ErrorMessage message={error} />}
        </ListContainer>
        <ListContainer>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onUnselectedMovie={handleUnselectedMovie}
              onAddSelectedMovie={handleAddToSelectedList}
              selectedMovies={selectedMovies}
            />
          ) : (
            <>
              <Summary selectedMovies={selectedMovies} />
              <MyMovieList
                selectedMovies={selectedMovies}
                onDeleteFromList={handleDeleteFromList}
              />
            </>
          )}
        </ListContainer>
      </Main>
    </>
  );
}
