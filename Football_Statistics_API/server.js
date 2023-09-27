const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./api');
const password = require('./password.js')

const app = express();

mongoose.connect(`mongodb+srv://williampolet:${password}@clusterbecode.s1alsc3.mongodb.net/Football_Statistic_App?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));