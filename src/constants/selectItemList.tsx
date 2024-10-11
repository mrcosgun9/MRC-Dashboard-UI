export const genderItems = [
  { label: "I am ...", value: "", disabled: true, selected: true },
  { label: "I am boys", value: "1", disabled: false, selected: false },
  { label: "I am girls", value: "2", disabled: false, selected: false },
  { label: "I am gay", value: "3", disabled: false, selected: false },
];
export const sexualOrientationItems = [
  { label: "I wanna meet ...", value: "", disabled: true, selected: true },
  { label: "I wanna meet boys", value: "1", disabled: false, selected: false },
  { label: "I wanna meet girls", value: "2", disabled: false, selected: false },
  { label: "I wanna meet gay", value: "3", disabled: false, selected: false },
]
export const dayItems = Array.from({ length: 30 }, (_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
  disabled: false,
  selected: false,
}));
dayItems.unshift({ label: "Day", value: "", disabled: true, selected: true });

export const monthItems = [
  { label: "Month", value: "", disabled: true, selected: true },
  { label: "January", value: "1", disabled: false, selected: false },
  { label: "February", value: "2", disabled: false, selected: false },
  { label: "March", value: "3", disabled: false, selected: false },
  { label: "April", value: "4", disabled: false, selected: false },
  { label: "May", value: "5", disabled: false, selected: false },
  { label: "June", value: "6", disabled: false, selected: false },
  { label: "July", value: "7", disabled: false, selected: false },
  { label: "August", value: "8", disabled: false, selected: false },
  { label: "September", value: "9", disabled: false, selected: false },
  { label: "October", value: "10", disabled: false, selected: false },
  { label: "November", value: "11", disabled: false, selected: false },
  { label: "December", value: "12", disabled: false, selected: false },
]

export const yearItems = Array.from({ length: 80 }, (_, index) => ({
  label: (new Date().getFullYear() - 18 - index).toString(),
  value: (new Date().getFullYear() - 18 - index).toString(),
  disabled: false,
  selected: false,
}));
yearItems.unshift({ label: "Year", value: "", disabled: true, selected: true });
export const relationshipItems = [
  { label: "Please choose an answer", value: "", disabled: true, selected: true },
  { label: "Single", value: "1", disabled: false, selected: false },
  { label: "Taken", value: "2", disabled: false, selected: false }
];
export const isSmokeItems = [
  { label: "Please choose an answer", value: "", disabled: true, selected: true },
  { label: "Yes", value: "true", disabled: false, selected: false },
  { label: "No", value: "false", disabled: false, selected: false }
];
export const ethnicityItems = [
  { label: "Please choose an answer", value: "", disabled: true, selected: true },
  { label: "Asian", value: "1", disabled: false, selected: false },
  { label: "Black", value: "2", disabled: false, selected: false },
  { label: "White", value: "3", disabled: false, selected: false },
  { label: "Native American", value: "4", disabled: false, selected: false },
  { label: "Hispanic / Latin", value: "5", disabled: false, selected: false },
  { label: "Indian", value: "6", disabled: false, selected: false }
];
export const bodyTypeItems = [
  { label: "Please choose an answer", value: "", disabled: true, selected: true },
  { label: "Slim", value: "1", disabled: false, selected: false },
  { label: "Athletic", value: "2", disabled: false, selected: false },
  { label: "Curvy", value: "3", disabled: false, selected: false },
  { label: "Heavy", value: "4", disabled: false, selected: false },
];

export const userTypeItems = [
  { label: "Please choose an answer", value: "", disabled: true, selected: true },
  { label: "Slim", value: "1", disabled: false, selected: false },
  { label: "Athletic", value: "2", disabled: false, selected: false },
  { label: "Curvy", value: "3", disabled: false, selected: false },
  { label: "Heavy", value: "4", disabled: false, selected: false },
];
