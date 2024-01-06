class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return new Promise.reject(`Error : ${res.status}`);
  }

  getItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // needs to protected with authorized bearer and token being passed as a parameter
  postItems({ name, weather, imageUrl }, token) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        weather: weather,
        imageUrl: imageUrl,
      }),
    }).then(this._checkResponse);
  }

  // needs to protected with authorized bearer and token being passed as a parameter

  deleteItems(id, token) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  updateProfile({ name, avatar }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then(this._checkResponse)
      .then((data) => data);
  }
  addCardLike(id, token) {
    return fetch(`${this._baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => data);
  }

  removeCardLike(id, token) {
    return fetch(`${this._baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => data);
  }
}

// const baseUrl = "http://localhost:3001";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "api.wtwr.lozan.com"
    : "http://localhost:3001";

//this probably isnt right and i need to review more on how to properly define the token for the class api

// still need to find a way to pass the token and pass the authorization Bearer

export const api = new Api({
  baseUrl: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// in the end i just decided to hardcode each of the requests that needed authorization bearer
// for the token.
// There has to be a better way to implement that into the class moving forward
// or when im done with the project

// authorizedHeaders: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// },

// localStorage.getItem("jwt")

export default Api;
