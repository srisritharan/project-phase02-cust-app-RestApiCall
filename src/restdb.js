/** @format */

const items = [
  {
    id: 0,
    name: "Mike Johnsons",
    email: "mikej@abc.com",
    password: "mikej",
  },
  {
    name: "Cindy Smiths",
    email: "cinds@abc.com",
    password: "cinds",
    id: 1,
  },
  {
    name: "Julio Martins",
    email: "julim@abc.com",
    password: "julim",
    id: 2,
  },
];

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
      method: "Post",
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

// export function deleteById(id) {
//   let arrayIndex = getArrayIndexForId(id);
//   if (arrayIndex >= 0 && arrayIndex < items.length) {
//     items.splice(arrayIndex, 1);
//   }
// }

// export function post(item) {
//   let nextid = getNextId();
//   item.id = nextid;
//   items[items.length] = item;
// }

export function put(id, item) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i] = item;
      return;
    }
  }
}

function getArrayIndexForId(id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }
  return -1;
}

function getNextId() {
  let maxid = 0;
  for (let item of items) {
    maxid = item.id > maxid ? item.id : maxid;
  }
  return maxid + 1;
}
