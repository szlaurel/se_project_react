export const BASE_URL = "http://localhost:3001";

// sign up
export const register = (name, link, email, password) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, email, password }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json;
      }
    })
    .then((res) => {
      //return the parsed data to the client
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};

// sign in
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// get token
export const getContent = () => {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                      the useEffect statement goes here                     */
/* -------------------------------------------------------------------------- */
