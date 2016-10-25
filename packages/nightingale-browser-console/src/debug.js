/* global location, localStorage */

export default function getDebugString() {
  const querystring = location.search;
  let debugFromLocalStorage = (global.localStorage && localStorage.debug) || '';

  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(
    querystring.replace(
      new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'),
      '$1',
    ),
  );

  return (debugFromLocalStorage && `${debugFromLocalStorage},`) + debugFromQueryString;
}
