import { ALPHABETS_REGEX, EMAIL_REGEX, URL_REGEX } from '../constants/index.js';

export const checkIfFieldExist = (data) => !!data;

export const checkAtleastThreeCharacterCount = (data) => data.length > 3;

export const checkEmailIdFormat = (email) => EMAIL_REGEX.test(email);

export const checkUrlFormat = (data) => URL_REGEX.test(data);

export const checkOnlyAphabets = (data) => ALPHABETS_REGEX.test(data);
