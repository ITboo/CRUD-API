import { validate } from 'uuid';

export const isIdValid = (id: string) => validate(id);
