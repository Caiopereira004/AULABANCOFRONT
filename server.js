// Importa o framework Express
const express = require("express")
const mysql = require("mysql2/promise");
// Transforma a variável express em uma função
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors())
const PORT = 3000;

const conexao = mysql.createPool({
    user: "root",
    password: "root",
    host: "localhost",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () =>{
    try {
        const conn = await conexao.getConnection();
        console.log("Conectou ao banco de dados!");
        conn.release();
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
    }
})();


app.get("/alunos", async (req, res) => {
    try{
        const [resultado] = await conexao.query("SELECT * FROM alunos");
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({erro: "Erro ao buscar alunos"});
    }
    });


app.get("/", (req, res) => {
    res.status(200).json({msg: "Hello World"})
})

app.post("/alunos", async (req, res) => {
    const {nome, cpf, cep, uf, rua, numero, complemento} = req.body;

    if(!nome || !cpf){
        return res.status(400).json({erro: "Campos obrigatórios não foram preenchidos"});
    }

    const sql = "INSERT INTO alunos (nome, cpf, cep, uf, rua, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
    const parametro= [nome, cpf, cep, uf, rua, numero, complemento];

    const [resultado] = await conexao.query(sql, parametro);

    const novoAluno = await conexao.execute(`SELECT * FROM alunos WHERE id= ${resultado.insertId}`);

    return res.status(201).json(novoAluno);
    
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

