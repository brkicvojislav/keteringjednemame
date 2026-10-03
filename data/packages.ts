export const packageProducts = [
  "Bavarski sendvičići",
  "Kiflice kulen–zdenka",
  "Rolat spanać",
  "Rolat ajvar",
  "Takitosi",
  "Pita sir",
  "Pita meso",
  "Mini pizze",
  "Prazne kiflice",
  "Kiflice šunka–sir",
  "Roštilj",
  "Ruska salata",
  "Kupus salata",
] as const;

export const cateringPackages = [
  {
    id: 1,
    guests: "20–30",
    price: "18.900",
    quantities: ["1 kg", "0,5 kg", "0,75 kg", "0,75 kg", "24 kom", "0,5 kg", "0,5 kg", "0,5 kg", "1 kg", "0,5 kg", "5 kg", "1,5 kg", "1 kg"],
  },
  {
    id: 2,
    guests: "30–40",
    price: "24.000",
    quantities: ["1,5 kg", "1 kg", "0,75 kg", "0,75 kg", "48 kom", "0,75 kg", "0,75 kg", "1 kg", "1 kg", "1 kg", "7 kg", "1 kg", "1 kg"],
  },
  {
    id: 3,
    guests: "40–50",
    price: "30.000",
    quantities: ["2 kg", "1,5 kg", "1 kg", "1 kg", "48 kom", "1 kg", "1 kg", "1,5 kg", "1,5 kg", "1,5 kg", "9 kg", "1,5 kg", "1,5 kg"],
  },
  {
    id: 4,
    guests: "50–60",
    price: "37.600",
    quantities: ["2,5 kg", "2 kg", "1,5 kg", "1,5 kg", "72 kom", "1,5 kg", "1,5 kg", "1,5 kg", "1,5 kg", "1,5 kg", "10 kg", "2 kg", "2 kg"],
  },
] as const;
