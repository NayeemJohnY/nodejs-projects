import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';

const app = express();

app.use(cors());
app.use(bodyparser.json({limit: "30mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "30mb", extended: true}));


app.use('/posts', postRouter)





const CONNECTION_URL = process.env.MONGOOSE_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {
    useNewURLParser: true,
}).then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
.catch((error) => console.log(`Server error: ${error.message}`))

// mongoose.set('useFindAndModify',false)

