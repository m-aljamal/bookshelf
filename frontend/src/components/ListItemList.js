import React from "react";
import { useListItems } from "utils/list-items";
import BookRow from "./BookRow";
const ListItemList = ({ filterListItem, noListItem, noFilterListItem }) => {
  const listItems = useListItems();
  const filterListItems = listItems.filter(filterListItem);

  if (!listItems.length) {
    return <div>{noListItem}</div>;
  }
  if (!filterListItems.length) {
    return <div>{noFilterListItem}</div>;
  }
  return (
    <div>
      {filterListItems.map((listItem) => (
        <li key={listItem.id}>
          <BookRow book={listItem.book} />
        </li>
      ))}
    </div>
  );
};

export default ListItemList;
