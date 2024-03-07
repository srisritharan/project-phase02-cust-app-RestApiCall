/** @format */

const baseURL = "http://localhost:4000/customers";

export async function getAll(setCustomers) {
  const myInit = {
    method: "GET",
    mode: "cors",
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  };
  fetchData(baseURL);
}

export async function post(formObject, refresh) {
  delete formObject.id;
  try {
    const myInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    };
    const response = await fetch(baseURL, myInit);

    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    const responseData = await response.json();
    refresh();
  } catch (error) {
    alert(error);
  }
}

export async function put(formObject, refresh) {
  const updateUrl = `${baseURL}/${formObject.id}`;
  try {
    const myInit = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    };
    const response = await fetch(updateUrl, myInit);

    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    const responseData = await response.json();
    refresh();
  } catch (error) {
    alert(error);
  }
}

export function deleteById(id, refresh) {
  const myInit = {
    method: "DELETE",
    mode: "cors",
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      refresh();
    } catch (error) {
      alert(error);
    }
  };
  const deleteUrl = `${baseURL}/${id}`;
  fetchData(deleteUrl);
}
