const express = require('express');

const app = express();

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.POPRT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`))

