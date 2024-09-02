// Integration test

import database from "infra/database"; //importing to run a query to clean the database before the test.
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST to /api/v1/migrations should return 200.", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});

/*
 Rodar o teste com o comando `npm run test:watch -- migrations.post`. Os dois -- seguidos do texto migrations.post é um regex para especificar somente onde que o teste será executado.
 O uso do ponto (.) é um caractere especial que indica que pode assumir qualquer valor. Desta forma, o regex funciona tanto para ambientes macOS, linux e windows.
 */
