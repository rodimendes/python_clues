// Integration test
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response1.status).toBe(201);

        const response1Body = await response1.json();

        expect(Array.isArray(response1Body)).toBe(true);
        expect(response1Body.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response2.status).toBe(200);

        const response2Body = await response2.json();

        expect(Array.isArray(response2Body)).toBe(true);
        expect(response2Body.length).toBe(0);
      });
    });
  });
});

/*
 Rodar o teste com o comando `npm run test:watch -- migrations.post`. Os dois -- seguidos do texto migrations.post é um regex para especificar somente onde que o teste será executado.
 O uso do ponto (.) é um caractere especial que indica que pode assumir qualquer valor. Desta forma, o regex funciona tanto para ambientes macOS, linux e windows.
 */
