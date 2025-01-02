import { BackOfficeError } from "../type/cmsBackOffice";

export function createInternalError(
  process: string, 
  route: string, 
  response: {status : String, statusText : String, body : String}
): BackOfficeError {
  return {
    process,
    route,
    timestamp: new Date(),
    response
  };
}