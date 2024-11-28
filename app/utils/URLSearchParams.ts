//VIEJOS
// Function to create URLSearchParams from an object
export function createUrlSearchParams(params: Record<string, any>): URLSearchParams {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        urlParams.append(key, JSON.stringify(params[key]));
      }
    }
    return urlParams;
  }
  
  // Function to parse URLSearchParams into an object
  export function parseUrlSearchParams(urlParams: URLSearchParams): Record<string, any> {
    const params: Record<string, any> = {};
    urlParams.forEach((value, key) => {
      try {
        params[key] = JSON.parse(value);
      } catch (e) {
        params[key] = value;
      }
    });
    return params;
  }

  // Function to check if URLSearchParams are empty
  export function isUrlSearchParamsEmpty(urlParams: URLSearchParams): boolean {
    return !Array.from(urlParams.keys()).length;
  }

  //NUEVO

  // Function to convert an object with array properties to URLSearchParams
  export function objectToUrlSearchParams(obj: { menu: any[]; breadcrumb: any[]; filters: any; chipts: any[] }): URLSearchParams {
    const urlParams = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        urlParams.append(key, JSON.stringify(obj[key]));
      }
    }
    return urlParams;
  }

  // Function to convert URLSearchParams to an object with array properties
  export function urlSearchParamsToObject(urlParams: URLSearchParams): { menu: any[]; breadcrumb: any[]; filters: any; chipts: any[] } {
    const obj: { menu: any[]; breadcrumb: any[]; filters: any; chipts: any[] } = { menu: [], breadcrumb: [], filters: {}, chipts: [] };
    urlParams.forEach((value, key) => {
      try {
        obj[key] = JSON.parse(value);
      } catch (e) {
        obj[key] = key === 'filters' ? {} : [];
      }
    });
    return obj;
  }