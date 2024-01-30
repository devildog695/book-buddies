const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

export const fetchAllBooks = async () => {
  try {
    const rsp = await fetch(`${API_URL}/books`);
    const json = await rsp.json();
    return json.books;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleBook = async (bookId) => {
  try {
    const rsp = await fetch(`${API_URL}/books/${bookId}`);
    const json = await rsp.json();
    return json.book;
  } catch (error) {
    console.log(error);
  }
};

export async function loginUser(userObj) {
  try {
    const rsp = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const json = await rsp.json();

    return json.token;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(userObj) {
  try {
    const rsp = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const json = await rsp.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(token) {
  try {
    const rsp = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await rsp.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export const getReservation = async (token) => {
  try {
    const rsp = await fetch(`${API_URL}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!rsp.ok) {
      throw new Error("Failed to fetch");
    }
    const json = await rsp.json();
    return json.reservations;
  } catch (err) {
    console.error(err);
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const fetch = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
    })
      .then((rsp) => rsp.json())
      .then((json) => {
        console.log(json);
      });
  } catch (err) {
    console.error(err);
  }
};

export async function checkoutBook(id, token) {
  try {
    const rsp = await fetch(`${API_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Typer": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await rsp.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}
