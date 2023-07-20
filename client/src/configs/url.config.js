
/**
 * Function returns the full server uri with the given sub-route.
 */
export const GET_SERVER_URL = suburl => `http://localhost:5000/${suburl}`


/**
 * Protected URIs. Only authenticated users can access the URIs in the array.
 */
export const PROTECTED_URIS = [
    '/favorites',
    '/auth-success',
]