import React from "react";
import { StatusButtons } from "./Status-buttons";
import { Link } from "react-router-dom";
import { useListItem } from "utils/list-items";
import Rating from "./Rating";
const BookRow = ({ book }) => {
  const { title, author, coverImageUrl, id, synopsis } = book;

  const listItem = useListItem(id);

  return (
    <div className=" bg-gray-100 my-5 p-2 rounded-sm hover:bg-gray-200 ">
      <div>
        <Link to={`/book/${id}`}>
          <div className="flex gap-4">
            <div>
              <img src={coverImageUrl} />
            </div>
            <div>
              <div className="flex justify-between">
                <p className=" text-blue-800">{title}</p>
                {listItem ? (
                  <p className=" text-red-500">
                    <Rating listItem={listItem}/>
                  </p>
                ) : null}
                <em>{author}</em>
              </div>
              <p>{synopsis}</p>
            </div>
          </div>
        </Link>
      </div>
      <StatusButtons book={book} />
    </div>
  );
};

export default BookRow;
