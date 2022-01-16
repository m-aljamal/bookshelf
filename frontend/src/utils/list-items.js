import { useQuery, useMutation, queryCache } from "react-query";
import { setQueryDataForBook } from "./books";
import { useClient } from "context/auth-context";
function useListItems() {
  const client = useClient();
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () => client("list-items/user").then((listItems) => listItems),
    config: {
      onSuccess: (listItems) => {
        for (const listItme of listItems) {
          setQueryDataForBook(listItme.book);
        }
      },
    },
  });
  return listItems ?? [];
}

function useListItem(bookId) {
  const listItems = useListItems();

  return listItems.find((listItem) => listItem.book.id === bookId) ?? null;
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function useUpdateListItem(...options) {
  const client = useClient();
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
      }),
    {
      onMutate(newItem) {
        const previousItmes = queryCache.getQueryData("list-items");
        queryCache.setQueryData("list-items", (old) => {
          return old.map((item) => {
            return item.id === newItem.id ? { ...item, ...newItem } : item;
          });
        });
        return () => queryCache.setQueryData("list-items", previousItmes);
      },
      ...defaultMutationOptions,
      ...options,
    }
  );
}

function useRemoveListItem(options) {
  const client = useClient();
  return useMutation(
    ({ id }) => client(`list-items/${id}`, { method: "DELETE" }),
    {
      onMutate(removeItem) {
        const previousItems = queryCache.getQueryData("list-items");
        queryCache.setQueryData("list-items", (old) => {
          return old.filter((item) => item.id !== removeItem.id);
        });
        return () => queryCache.setQueryData("list-items", previousItems);
      },
      ...defaultMutationOptions,
      ...options,
    }
  );
}

function useCreateListItem(options) {
  const client = useClient();
  return useMutation(
    ({ bookId }) => client(`list-items`, { data: { bookId } }),
    { ...defaultMutationOptions, ...options }
  );
}

export {
  useListItems,
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
};
