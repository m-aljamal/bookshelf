import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import DiscoverBookScreen from "screen/Discover";
import { FullPageErrorFallback } from "../components/lib";
import { useAuth } from "context/auth-context";
import Book from "./Book";
import NotFound from "./NotFound";
import FinishedBooks from "./FinishedBooks";
import ReadingList from "./ReadingList";

const AuthApp = () => {
  const { user, logout } = useAuth();
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className=" flex justify-end mr-8 mt-2 gap-4  ">
        {user.name}
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
      <div className=" mx-0 my-auto px-4 py-2 max-w-[840px] w-full  flex gap-4">
        <div className="relative ">
          <Nav />
        </div>
        <main className=" w-full">
          <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

function NavLink(props) {
  const match = useMatch(props.to);
  return (
    <Link
      {...props}
      className={`block p-2  my-2 w-full h-full text-gray-300 rounded-md ${
        match ? " border-l-2 border-blue-500 bg-gray-400 " : null
      }`}
    />
  );
}

function Nav() {
  return (
    <nav className=" sticky top-4 p-1 border border-gray-300 rounded-md">
      <ul>
        <li>
          <NavLink to="/reading-list">Reading List</NavLink>
          <NavLink to="/finished-books">Finished Books</NavLink>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverBookScreen />} />
      <Route path="/book/:bookId" element={<Book />} />
      <Route path="/finished-books" element={<FinishedBooks />} />
      <Route path="/reading-list" element={<ReadingList />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthApp;
