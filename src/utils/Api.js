export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._token = config.headers.authorization;
  }
  //Метод проверки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //GET-запрос на сервер для загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  //GET-запрос  на сервер для загрузки информации о пользователе
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  //PATCH-запрос на сервер для изменения данных профиля
  updateUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  //PATCH-запрос на сервер для смены аватара
  updateUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._checkResponse);
  }

  //POST-запрос на сервер для добавления новой карточки
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  //DELETE-запрос на сервер для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }
}

//Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e03190d5-8e78-4019-a57e-e50dca931db9',
    'Content-Type': 'application/json',
  },
});
export default api;
