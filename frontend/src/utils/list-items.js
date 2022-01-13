import { useQuery, useMutation, queryCache } from "react-query";
import { client } from "./api-client";
import { setQueryDataForBook } from "./books";
import { useAuth } from "context/auth-context";
function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client("list-items/user", { token: user.token }).then(
        (listItems) => listItems
      ),
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
  const { user } = useAuth();

  const listItems = useListItems(user);

  return listItems.find((listItem) => listItem.book.id === bookId) ?? null;
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function useUpdateListItem(user, ...options) {
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
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

function useRemoveListItem(user, options) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
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

function useCreateListItem(user, options) {
  return useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
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
