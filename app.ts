import express from "express";
import { router } from './src/app/routes';

const app = express();
const port = 3000; 


app.use(router);

app.use((req, res, next) => {
  res.status(404).send("Rota não encontrada");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erro interno do servidor");
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
