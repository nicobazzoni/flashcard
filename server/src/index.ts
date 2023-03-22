
import { config } from 'dotenv'
config()
import Deck from './models/Deck'
import express, {Request, Response} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { getDecksController } from "./controllers/getDecksController";

const PORT = 5000;


const app = express()
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json())








app.post('/decks', async (req: Request, res: Response) => {
   
    const newDeck = new Deck({
        title: req.body.title,

    })
   const createdDeck = await newDeck.save()
   res.json(createdDeck);
})

app.get('/decks', async (req: Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks);
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Connected to MongoDB on ${PORT}`)

    app.listen(PORT)
    })
    .catch((err) => {

    console.log(err)
    }
    )

