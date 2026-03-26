const users = [
  {
    id: 1,
    name: "Luciano Pierdona",
    email: "lucianompj1@gmail.com",
    age: 20,
  },
  {
    id: 2,
    name: "Marcos Pierdona",
    email: "lucianompj1@gmail.com",
    age: 20,
  },
  {
    id: 3,
    name: "Junior Pierdona",
    email: "lucianompj1@gmail.com",
    age: 20,
  },
  {
    id: 4,
    name: "Test Pierdona",
    email: "lucianompj1@gmail.com",
    age: 20,
  },
];

const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) => {
      return users.find((user) => user.id.toString() === id);
    },
    listUsers: (_: any, { limit }: { limit: number }) => users.slice(0, limit),
  },
};

export { resolvers };
