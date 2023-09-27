import express from 'express';
const app = express();
import password from "../repo/password.mjs"

import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://williampolet:${password}@clusterbecode.s1alsc3.mongodb.net/?retryWrites=true&w=majority`, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('MongoDB Atlas connected!');
}).catch(err => {
console.log(err);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
res.render('index');
});

app.listen(3000, () => {
console.log('Server started on port 3000');
});