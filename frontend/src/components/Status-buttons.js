import * as React from "react";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import { useAsync } from "utils/hook";
import { Spinner } from "./lib";
import {
  useCreateListItem,
  useListItem,
  useRemoveListItem,
} from "utils/list-items";
import { useUpdateListItem } from "utils/list-items";
import "@reach/tooltip/styles.css";

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  const { isLoading, isError, error, run, reset } = useAsync();

  function handleClick() {
    if (isError) {
      reset();
    } else {
      run(onClick());
    }
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <button
        className={`bg-white hover:${
          isLoading ? "bg-gray-500" : isError ? "text-red-500" : highlight
        }`}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </button>
    </Tooltip>
  );
}

function StatusButtons({ book }) {
  const listItem = useListItem(book.id);

  const [update] = useUpdateListItem({ throwOnError: true });
  const [remove] = useRemoveListItem({ throwOnError: true });
  const [create] = useCreateListItem({ throwOnError: true });

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight=" text-yellow-500"
            onClick={() => update({ id: listItem.id, finishDate: null })}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight=" text-green-500"
            onClick={() => update({ id: listItem.id, finishDate: new Date() })}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight=" text-red-500"
          onClick={() => remove({ id: listItem.id })}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight=" text-blue-500"
          onClick={() => create({ bookId: book.id })}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
}

export { StatusButtons };
