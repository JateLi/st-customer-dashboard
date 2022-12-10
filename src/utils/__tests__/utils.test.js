import { sortedAscAlphabet } from "../utils";

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
test("Sort list base on name of alphabet", () => {
  const sortedAscList = sortedAscAlphabet(MockItemList);
  expect(sortedAscAlphabet([])).toStrictEqual([]);
  expect(sortedAscList).toStrictEqual(ResultItemList);
});
