import { FaSpinner } from "react-icons/fa";

const pagination = ({ page, setPage, loading }) => {
  return (
    <div className="text-2xl mb-4 flex">
      <span className="mr-4">
        Page: <span className="text-red-500 font-bold">{page}</span>
      </span>
      {page >= 3 && (
        <button
          onClick={() => setPage(1)}
          disabled={page <= 1}
          className="btn-primary"
        >
          Page 1
        </button>
      )}
      <button
        onClick={() => setPage((x) => x - 1)}
        disabled={page <= 1}
        className="btn-primary"
      >
        Prev
      </button>
      <button
        onClick={() => setPage((x) => x + 1)}
        disabled={page >= 500}
        className="btn-primary"
      >
        Next
      </button>
      {page < 500 && (
        <button
          onClick={() => setPage(500)}
          disabled={page >= 499}
          className="btn-primary"
        >
          Page 500
        </button>
      )}

      {loading && <FaSpinner className="animate-spin h-10 w-10 ml-4" />}
    </div>
  );
};

export default pagination;
