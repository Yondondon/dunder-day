export const getCookie = (cookieName: string): string =>  {
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
  return '';
}

export const eraseCookie = (name: string) => {
  document.cookie = `${name}=;max-age=0;`;
}

export const secondsToDate = (seconds: number): string => {
  const date = new Date(seconds);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const sortDunderList = (arr: any[], sortParam: string): any[] => {
  switch(sortParam) {
    case 'date':
      arr.sort((a: any, b: any) => {
        return b.created - a.created;
      });
      break;
    case 'heart':
      arr.sort((a: any, b: any) => {
        return b.reactions.heart - a.reactions.heart;
      });
      break;
    case 'poop':
      arr.sort((a: any, b: any) => {
        return b.reactions.poop - a.reactions.poop;
      });
      break;
    default:
      return arr;
  }
  return arr;
}