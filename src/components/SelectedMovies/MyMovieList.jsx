import MyListMovie from "./MyListMovie";

export default function MyMovieList({ selectedMovies, onDeleteFromList }) {
  return (
    <>
      {selectedMovies.map((selectedMovie) => (
        <MyListMovie
          selectedMovie={selectedMovie}
          key={selectedMovie.id}
          onDeleteFromList={onDeleteFromList}
        />
      ))}
    </>
  );
}
