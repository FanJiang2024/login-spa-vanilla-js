import { store } from "../lib/state";

export const baseUrl = "https://localhost:3000";

export const request = async (path, method, payload) => {
  const headers = {};
  if (store.token) {
    headers.Authorization = store.token;
  }
  if (method === "POST") {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(baseUrl + path, {
      method,
      body: JSON.stringify(payload),
      headers,
    });
    if(!response) {
      return { msg: "响应体为空", code: 500 }
    }
    const data = await response.json();
    if(response.status != 200) {
      switch(response.status) {
        case 403: 
        case 429: {
          console.warn("status: ", response.status, "msg: ", data.msg);
          alert(data.msg);
        }
      }
    }
    const { code } = data;
    if (code == 200) {
      const token = response.headers.get("Authorization");
      if (!token) {
        console.warn("token is empty: ", token, path);
      }
      store.token = token;
    }
    return { data, response };
  } catch (err) {
    console.warn("request error: ", err);
    return err;
  }
};
