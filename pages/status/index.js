import useSWR from "swr";

/*function CapsLock(propriedades) {
  const pessoaEmCapsLock = propriedades.pessoa.toUpperCase(); // Using JavaScript function to put the text in upper case.
  const textoEmCapsLock = propriedades.texto.toUpperCase(); // Using JavaScript function to put the text in upper case.
  const propriedadesJuntas = pessoaEmCapsLock + " " + textoEmCapsLock;
  return [propriedadesJuntas];

  <CapsLock texto="teste de texto" pessoa="Roglido" /> // Put this line inside return of function StatusPage to work.
}*/

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Página de Status</h1>
      <UpdatedAt />
      <h1>Database data</h1>
      <DatabaseData />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data)
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-PT");
  return <div>Last update: {updatedAtText}</div>;
}

function DatabaseData() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformation = "Carregando...";

  if (!isLoading && data) {
    databaseInformation = (
      <>
        <div>Max connections: {data.dependencies.database.max_connections}</div>
        <div>
          Opened connections: {data.dependencies.database.opened_connections}
        </div>
        <div>Database version: {data.dependencies.database.version}</div>
      </>
    );
  }

  return <div>{databaseInformation}</div>;
}
