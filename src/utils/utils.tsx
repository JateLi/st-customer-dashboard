import { CustomerType } from "../api/types";

export const sortListByAlphabet = (arr: CustomerType[]) => {
  if (arr.length === 0) return [];
  return arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const sortListByDate = (arr: CustomerType[]) => {
  if (arr.length === 0) return [];
  //TODO sort by customer created date
};
