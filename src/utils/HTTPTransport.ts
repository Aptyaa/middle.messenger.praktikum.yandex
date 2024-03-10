// export enum Method {
//   Get = 'Get',
//   Post = 'Post',
//   Put = 'Put',
//   Patch = 'Patch',
//   Delete = 'Delete',
// }

// type Options = {
//   method: Method;
//   data?: any;
// };

// type HTTPMethod = (
//   url: string,
//   data?: unknown,
//   isFile?: boolean,
// ) => Promise<XMLHttpRequest>;

// type HTTPRequest = (
//   url: string,
//   options: Options,
//   isFile: boolean,
// ) => Promise<XMLHttpRequest>;

// export default class HTTPTransport {
//   static API_URL = 'https://ya-praktikum.tech/api/v2';
//   protected endpoint: string;
//   constructor(endpoint: string) {
//     this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
//   }

//   public get(path = '/'): Promise<XMLHttpRequest> {
//     return this.request(this.endpoint + path);
//   }

//   // public get: HTTPMethod = (url, data) => {
//   //   if (data) {
//   //     return this.request(this.endpoint + url + queryStringify(data), {
//   //       method: Method.Get,
//   //     });
//   //   } else {
//   //     return this.request(this.endpoint + url, { method: Method.Get });
//   //   }
//   // };

//   public post<Response = void>(
//     path: string,
//     data?: unknown,
//   ): Promise<XMLHttpRequest> {
//     return this.request(this.endpoint + path, {
//       method: Method.Post,
//       data,
//     });
//   }

//   public put(
//     path: string,
//     data: unknown,
//     isFile = false,
//   ): Promise<XMLHttpRequest> {
//     return this.request(
//       this.endpoint + path,
//       {
//         method: Method.Put,
//         data,
//       },
//       isFile,
//     );
//   }

//   public patch(path: string, data: unknown): Promise<XMLHttpRequest> {
//     return this.request(this.endpoint + path, {
//       method: Method.Patch,
//       data,
//     });
//   }

//   public delete(path: string, data?: unknown): Promise<XMLHttpRequest> {
//     return this.request(this.endpoint + path, {
//       method: Method.Delete,
//       data,
//     });
//   }

//   // private request: HTTPRequest = (url, options = {method: Method.Get}, isFile=false) =>{
//   //     const {method, data} = options
//   //     return new Promise((resolve, reject)=>{
//   //       const xhr = new XMLHttpRequest()
//   //       xhr.open(method, url)

//   //       xhr.onload=()=>{
//   //         resolve(xhr)
//   //       }
//   //         xhr.onabort = reject;
//   //         xhr.onerror = reject;
//   //         xhr.ontimeout = reject;

//   //     })
//   // }

//   private request(
//     url: string,
//     options: Options = { method: Method.Get },
//     isFile = false,
//   ): Promise<XMLHttpRequest> {
//     const { method, data } = options;
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open(method, url);

//       xhr.onreadystatechange = e => {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//           if (xhr.status < 400) {
//             resolve(xhr);
//           } else {
//             reject(xhr);
//           }
//         }
//       };

//       xhr.onabort = () => reject({ reason: 'abort' });
//       xhr.onerror = () => reject({ reason: 'network error' });
//       xhr.ontimeout = () => reject({ reason: 'timeout' });

//       if (!isFile) {
//         xhr.setRequestHeader('Content-Type', 'application/json');
//       }
//       xhr.withCredentials = true;
//       xhr.responseType = 'json';

//       if (method === Method.Get || !data) {
//         xhr.send();
//       } else if (isFile) {
//         xhr.send(data);
//       } else {
//         xhr.send(JSON.stringify(data));
//       }
//     });
//   }
// }

// function queryStringify(data: any) {
//   let dataString = '?';
//   for (let key in data) {
//     if (dataString.endsWith('?')) dataString += `${key}=${data[key]}`;
//     else dataString += `&${key}=${data[key]}`;
//   }
//   return dataString;
// }

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface Options {
  method: METHODS;
  data?: any;
}

type HTTPMethod = (
  url: string,
  data?: unknown,
  isFile?: boolean,
) => Promise<XMLHttpRequest>;
type HTTPRequest = (
  url: string,
  option: Options,
  isFile?: boolean,
) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce(
    (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${e[1]}`,
    '',
  );
}

export default class HTTPTransport {
  endpoint: string;

  private API_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url, data) => {
    if (data) {
      return this.request(this.endpoint + url + queryStringify(data), {
        method: METHODS.GET,
      });
    } else {
      return this.request(this.endpoint + url, {
        method: METHODS.GET,
      });
    }
  };

  put: HTTPMethod = (url, data, isFile) => {
    return this.request(
      this.endpoint + url,
      {
        method: METHODS.PUT,
        data,
      },
      isFile,
    );
  };

  post: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {
      method: METHODS.POST,
      data,
    });
  };

  delete: HTTPMethod = (url, data) => {
    return this.request(this.endpoint + url, {
      method: METHODS.DELETE,
      data,
    });
  };

  request: HTTPRequest = (url, options, isFile = false) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (!isFile) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (isFile) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
