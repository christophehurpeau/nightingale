export default function getDebugString(): string {
  const querystring = document.location && document.location.search;
  const debugFromLocalStorage =
    (window.localStorage && localStorage.getItem('debug')) || '';

  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(
    querystring.replace(
      // eslint-disable-next-line unicorn/no-unsafe-regex
      new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'),
      '$1',
    ),
  );

  return (
    (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') +
    debugFromQueryString
  );
}
