import type { MenuItem } from "@/lib/types";

export const MENU_CATEGORIES = [
  "Sve",
  "Kifle i peciva",
  "Rolati",
  "Mini pice",
  "Bavarske kifle",
  "Takitosi",
  "Slani kolači",
  "Slatko",
] as const;

export const menuItems: MenuItem[] = [
  {
    id: "kifla-klasik",
    name: "Domaća kifla",
    description: "Mekana, puterasta kifla pečena ujutro — klasičan ukus koji svi pamte.",
    category: "Kifle i peciva",
    minQuantity: 20,
    pricePerPiece: 45,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "kifla-sir",
    name: "Kifla sa sirom",
    description: "Hrskava spolja, kremasti sir unutra. Omiljena za doručak i poslovne sastanke.",
    category: "Kifle i peciva",
    minQuantity: 20,
    pricePerPiece: 55,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pecivo-maslo",
    name: "Pereca sa maslacem",
    description: "Lagana, lisnata peciva sa maslacem — savršene uz kafu i čaj.",
    category: "Kifle i peciva",
    minQuantity: 15,
    pricePerPiece: 60,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "rolat-prsuta",
    name: "Rolat sa pršutom",
    description: "Tanki lavaš, krem-sir, pršuta i rukola — elegantan zalogaj za svaku priliku.",
    category: "Rolati",
    minQuantity: 10,
    pricePerPiece: 120,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "rolat-losos",
    name: "Rolat sa lososom",
    description: "Dimljeni losos, krem-sir i sveža salata — odličan izbor za svečanije proslave.",
    category: "Rolati",
    minQuantity: 10,
    pricePerPiece: 150,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "rolat-vegeterijanski",
    name: "Vegetarijanski rolat",
    description: "Pečeno povrće, humus i zelene salate — puno ukusa, bez mesa.",
    category: "Rolati",
    minQuantity: 10,
    pricePerPiece: 100,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pica-margherita",
    name: "Mini Margherita",
    description: "Klasična mini pica sa domaćim sosom, mocarelom i svežim bosiljkom.",
    category: "Mini pice",
    minQuantity: 15,
    pricePerPiece: 90,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pica-kulen",
    name: "Mini pica sa kulenom",
    description: "Hrskavo testo, ajvar, kulen i sir — domaći ukus u malom formatu.",
    category: "Mini pice",
    minQuantity: 15,
    pricePerPiece: 95,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pica-pecurke",
    name: "Mini pica sa pečurkama",
    description: "Pečurke, sir i začini — lagana i aromatična varijanta za sve uzraste.",
    category: "Mini pice",
    minQuantity: 15,
    pricePerPiece: 85,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "bavarska-klasik",
    name: "Bavarska kifla",
    description: "Velika, mekana bavarska kifla sa morskom solju — idealna za sendviče i roštilje.",
    category: "Bavarske kifle",
    minQuantity: 15,
    pricePerPiece: 70,
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "bavarska-susam",
    name: "Bavarska sa susamom",
    description: "Hrskava kora od susama, mekan centar — prava poslastica uz zalogaje.",
    category: "Bavarske kifle",
    minQuantity: 15,
    pricePerPiece: 75,
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "takitos-pileci",
    name: "Pileći takitos",
    description: "Hrskavi takitos punjeni piletinom, povrćem i blagim začinima.",
    category: "Takitosi",
    minQuantity: 20,
    pricePerPiece: 80,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "takitos-sir",
    name: "Takitos sa sirom",
    description: "Topljeni sir u hrskavom testu — neodoljiv zalogaj za decu i odrasle.",
    category: "Takitosi",
    minQuantity: 20,
    pricePerPiece: 75,
    image:
      "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "kolac-gibanica",
    name: "Gibanica",
    description: "Tradicionalna gibanica sa domaćim sirom — topla, sočna, kao kod mame.",
    category: "Slani kolači",
    minQuantity: 1,
    pricePerPiece: 2500,
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "kolac-proja",
    name: "Proja sa sirom",
    description: "Kukuruzna proja sa sirom i kajmakom — autentičan srpski ukus.",
    category: "Slani kolači",
    minQuantity: 1,
    pricePerPiece: 2200,
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "kolac-pita",
    name: "Pita sa mesom",
    description: "Tanki filo, sočno mleveno meso i začini — pečena u velikoj tepsiji.",
    category: "Slani kolači",
    minQuantity: 1,
    pricePerPiece: 2800,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "slatko-baklava",
    name: "Baklava",
    description: "Slojevito testo, orasi i med — slatka tačka koja uvek nestane prva.",
    category: "Slatko",
    minQuantity: 20,
    pricePerPiece: 90,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "slatko-muffin",
    name: "Čokoladni mafin",
    description: "Vlažan mafin sa tamnom čokoladom — savršen uz popodnevnu kafu.",
    category: "Slatko",
    minQuantity: 12,
    pricePerPiece: 70,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "slatko-torta",
    name: "Voćna torta",
    description: "Lagani biskvit, krem i sveže sezonsko voće — elegantan završetak proslave.",
    category: "Slatko",
    minQuantity: 1,
    pricePerPiece: 3500,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop",
  },
];
