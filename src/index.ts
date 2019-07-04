/**
 * Created by MD.ImdadulHuq on 02-Jul-19.
 */
import express from 'express'
import {connectToDb} from "./database-connection";
const app = express();
const port = 3000;
connectToDb().then((): void => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});