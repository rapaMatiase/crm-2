export interface BackOfficeError {
    process: string;
    route: string;
    timestamp: Date;
    response : {status : String, statusText : String, body : String};
  }