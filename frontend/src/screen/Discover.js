import React, { useEffect, useState } from "react";
import { client } from "utils/api-client";
import { Spinner } from "components/lib";
import { FaSearch } from "react-icons/fa";
import { useAsync } from "utils/hook";
import { Link } from "react-router-dom";
import { StatusButtons } from "../components/Status-buttons";
import { useAuth } from "context/auth-context";

const DiscoverBookScreen = () => {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);
  useEffect(() => {
    if (!queried) return;

    run(client(`books?query=${encodeURIComponent(query)}`));
  }, [query, queried, run]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueried(true);

    setQuery(e.target.elements.search.value);
  };

  return (
    <div className=" max-w-[800px] m-auto w-[90vw] py-[40px] px-0">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books..."
          id="search"
          className=" outline-none w-full bg-gray-200 p-1 rounded-sm focus:ring-2 "
        />
        <label htmlFor="search">
          <button className=" border-0 relative ml-[-35px] bg-transparent">
            {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
          </button>
        </label>
      </form>

      {isError ? (
        <div>
          <p>There was an error</p>
          <pre>{error}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data.length ? (
          <div className=" mt-2">
            {data.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id}>
                <div
                  key={book.id}
                  className=" bg-gray-100 my-5 p-2 rounded-sm hover:bg-gray-200 "
                >
                  <div className="flex gap-4">
                    <div>
                      <img src={book.coverImageUrl} />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <p className=" text-blue-800">{book.title}</p>
                        <em>{book.author}</em>
                      </div>
                      <p>{book.synopsis}</p>
                    </div>
                    <StatusButtons book={book} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No books found. Try another search</p>
        )
      ) : null}
    </div>
  );
};

export default DiscoverBookScreen;
