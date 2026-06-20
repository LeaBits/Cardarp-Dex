export type FormGroup = "mega" | "regional" | "gigantamax" | "battle" | "other";

export const formGroups: FormGroup[] = [
  "mega",
  "regional",
  "gigantamax",
  "battle",
  "other"
];

export function formatFormGroup(group: FormGroup): string {
  switch (group) {
    case "mega":
      return "Mega Evolutions";
    case "regional":
      return "Regional Forms";
    case "gigantamax":
      return "Gigantamax";
    case "battle":
      return "Battle Forms";
    case "other":
      return "Other Forms";
  }
}