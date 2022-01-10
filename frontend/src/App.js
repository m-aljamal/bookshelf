import UnAuthApp from "screen/UnAuthApp";
import AuthApp from "screen/AuthApp";
import { useAuth } from "context/auth-context";
function App() {
  const { user } = useAuth();

  return user ? <AuthApp /> : <UnAuthApp />;
}

export default App;
