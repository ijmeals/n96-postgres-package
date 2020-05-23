import { SQL } from "sql-template-strings";

import { conn } from "./../src/conn";

const connectionProps = {
  driver: "pg",
  user: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD,
  host: process.env.APP_DB_HOST,
  port: Number(process.env.APP_DB_PORT),
  database: process.env.APP_DB_NAME,
  schema: "public",
};

test("test a basic querying without passing in a pool client", async () => {
  const dbConn = conn({ ...connectionProps });
  const data = await dbConn.query<[{ numCol: number }]>({ sql: SQL`SELECT 1 AS num_col`, tag: "Test" });

  expect(data[0].numCol).toBe(1);
});
