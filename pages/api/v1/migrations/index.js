import migrationRunnerRodrigo from "node-pg-migrate";
import { resolve } from "node:path"; //To implementing on any operational system
import database from "infra/database";

export default async function migrations(request, response) {
  const methodsAllowed = ["GET", "POST"];
  if (!methodsAllowed.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed.`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"), // Poderia ter passado "infra/migrations", mas em ambientes Windows o caminho não funcionaria. Por isso foi importado o "join" do node.
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunnerRodrigo(
        defaultMigrationsOptions,
      );
      response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunnerRodrigo({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        response.status(201).json(migratedMigrations);
      }

      response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
