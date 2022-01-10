import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import bookPlaceholderSvg from "../assets/book-placeholder.svg";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hook";
const lodaingBook = {
  title: "Loading...",
  author: "Loading...",
  coverImageUrl: bookPlaceholderSvg,
  publisher: "Loading...",
  synopsis: "Loading...",
  loadingBook: true,
};

const Book = () => {
  const { bookId } = useParams();
  const { user } = useAuth();

  const { data, run, error, isError } = useAsync();

  useEffect(() => {
    run(client(`books/${bookId}`, { token: user.token }));
  }, [run, bookId, user]);

  const { title, author, cover, publisher, synopsis } = data ?? lodaingBook;
  if (isError) {
    return (
      <div>
        <p>There is a problem</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <h1 className="my-10">{title}</h1>
          <img src={cover} />
        </div>
        <br />
        <p>{synopsis}</p>
      </div>
    </div>
  );
};

export default Book;
