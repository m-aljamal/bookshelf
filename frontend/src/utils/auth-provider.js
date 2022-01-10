import { client as clientAuth } from "./api-client";

const localStorageKey = "___auth_provider_token___";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

async function handleUserResponse({ token }) {
  window.localStorage.setItem(localStorageKey, token);
  let user = await currentUser(token);

  return user;
}

async function currentUser(token) {
  const user = await clientAuth("auth/me", { token });
  return { ...user, token };
}

async function login({ email, password }) {
  return await client("auth/login", { email, password }).then(
    handleUserResponse
  );
}

async function register({ name, email, password }) {
  return client("auth/signup", { name, email, password }).then(
    handleUserResponse
  );
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
export { getToken, login, register, logout, localStorageKey, currentUser };
