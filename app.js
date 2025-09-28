const express = require('express');
const cors = require('cors');
const bookRouter = require('./bookRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', bookRouter)

app.get('/', (req, res) => {
    res.send("hello!");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})