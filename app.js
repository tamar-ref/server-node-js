const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/bookRouter')
const userRouter = require('./routes/userRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', bookRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send("hello!");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})