export const getXFirstElementsFromArray = (array, quantity) => array
  .filter((_, index) => index < quantity);

export const translate = (string) => {
  switch (string) {
  case 'meals':
    return 'comidas';
  case 'comidas':
    return 'meals';
  case 'drinks':
    return 'bebidas';
  case 'bebidas':
    return 'drinks';
  default:
    return string;
  }
};

export const getFromStorage = (storageItem) => JSON
  .parse(localStorage.getItem(storageItem));

export const setToStorage = (storageItem, value) => localStorage
  .setItem(storageItem, JSON.stringify(value));
