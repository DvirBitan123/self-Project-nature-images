import express from 'express';
import morgan from "morgan";
import postgraphile from 'postgraphile';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const Options = {
  origin: 'http://localhost:4200'
}

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(Options))

app.use(postgraphile(`postgres://postgres:bitan212@localhost:5432/usersDB`, 'public', {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  jwtPgTypeIdentifier:"public.jwt_token",
  jwtSecret: process.env.JWT_SECRET 
}));



app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}/graphiql`);
});

