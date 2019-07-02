/**
 * Created by MD.ImdadulHuq on 02-Jul-19.
 */
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const sum = (a:number, b:number):number=> {
    return  a+b;
}
console.log(sum(1,2));
