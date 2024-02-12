import { v4 as newUUID, validate } from 'uuid';

export const isIdValid = (id: string) => validate(id);
