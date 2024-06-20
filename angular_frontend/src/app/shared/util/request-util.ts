import { HttpParams } from '@angular/common/http';
export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (req[key] instanceof Array) {
        req[key].forEach(item => {
          options =  options.append(key, item);
        });
      } else {
        options = options.set(key, req[key]);
      }
    });
  }
  return options;
};

