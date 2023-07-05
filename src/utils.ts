export const getCookie = (cookieName: string): string | null =>  {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookiesArr = decodedCookie.split(';');
  for(let i = 0; i < cookiesArr.length; i++) {
    let cookieItem = cookiesArr[i];
    while (cookieItem.charAt(0) === ' ') {
      cookieItem = cookieItem.substring(1);
    }
    if (cookieItem.indexOf(name) === 0) {
      return cookieItem.substring(name.length, cookieItem.length);
    }
  }
  return null;
}