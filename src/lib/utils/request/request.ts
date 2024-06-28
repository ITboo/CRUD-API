import { IncomingMessage } from "http";
import { ControllerType, RouteType } from "../../../common/types/types";
import { RequestError } from "../../../common/constants";

type GetEndpointControllerType = (
  requestPathname: string,
  requestMethod: string | undefined,
  endpoints: RouteType[]
) => ControllerType | null;

export const getData = (req: IncomingMessage) => {
  const {
    url,
    method,
    headers: { host },
  } = req;

  const requestUrl = new URL(url ?? '', `http://${host ?? 'localhost'}`);
  const { pathname } = requestUrl;

  return {
    url,
    method,
    pathname,
  };
};

export const getEndpointController: GetEndpointControllerType = (
  requestPathname,
  requestMethod,
  endpoints
) => {
  const requestPathnameParts = requestPathname.slice(1).split('/');

  const endpoint = endpoints.filter(({ endpoint, method, endpointPathParts }) => {
    if (requestMethod !== method) return;
    if (endpointPathParts !== requestPathnameParts.length) return;
    if (
      requestPathnameParts.slice(0, endpoint.slice(1).split('/').length).join('/') !==
      endpoint.slice(1)
    )
      return;

    return true;
  });

  if (endpoint.length === 1) {
    const [{ controller }] = endpoint;
    return controller;
  }

  return null;
};

export const getBody: (req: IncomingMessage) => Promise<any> = async (req) => {
  try {
    const requestData: Buffer[] = [];
    for await (const chunk of req) requestData.push(chunk);
    return JSON.parse(Buffer.concat(requestData).toString());
  } catch {
    new RequestError();
  }
};

export const verifyBody = (requestBody: any) => {
  if (!requestBody) return null;

  if (!requestBody.username) return null;
  if (typeof requestBody.username !== 'string') return null;

  if (!requestBody.age) return null;
  if (typeof requestBody.age !== 'number') return null;

  if (!requestBody.hobbies) return null;
  if (!Array.isArray(requestBody.hobbies)) return null;
  if (requestBody.hobbies.some((hobby: unknown) => typeof hobby !== 'string')) return null;

  const { username, age, hobbies } = requestBody;
  return { username, age, hobbies };
};