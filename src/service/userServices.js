import endpoints from './baseUrl';

const userKey = 'user';

const setUser = (data) => {
  localStorage.setItem(userKey, JSON.stringify(data));
}

const getUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return JSON.parse(userStr);
  } catch (ex) {
    return null;
  }
}

const logIn = async (reqBody) => {
  const { data } = await fetch(endpoints.signIn, {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

const fetchUserDetails = async (userId) => {
  const { data } = await fetch(endpoints.userDetail + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

const modifyPrice = async ({ userId, songAmount }) => {
  const { data } = await fetch(endpoints.userDetail + userId, {
    method: 'PUT',
    body: JSON.stringify({ amount: songAmount } || {}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

export { setUser, getUser, logIn, fetchUserDetails, modifyPrice };
