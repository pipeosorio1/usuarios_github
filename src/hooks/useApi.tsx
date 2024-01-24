import { useMemo } from 'react';
import { ApiServiceFetch } from 'services';

function useApi() {
  const doRequest = async (type, data, returnJson = true) => {
    let initialResponse = null;
    switch (type) {
      case 'post':
        initialResponse = await ApiServiceFetch.post(data);
        break;
      case 'put':
        initialResponse = await ApiServiceFetch.put(data);
        break;
      case 'patch':
        initialResponse = await ApiServiceFetch.patch(data);
        break;
      case 'delete':
        initialResponse = await ApiServiceFetch.delete(data);
        break;
      default:
        initialResponse = await ApiServiceFetch.get(data);
        break;
    }

    if (returnJson) {
      const json = await initialResponse.json();

      if (initialResponse.ok) {
        if (initialResponse.status === 204) {
          return null;
        }
        return json;
      }

      throw new Error(json.message);
    } else {
      return initialResponse;
    }
  };

  const doGet = async (data, returnJson = true) => doRequest('get', data, returnJson);

  const doPost = async (data) => doRequest('post', data);

  const doDelete = async (data) => doRequest('delete', data);

  const doPut = async (data) => doRequest('put', data);

  const doPostFormData = async (data) => doRequest('formdata', data);

  const doPatch = async (data) => doRequest('patch', data);

  return useMemo(() => ({
    doGet, doPost, doDelete, doPut, doPatch, doPostFormData,
  }));
}

export default useApi;
