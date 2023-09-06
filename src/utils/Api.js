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

  postItems({ name, weather, imageUrl }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        weather: weather,
        imageUrl: imageUrl,
      }),
    }).then(this._checkResponse);
  }

  deleteItems(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
  }
}

export default Api;
