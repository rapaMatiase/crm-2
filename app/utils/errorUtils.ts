import { BackOfficeError } from "../type/cmsBackOffice";

export function createInternalError(
  process: string, 
  route: string, 
  response: Response
): BackOfficeError {
  return {
    process,
    route,
    timestamp: new Date(),
    response: {
      status: response.status.toString(),
      statusText: response.statusText,
      body: response.body?.message ? response.body.message : 'Sin mensaje especificado'
  }
  };
}