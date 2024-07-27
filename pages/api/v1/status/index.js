import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query("SHOW server_version;");
  const databaseVersion = dbVersion[0].server_version;

  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = dbMaxConnections[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const dbOpenedConnectionsResults = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  // const dbOpenedConnectionsResults = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';") Podemos usar o ::int para já vir do banco convertido.
  const dbOpenedConnectionsValue = dbOpenedConnectionsResults[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(dbMaxConnectionsValue),
        opened_connections: parseInt(dbOpenedConnectionsValue),
      },
    },
  });
}

export default status;
