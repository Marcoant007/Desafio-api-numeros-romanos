import express, { request, response } from 'express';
import routes from './routes/routes';
import './database'
const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(routes)

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
})