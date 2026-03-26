import assert from "assert";
import { ApolloServer } from "@apollo/server";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

type User = { age: number; email: string; id: string; name: string };
type ListUsersData = { listUsers: User[] };
type GetUserData = { getUser: Omit<User, "name"> | null };

describe("listUsers", () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it("validate we can get all the users", async () => {
    const users = await server.executeOperation<ListUsersData>({
      query: `
            query ExampleQuery($limit: Int) {
                listUsers(limit: $limit) {
                    age
                    email
                    id
                    name
                }
            }
        `,
      variables: {
        limit: 100,
      },
    });

    assert(users.body.kind === "single");
    expect(users.body.singleResult.data!.listUsers.length).toEqual(4);
  });

  it("it correctly limits the input", async () => {
    const users = await server.executeOperation<ListUsersData>({
      query: `
            query ExampleQuery($limit: Int) {
                listUsers(limit: $limit) {
                    age
                    email
                    id
                    name
                }
            }
        `,
      variables: {
        limit: 1,
      },
    });

    assert(users.body.kind === "single");
    expect(users.body.singleResult.data!.listUsers.length).toEqual(1);
  });
});

describe("getUser", () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it("getting a single user by id", async () => {
    const user = await server.executeOperation<GetUserData>({
      query: `
            query ExampleQuery($id: ID!) {
              getUser(id: $id) {
                    age
                    email
                    id
                }
            }
        `,
      variables: {
        id: 1,
      },
    });

    assert(user.body.kind === "single");
    expect(user.body.singleResult.data!.getUser).toEqual({
      id: "1",
      email: "lucianompj1@gmail.com",
      age: 20,
    });
  });

  it("whenever a user is not found, return null", async () => {
    const user = await server.executeOperation<GetUserData>({
      query: `
            query ExampleQuery($getUserId: ID) {
              getUser(id: $getUserId) {
                    age
                    email
                    id
                }
            }
        `,
      variables: {
        getUserId: "99990999999",
      },
    });

    assert(user.body.kind === "single");
    expect(user.body.singleResult.data).toBeUndefined();
  });

  it("handles cases where an invalid ID is sent", async () => {
    const queryResult = await server.executeOperation<GetUserData>({
      query: `
            query ExampleQuery($getUserId: ID!) {
              getUser(id: $getUserId) {
                    age
                    email
                    id
                    INVALID_KEY
                }
            }
        `,
      variables: {
        getUserId: "99990999999",
      },
    });

    assert(queryResult.body.kind === "single");
    expect(queryResult.body.singleResult.errors![0].message).toEqual(
      'Cannot query field "INVALID_KEY" on type "User".',
    );
  });
});
