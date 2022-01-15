// import { QueryClient} from "react-query";
import { ReactQueryConfigProvider } from "react-query/dist/react-query.development";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

function AppProviders({ children }) {
  
  const queryConfig = {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  };

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export { AppProviders };
