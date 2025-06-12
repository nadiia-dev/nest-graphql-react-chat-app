// graphql-upload.d.ts
import { RequestHandler } from 'express';

declare module 'graphql-upload' {
  export function graphqlUploadExpress(options?: any): RequestHandler;
}
