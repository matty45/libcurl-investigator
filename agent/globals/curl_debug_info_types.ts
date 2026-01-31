export enum curl_debug_infotypes {
  CURLINFO_TEXT = 0,
  CURLINFO_HEADER_IN,    /* 1 */
  CURLINFO_HEADER_OUT,   /* 2 */
  CURLINFO_DATA_IN,      /* 3 */
  CURLINFO_DATA_OUT,     /* 4 */
  CURLINFO_SSL_DATA_IN,  /* 5 */
  CURLINFO_SSL_DATA_OUT, /* 6 */
  CURLINFO_END
} ;