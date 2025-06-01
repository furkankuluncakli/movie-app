export default function Main({ children }) {
  return (
    <main className="container">
      <div className="row mt-2">
        <div className="col-md-9">{children[0]}</div>
        <div className="col-md-3">{children[1]}</div>
      </div>
    </main>
  );
}