import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useUpdateListItem } from "utils/list-items";
const Rating = ({ listItem }) => {

  const [isTabbing, setIsTabbing] = React.useState(false);
  const [update, { error, isError }] = useUpdateListItem();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Tab") {
        setIsTabbing(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown, { once: true });
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const stars = Array.from({ length: 5 }).map((x, i) => {
    const ratingId = `rating-${listItem.id}-${i}`;
    const ratingValue = i + 1;
    return (
      <React.Fragment key={i}>
        <input
          type="radio"
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === listItem.rating}
          onChange={() => {
            update({ id: listItem.id, rating: ratingValue });
          }}
        />
        <label htmlFor={ratingId}>
          <span>
            {ratingValue} {ratingValue === 1 ? "star" : "stars"}
          </span>
          <FaStar />
        </label>
      </React.Fragment>
    );
  });

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <span className="flex">{stars}</span>
      {isError ? <p>Error</p> : null}
    </div>
  );
};

export default Rating;
