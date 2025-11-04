import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const X_API_KEY = environment.X_API_KEY;
  const JSON_API_CONTENT_TYPE = 'application/vnd.api+json';
  const JSON_CONTENT_TYPE = 'application/json';

  let contentType = JSON_API_CONTENT_TYPE;
  const isWriteRequest = req.method !== 'GET';
  if(req.method === 'PATCH'){
    contentType = JSON_CONTENT_TYPE
  }
  let newReq = req.clone({
    setHeaders: {
      'Content-Type': contentType
    }
  });
  if (isWriteRequest) {
    newReq = newReq.clone({
      headers: newReq.headers.append('X-API-KEY', X_API_KEY)
    });
  }
  return next(newReq);
}
