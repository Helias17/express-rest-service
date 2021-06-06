import { Request } from 'express';

export const isEmptyObject = (obj: Request, type: 'body' | 'params' | 'query'): boolean => {
  if (obj[type] && Object.getOwnPropertyNames(obj[type]).length > 0) {
    return false;
  }
  return true;
}