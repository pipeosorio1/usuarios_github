import { API_SERVER_URL } from '@env';

class ApiServiceFetch {
  head_content: { 'Content-Type': string; 'X-Requested-With': string; };
  path: string;

  constructor() {
    this.path = API_SERVER_URL;
    this.head_content = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  async configOptions(method: string): Promise<RequestInit> {
    const headerApi = this.head_content;

    return {
      method,
      headers: headerApi,
      mode: 'cors',
    };
  }

  async procesarUrl(url: string) {
    if (!url) {
      throw new Error('La URL es requerida para este metodo');
    }

    return this.path + url;
  }

  async get({ url, data = {} }: { url: string; data?: any }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions('GET');
    const parametros = new URLSearchParams(data);
    const urlFinal = `${urlPath}?${parametros.toString()}`;

    return fetch(urlFinal, optionsFetch);
  }

  async post({ url, data = {} }: { url: string; data?: any }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions('POST');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async put({ url, data = {} }: { url: string; data?: any }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions('PUT');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async patch({ url, data = {} }: { url: string; data?: any }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions('PATCH');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async delete({ url, data = {} }: { url: string; data?: any }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions('DELETE');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }
}

export default new ApiServiceFetch();
