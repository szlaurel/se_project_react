export const BASE_URL = "http://localhost:3001";

// /signup
export const register = ({ name, link, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar: link, email, password }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
    })
    .then((res) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          link: link,
          email: email,
          password: password,
        })
      );
      //return the parsed data to the client
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};

// /signin
// for the signin request i removed the headers
// heres the code for the headers if it needs to go back to the request VVV
// headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// },

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.token);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      } else {
        return;
      }

      // console.log(res);
      // return res;
      // the "jwt" is the data.token
      // the two parameters for localStorage is as followed
      // 1 is the "key"
      // 2 is the "value" of the key
      // in order to retrieve something from "localStorage"
      // you would need to do "localStorage.getItem("jwt")"
      // because "jwt" is the key in this case
    })
    .catch((e) => {
      console.log(e);
    });
};

// get token
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
};

/* -------------------------------------------------------------------------- */
/*                            Edit profile api call                           */
/* -------------------------------------------------------------------------- */

export const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
};
/* -------------------------------------------------------------------------- */
/*                      the useEffect statement goes here                     */
/* -------------------------------------------------------------------------- */
