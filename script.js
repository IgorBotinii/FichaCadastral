const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurações do CORS
app.use(cors({
    origin: [
        'https://igorbotinii.github.io', 
        'http://localhost:3000',
        'http://127.0.0.1:3000' // Adicionado o IP localhost
    ]
}));

app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'db-forte-server.mysql.database.azure.com',
    user: 'IgorBotini',          // Substitua pelo seu usuário
    password: '1qaz2wsx3EDC@@!',  // Substitua pela sua senha
    database: 'db_forte_desenv_azure' // Substitua pelo seu banco de dados
});

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para receber os dados do formulário
app.post('/api/submit', (req, res) => {
    const formData = req.body;
    console.log(formData); // Para verificar os dados recebidos

    const query = 'INSERT INTO resp_ficha_cadastral (enquadramento_fiscal) VALUES (?)';
    db.query(query, [formData.enquadramento_fiscal], (err, result) => {
        if (err) {
            console.error(err); // Log do erro
            return res.status(400).send('Erro ao armazenar dados: ' + err.message);
        }
        res.status(201).send('Dados recebidos e armazenados com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
