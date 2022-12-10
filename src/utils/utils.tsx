import { CustomerType, SortedType } from "../api/types";
import { format, parse } from "date-fns";

export const stringToDate = (stringDate: string) => {
  if (stringDate === "") return new Date();
  const date = parse(stringDate, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  return !!date.getTime() ? date : new Date();
};

export const covertToDisplayDate = (stringDate: string) => {
  if (stringDate === "") return "";
  return format(stringToDate(stringDate), "MM/dd/yyyy HH:mm");
};

export const covertToPostDate = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

// Sort customer list base on the input type option.
export const sortListByType = (arr: CustomerType[], type: string) => {
  switch (type) {
    case SortedType.ascName:
      return sortedAscAlphabet(arr);
    case SortedType.descName:
      return sortedDescAlphabet(arr);
    case SortedType.ascDate:
      return sortedDescDate(arr);
    case SortedType.descDate:
      return sortedAscDate(arr);
    default:
      return sortedAscId(arr);
  }
};

export const sortedAscId = (arr: CustomerType[]) => {
  return arr.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
};

export const sortedAscAlphabet = (arr: CustomerType[]) => {
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
  return sortedAscAlphabet(arr).reverse();
};

export const sortedAscDate = (arr: CustomerType[]) => {
  return arr.sort((a, b) => {
    const dateA = stringToDate(a.createdDate);
    const dateB = stringToDate(b.createdDate);
    return Number(dateA) - Number(dateB);
  });
};

export const sortedDescDate = (arr: CustomerType[]) => {
  return sortedAscDate(arr).reverse();
};
