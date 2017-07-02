const baseURL = 'https://gaamitbe.herokuapp.com';
const oauthURL = 'http://oauth2.testmeapp.com';

const CLIENT_ID = 'watma01';
const CLIENT_SECRET = 'k7k654j5j34kk3e12n3ernf2dqwdhqwghfqewdtg';

const oauth = (response) => {

  let form = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  let content = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: form
  };

  // Request new Token
  if (response.status === 401) {
    return fetch(`${oauthURL}/oauth/access_token`, content)
    .then((response) => response.json())
    .then((responseJson) => {
      localStorage.setItem('access_token', responseJson.access_token);
      throw new Error(response.status);
    });
  }
  else if (response.ok) {
    return response;
  }
  else {
    throw new Error(response.status)
  }
}

const call = (method, params, content, successCallback, errCallback, tries=0) => {

  if (tries === 3) {
    errCallback('Too many follow up!');
    return;
  }

  content.headers['Authorization'] = localStorage.getItem('access_token');

  fetch(method(params), content)
    //.then(oauth)
    .then((response) => response.json())
    .then((responseJson) => {
      successCallback(responseJson);
    })
    .catch((error) => {
      if (error.message === '401') {
        call(method, params, content, successCallback, errCallback, tries+1);
      }
      else {
        errCallback(error);
      }
    });
}

module.exports = {

  // Call
  get: (method, params, successCallback, errCallback) => {

    let content = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      }
    };

    call(method, params, content, successCallback, errCallback);
  },

  post: (method, params, successCallback, errCallback) => {

    let content = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    };

    call(method, params, content, successCallback, errCallback);
  },

  put: (method, params, successCallback, errCallback) => {

    let content = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    };

    call(method, params, content, successCallback, errCallback);
  },

  delete: (method, params, successCallback, errCallback) => {

    let content = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    };

    call(method, params, content, successCallback, errCallback);
  },

  uploadFile: (method, params, successCallback, errCallback) => {

    let data = new FormData();
    data.append('picture', params.file);
    data.append('user_id', params.userID);

    let content = {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      body: data
    };

    call(method, params, content, successCallback, errCallback);
  },

  methods: {

    // GET
    userData: (params) => {
      return `${baseURL}/api/${params.lang}/user/id/${params.userID}`;
    },

    // POST
    login: () => {
      return `${baseURL}/login`;
    },

    settings: (params) => {
      return `${baseURL}/users/${params.id}`;
    }
  }
}
