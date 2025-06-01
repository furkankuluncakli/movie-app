export default function Pagination({
  nextPage,
  previousPage,
  currentPage,
  totalPages,
}) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li className={currentPage != 1 ? "page-item" : "page-item disabled"}>
          <a className="page-link" href="#" onClick={previousPage}>
            Geri
          </a>
        </li>
        <li
          className={
            currentPage < totalPages ? "page-item" : "page-item disabled"
          }
        >
          <a className="page-link" href="#" onClick={nextPage}>
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}
