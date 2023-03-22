const { json } = require("express");
const express = require("express");
const app = express();
const dadosToken = require("./dados/dadosToken");

app.use(json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "API ONLINE", url_Parametros: "/parametros" });
});

app.get("/parametros", (req, res) => {
  res.status(200).json([
    {
      param: "Header",
      key: "Content-Type",
      value: "application/x-www-form-urlencoded",
    },
    { param: "Body", key: "grant_type", value: "client_credentials" },
    { param: "Body", key: "client_id", value: "svc-topaz-consignado" },
    {
      param: "Body",
      key: "client_secret",
      value: "306260b3-9f90-486b-8884-f36aa2c68054",
    },
  ]);
});

app.post("/tokenMatera", (req, res) => {
  res.status(200).json({
    access_token: "3db6a2e3-3d62-4187-8529-f7272102db31",
    token_type: "bearer",
    expires_in: 86399,
    scope: "app",
  });
});

app.post("/materaBoleto", (req, res) => {
  res.status(200).json({
    codigoBarras: "36897926400001253700001264200000000900100020",
    idTitulo: 7933522,
    linhaDigitavel:
      "36890.00127   64200.000004   09001.000208   7   92640000125370",
    boletoGerado:
      "JVBERi0xLjUKJeLjz9MKMyAwIG9iago8PC9TdWJ0eXBlL0Zvcm0vRmlsdGVyL0ZsYXRlRGVjb2RlL1R5cGUvWE9iamVjdC9NYXRyaXggWzEgMCAwIDEgMCAwXS9Gb3J",
  });
});

app.post("/token", (req, res) => {
  if (req.headers.content !== "application/x-www-form-urlencoded") {
    res.status(400).send({ status: "Não Autorizado!" });
  }
  if (
    req.body.grant_type !== "client_credentials" ||
    req.body.client_id !== "svc-topaz-consignado" ||
    req.body.client_secret !==
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXamdVN0tHS2JmTlBOMWIydlM3bkNzRG5aSHhaTmRsQklCVlp1QVBFSGlrIn0.eyJleHAiOjE2Nzg5NzY1OTMsImlhdCI6MTY3ODk3NDc5MywianRpIjoiMTcxYjAyMjAtYzEwMC00NzZjLWFlOGQtMDA5ZGY2ZmI1NDgwIiwiaXNzIjoiaHR0cHM6Ly9yZWRoYXQtc3NvLWNzZi1jcnQtc3NvLmFwcHMub2NwNGNydC5jc2ZjcHYud2NvcnAuY2FycmVmb3VyLmNvbS9hdXRoL3JlYWxtcy9DU0YtU2Vydmljb3MiLCJhdWQiOlsiY3NmLWNvbnNpZ25hZG8iLCJhY2NvdW50Il0sInN1YiI6IjVmNTgxZDdiLThmMDEtNGRiOC05NjY4LTg4N2I3ZjhlOGRjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6InN2Yy10b3Bhei1jb25zaWduYWRvIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1jc2Ytc2Vydmljb3MiXX0sInJlc291cmNlX2FjY2VzcyI6eyJjc2YtY29uc2lnbmFkbyI6eyJyb2xlcyI6WyJjc2YtY29uc2lnbmFkby1hcGktY29icmFuY2EiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJzdmMtdG9wYXotY29uc2lnbmFkbyIsImNsaWVudEhvc3QiOiIzNC45NS4yMzYuNzQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3ZjLXRvcGF6LWNvbnNpZ25hZG8iLCJjbGllbnRBZGRyZXNzIjoiMzQuOTUuMjM2Ljc0In0.J1KXiotAYXo1yqrdCoBHJpsMOUE7owATWvSWwegk8YAIAsXPOzay-XkL4uWpKMeVfI4fTgmFYTGrIdbgX6P6TuUKEZ4g7uM1mkqZZsGjO5sUV32sGUwe7ZfDWmzmD1pNVmWUVWXeW2XB8p_XpAUPV-X5kFXzzns_1waNHWRTiE0WvPb9m0Hqj_3wIYD7R3ruJRQqKlo0TM9VcJkMmoTIoxb8gN8sLLYJw2JNNlxZ9RNEvb-8vdJCit0ciKMTnUEJrvE_8GmEKy9rntCmvdNluVHCIUVcprgjDv0LjIdlnp6TXIuy-cAGyg0Krm2z1mrIv7keY9TS0czm_ZoyDRi4-w"
  ) {
    res.status(401).send({ status: "Erro no body" });
  }
  res.status(200).json(dadosToken);
});

app.post("/boleto", (req, res) => {
  if (
    req.headers.channel !== "topaz" ||
    req.headers.authorization !==
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXamdVN0tHS2JmTlBOMWIydlM3bkNzRG5aSHhaTmRsQklCVlp1QVBFSGlrIn0.eyJleHAiOjE2Nzg5NzY1OTMsImlhdCI6MTY3ODk3NDc5MywianRpIjoiMTcxYjAyMjAtYzEwMC00NzZjLWFlOGQtMDA5ZGY2ZmI1NDgwIiwiaXNzIjoiaHR0cHM6Ly9yZWRoYXQtc3NvLWNzZi1jcnQtc3NvLmFwcHMub2NwNGNydC5jc2ZjcHYud2NvcnAuY2FycmVmb3VyLmNvbS9hdXRoL3JlYWxtcy9DU0YtU2Vydmljb3MiLCJhdWQiOlsiY3NmLWNvbnNpZ25hZG8iLCJhY2NvdW50Il0sInN1YiI6IjVmNTgxZDdiLThmMDEtNGRiOC05NjY4LTg4N2I3ZjhlOGRjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6InN2Yy10b3Bhei1jb25zaWduYWRvIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1jc2Ytc2Vydmljb3MiXX0sInJlc291cmNlX2FjY2VzcyI6eyJjc2YtY29uc2lnbmFkbyI6eyJyb2xlcyI6WyJjc2YtY29uc2lnbmFkby1hcGktY29icmFuY2EiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJzdmMtdG9wYXotY29uc2lnbmFkbyIsImNsaWVudEhvc3QiOiIzNC45NS4yMzYuNzQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3ZjLXRvcGF6LWNvbnNpZ25hZG8iLCJjbGllbnRBZGRyZXNzIjoiMzQuOTUuMjM2Ljc0In0.J1KXiotAYXo1yqrdCoBHJpsMOUE7owATWvSWwegk8YAIAsXPOzay-XkL4uWpKMeVfI4fTgmFYTGrIdbgX6P6TuUKEZ4g7uM1mkqZZsGjO5sUV32sGUwe7ZfDWmzmD1pNVmWUVWXeW2XB8p_XpAUPV-X5kFXzzns_1waNHWRTiE0WvPb9m0Hqj_3wIYD7R3ruJRQqKlo0TM9VcJkMmoTIoxb8gN8sLLYJw2JNNlxZ9RNEvb-8vdJCit0ciKMTnUEJrvE_8GmEKy9rntCmvdNluVHCIUVcprgjDv0LjIdlnp6TXIuy-cAGyg0Krm2z1mrIv7keY9TS0czm_ZoyDRi4-w" ||
    req.headers.content !== "application/json"
  ) {
    res.status(400).json({ status: "Algum parametro do Header está errado" });
  }
  res.status(200).json(req.body);
});

app.listen("3000", () => {
  console.log("Online em http://localhost:3000");
});
