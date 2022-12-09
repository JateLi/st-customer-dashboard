import { CustomerType } from "../api/types";
import { format, parse } from "date-fns";

export const stringToDate = (stringDate: string) => {
  if (stringDate === "") return new Date();
  return parse(stringDate, "yyyy-MM-dd'T'HH:mm:ss", new Date());
};

export const covertToDisplayDate = (stringDate: string) => {
  if (stringDate === "") return "";
  return format(stringToDate(stringDate), "MM/dd/yyyy HH:mm");
};

export const sortListByType = (arr: CustomerType[], type: string) => {
  switch (type) {
    case "Name A-Z":
      return sortedAscAlphabet(arr);
    case "Name Z-A":
      return sortedDescAlphabet(arr);
    case "Newest":
      return sortedAscDate(arr);
    case "Oldest":
      return sortedDescDate(arr);
    default:
      return arr;
  }
};

export const sortedAscAlphabet = (arr: CustomerType[]) => {
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

export const sortedDescAlphabet = (arr: CustomerType[]) => {
  if (arr.length === 0) return [];
  return sortedAscAlphabet(arr).reverse();
};

export const sortedAscDate = (arr: CustomerType[]) => {
  if (arr.length === 0) return [];
  return arr.sort((a, b) => {
    const dateA = stringToDate(a.createdDate);
    const dateB = stringToDate(b.createdDate);
    return Number(dateA) - Number(dateB);
  });
};

export const sortedDescDate = (arr: CustomerType[]) => {
  if (arr.length === 0) return [];
  return sortedAscDate(arr).reverse();
};
