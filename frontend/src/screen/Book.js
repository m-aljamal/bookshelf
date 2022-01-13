import { StatusButtons } from "components/Status-buttons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "utils/books";
import { useListItem, useUpdateListItem } from "utils/list-items";
import bookPlaceholderSvg from "../assets/book-placeholder.svg";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hook";
import Rating from "components/Rating";
import debounceFn from "debounce-fn";
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
  console.log(book);
  const listItem = useListItem(+bookId);

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
        <div className=" mt-5">
          {listItem ? (
            <p className=" text-red-500">
              <Rating listItem={listItem} />
            </p>
          ) : null}
        </div>
        <br />
        <p>{synopsis}</p>
        <div className="mt-2">
          <em className="text-blue-800">by: {author}</em>
        </div>
        <div>{book.loadingBook ? null : <StatusButtons book={book} />}</div>
      </div>
    </div>
  );
};

export default Book;

function NotesTextarea({ listItem }) {
  const { user } = useAuth();
  const [mutate, { error, isError, isLoading }] = useUpdateListItem(user);
  const debouncedMutate = useMemo(
    () => debounceFn(mutate, { wait: 300 }),
    [mutate]
  );

  function handleNotesChange(e) {
    debouncedMutate({
      id: listItem.id,
      notes: e.target.value,
    });
  }
}
