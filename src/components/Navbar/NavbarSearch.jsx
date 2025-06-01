export default function NavbarSearch({ total_results }) {
  return (
    <>
      {total_results >= 1 ? (
        <div className="col-4 text-end">
          <strong>{total_results}</strong> kayıt bulundu
        </div>
      ) : null}
    </>
  );
}