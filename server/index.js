import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//.env 설정파일 호출
dotenv.config();
// mongoose.connect(process.env.MONGODB, { dbName: 'chatGpts'})
//     .then( () => {console.log("DB connected"); })
//     .catch( (error) => { console.error(error)} );
    
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('hello world!');
});

app.listen(port, function () {
    console.log('server on! ' + port);
});
