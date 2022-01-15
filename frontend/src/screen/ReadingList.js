import ListItemList from "components/ListItemList";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "context/auth-context";
const ReadingList = () => {
  const { user } = useAuth();
  return (
    <ListItemList
      user={user}
      filterListItem={(li) => !li.finishDate}
      noListItem={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to <Link to="/discover">the Discover page</Link> to add
          books to your list.
        </p>
      }
      noFilterListItem={
        <p>
          Looks like you've finished all your books! Check them out in your{" "}
          <Link to="/finished">finished books</Link> or{" "}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  );
};

export default ReadingList;
