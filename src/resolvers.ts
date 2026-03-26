const users = [
  {
    id: "1",
    name: "Luciano Pierdona",
    email: "luciano@example.com",
    age: 20,
  },
  {
    id: "2",
    name: "Marcos Pierdona",
    email: "marcos@example.com",
    age: 35,
  },
  {
    id: "3",
    name: "Junior Pierdona",
    email: "junior@example.com",
    age: 28,
  },
  {
    id: "4",
    name: "Test Pierdona",
    email: "test@example.com",
    age: 42,
  },
];

const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) => {
      return users.find((user) => user.id === id) ?? null;
    },
    listUsers: (_: any, { limit }: { limit: number }) => users.slice(0, limit),
  },
};

export { resolvers };
