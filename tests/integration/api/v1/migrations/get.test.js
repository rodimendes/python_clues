// Integration test

import database from "infra/database"; //importing to run a query to clean the database before the test.
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("GET to /api/v1/migrations should return 200.", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log(responseBody); //Prints the pending migration to be executed. Remember, we are in a dryRun environment. This console.log can be removed

  expect(Array.isArray(responseBody)).toBe(true); // Checks if the responseBody is an array.
  expect(responseBody.length).toBeGreaterThan(0);
});
