import { StatusButtons } from "components/Status-buttons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "utils/books";
import { useListItem } from "utils/list-items";
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
  const book = useBook(bookId, user);
  const listItem = useListItem(bookId);
  // const { data, run, error, isError } = useAsync();

  // useEffect(() => {
  //   run(client(`books/${bookId}`, { token: user.token }));
  // }, [run, bookId, user]);

  const { title, author, coverImageUrl, publisher, synopsis } = book;

  // if (isError) {
  //   return (
  //     <div>
  //       <p>There is a problem</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div>
        <div>
          <h1 className="my-10 text-green-800">{title}</h1>
          <img src={coverImageUrl} />
        </div>
        <br />
        <p>{synopsis}</p>
        <div className="mt-2">
          <em className="text-blue-800">by: {author}</em>
        </div>
        {book.loadingBook ? null : <StatusButtons book={book} />}
      </div>
    </div>
  );
};

export default Book;
