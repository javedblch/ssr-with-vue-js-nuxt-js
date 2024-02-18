// plugins/axios.js

export default function ({ $axios }) {
  // Set baseURL (optional, if not set in axios module configuration)
  $axios.setBaseURL('http://localhost:3000');

  // Set headers (optional)
  $axios.setHeader('Content-Type', 'application/json');

  // Add request interceptor
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  });

  // Add response interceptor
  $axios.onResponse(response => {
    console.log('Response received from ' + response.config.url);
  });

  // Add error interceptor
  $axios.onError(error => {
    console.error('Error response:', error.response);
  });
}
