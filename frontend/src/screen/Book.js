import { StatusButtons } from "components/Status-buttons";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "utils/books";
import { useListItem, useUpdateListItem } from "utils/list-items";
import bookPlaceholderSvg from "../assets/book-placeholder.svg";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hook";
import Rating from "components/Rating";
import debounceFn from "debounce-fn";
import { Spinner } from "components/lib";

const Book = () => {
  const { bookId } = useParams();

  const book = useBook(bookId);

  const listItem = useListItem(+bookId);

  const { title, author, coverImageUrl, publisher, synopsis } = book;

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
      {!book.loadingBook && listItem ? (
        <NotesTextarea listItem={listItem} />
      ) : null}
    </div>
  );
};

export default Book;

function NotesTextarea({ listItem }) {
  const [mutate, { error, isError, isLoading }] = useUpdateListItem();
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
  return (
    <>
      <div>
        <label>Notes</label>
        {isError ? <p>There is a problem</p> : null}
        {isLoading ? <Spinner /> : null}
        <textarea
          id="notes"
          defaultValue={listItem.notes}
          onChange={handleNotesChange}
          className="w-full min-h-[300px] border "
        />
      </div>
    </>
  );
}
