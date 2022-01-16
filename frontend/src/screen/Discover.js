import React, { useEffect, useState } from "react";

import { Spinner } from "components/lib";
import { FaSearch } from "react-icons/fa";

import BookRow from "components/BookRow";
import { useRefetchBookSearchQuery, useBookSearch } from "utils/books";

const DiscoverBookScreen = () => {
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);
  const { books, error, status } = useBookSearch(query);
  const refetchBookSearchQuery = useRefetchBookSearchQuery();

  useEffect(() => {
    return () => refetchBookSearchQuery();
  }, [refetchBookSearchQuery]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

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

      <div>
        {queried ? null : (
          <div>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <Spinner />
            ) : isSuccess && books.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !books.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
      </div>

      {isSuccess ? (
        books.length ? (
          <div className=" mt-2">
            {books.map((book) => (
              <div key={book.id} aria-label={book.title}>
                <BookRow book={book} />
              </div>
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
