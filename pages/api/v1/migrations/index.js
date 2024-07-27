import migrationRunnerRodrigo from "node-pg-migrate";
import { join } from "node:path"; //To implementing on any operational system
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"), // Poderia ter passado "infra/migrations", mas em ambientes Windows o caminho não funcionaria. Por isso foi importado o "join" do node.
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    console.log("Entrou no GET");
    const pendingMigrations = await migrationRunnerRodrigo(
      defaultMigrationsOptions,
    );
    await dbClient.end();
    response.status(200).json(pendingMigrations);
    console.log("Saiu do GET");
  }

  if (request.method === "POST") {
    console.log("Entrou no POST");
    const migratedMigrations = await migrationRunnerRodrigo({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      response.status(201).json(migratedMigrations);
    }

    response.status(200).json(migratedMigrations);
    console.log("Saiu do POST");
  }
  return response.status(405).end(); // 405 - method not allowed
}
