import ListItemList from "components/ListItemList";
import React from "react";
import { useAuth } from "context/auth-context";
import { Link } from "react-router-dom";
const FinishedBooks = () => {
  const { user } = useAuth();
  return (
    <ListItemList
      user={user}
      filterListItem={(li) => Boolean(li.finishDate)}
      noListItem={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{" "}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      noFilterListItem={
        <p>
          Looks like you've got some reading to do! Check them out in your{" "}
          <Link to="/list">reading list</Link> or
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  );
};

export default FinishedBooks;
