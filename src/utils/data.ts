export const categories = [
  { id: "frame", name: "Frame" },
  { id: "suspension", name: "Suspension" },
  { id: "brake", name: "Brake" },
  { id: "hubs", name: "Hubs" },
  { id: "crankset", name: "Crankset" },
  { id: "saddle", name: "Saddle" },
  // { id: 'derailleur', name: 'Derailleur' },
  { id: "chain", name: "Chain" },
];

export const defaultProduct = ()=>{return{
    id: 0,
    name: "",
    category: "",
    created_at: "",
    description: null,
    detail: {},
    image: [],
    price: 0,
    stock: 0,
}};

