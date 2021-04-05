const apiAction = (method = "post") => (type, url, body = {}, withToken = false, async = true) => ({
   type,
   meta: {
      body,
      method,
      async,
      withToken,
      path: url
   }
});

export const defaultAction = (type, payload = {}) => ({
   type,
   payload
});

export default apiAction;
