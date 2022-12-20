import itemModel from "./models/item.js";

const example = [
  {
    id: "1",
    name: "brunch",
    amount: 1000,
    date: new Date("2022-12-05T07:00:00.360Z").getTime(),
    category: "FOOD",
    description: "Too expensive.",
  },
  {
    id: "2",
    name: "MRT",
    amount: 30,
    date: new Date("2022-12-05T08:30:00.360Z").getTime(),
    category: "TRANSPORT",
    description: "Go to school.",
  },
  {
    id: "3",
    name: "protection money",
    amount: 1000,
    date: new Date("2022-12-05T12:00:00.360Z").getTime(),
    category: "OTHER",
    description: "",
  },
  {
    id: "4",
    name: "ointment",
    amount: 100,
    date: new Date("2022-12-05T15:00:00.360Z").getTime(),
    category: "HEALTH",
    description: "I broke my leg on my way home QQ.",
  },
  {
    id: "5",
    name: "salary",
    amount: 2000,
    date: new Date("2022-12-06T19:00:00.360Z").getTime(),
    category: "INCOME",
    description: "Math tutor.",
  },
];

const publicExampleData = [
  {
    id: "1",
    name: "brunch",
    amount: 1000,
    date: new Date("2022-12-10T07:00:00.000Z").getTime(),
    category: "FOOD",
    description: "Too expensive.",
  },
  {
    id: "2",
    name: "MRT",
    amount: 30,
    date: new Date("2022-12-07T08:30:00.000Z").getTime(),
    category: "TRANSPORT",
    description: "Go to school.",
  },
  {
    id: "3",
    name: "protection money",
    amount: 1000,
    date: new Date("2022-12-05T12:00:00.000Z").getTime(),
    category: "OTHER",
    description: "",
  },
  {
    id: "4",
    name: "ointment",
    amount: 100,
    date: new Date("2022-12-04T15:00:00.000Z").getTime(),
    category: "HEALTH",
    description: "I broke my leg on my way home QQ.",
  },
  {
    id: "5",
    name: "salary",
    amount: 2000,
    date: new Date("2022-12-03T19:00:00.000Z").getTime(),
    category: "INCOME",
    description: "Math tutor.",
  },
  {
    id: "6",
    name: "1+1",
    amount: 45,
    date: new Date("2022-12-01T19:00:00.000Z").getTime(),
    category: "FOOD",
    description: "1 + 1 = 50 * 0.9",
  },
];

const dataInit = async () => {
  await itemModel.deleteMany({});
  await itemModel.insertMany(publicExampleData);
  console.log("Database initialized!");
};

export { dataInit };
