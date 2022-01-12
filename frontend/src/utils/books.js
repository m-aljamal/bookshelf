import { useQuery, queryCache } from "react-query";
import { client } from "./api-client";
import bookPlaceholderSvg from "assets/book-placeholder.svg";

const loadingBook = {
  title: "Loading...",
  author: "loading...",
  coverImageUrl: bookPlaceholderSvg,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const getBookSerchConfig = (query, user) => ({
  queryKey: ["bookSearch", { query }],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then((book) => book),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book);
      }
    },
  },
});

function useBookSearch(query, user) {
  const result = useQuery(getBookSerchConfig(query, user));

  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId, user) {
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      client(`books/${bookId}`, { token: user.token }).then((book) => book),
  });
  return data ?? loadingBook;
}

async function refetchBookSearchQuery(user) {
  queryCache.removeQueries(["bookSearch"]);
  await queryCache.prefetchQuery(getBookSerchConfig("", user));
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(["book", { bookId: book.id }], book);
}

export { useBookSearch, useBook, refetchBookSearchQuery, setQueryDataForBook };
