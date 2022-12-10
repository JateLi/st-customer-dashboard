import { sortedAscAlphabet, sortedDescAlphabet } from "../utils";

const MockItemList = [
  { name: "b" },
  { name: "z" },
  { name: "a" },
  { name: "t" },
  { name: "c" },
];
const ResultItemList = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "t" },
  { name: "z" },
];
test("Sort list base on name of Asc alphabet", () => {
  const sortedAscList = sortedAscAlphabet(MockItemList);
  expect(sortedAscAlphabet([])).toStrictEqual([]);
  expect(sortedAscList).toStrictEqual(ResultItemList);
});

test("Sort list base on name of desc alphabet", () => {
  const sortedAscList = sortedDescAlphabet(MockItemList);
  expect(sortedDescAlphabet([])).toStrictEqual([]);
  expect(sortedAscList).toStrictEqual(ResultItemList.reverse());
});
