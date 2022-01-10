import { useContext, useEffect } from "react";
import { useCallback, useMemo, createContext } from "react";
import { FullPageErrorFallback, Spinner } from "components/lib";
import { client } from "utils/api-client";
import * as auth from "utils/auth-provider";
import { useAsync } from "utils/hook";

async function bootstrapAppData() {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    user = await auth.currentUser(token);
  }
  return user;
}

const AuthContext = createContext(null);

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData,
    run,
  } = useAsync();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form) => auth.login(form).then((user) => setData(user)),
    [setData]
  );

  const register = useCallback(
    (form) => auth.register(form).then((user) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const value = useMemo(
    () => ({ user, login, logout, register }),
    [user, login, logout, register]
  );

  if (isLoading || isIdle) return <Spinner />;

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }
  throw new Error(`Unexpected status: ${status}`);
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;
  return useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
