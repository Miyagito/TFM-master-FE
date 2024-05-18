import { atom } from "recoil";

export const lawsState = atom({
  key: "lawsState",
  default: [],
});

export const scrapedLawsState = atom({
  key: "scrapedLawsState",
  default: null,
});
