import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoData from './mongoData.js';
import Pusher from 'pusher';

// app config
const app = express();
const PORT = process.env.PORT || 8000;

const pusher = new Pusher({
    appId: "1218681",
    key: "7bbc18545886db274e85",
    secret: "61d0fc97e001e2fa5236",
    cluster: "ap2",
    useTLS: true
});

const DB_PORT ='mongodb+srv://user:2CbU51BnMCnj2xro@cluster0.4qxio.mongodb.net/mydb?retryWrites=true&w=majority';

// middlewares
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(DB_PORT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
    }
);

mongoose.connection.once("open", () => {
    console.log(`db connected!`);

    const changeStream = mongoose.connection.collection("conversations").watch();

    changeStream.on('change', (change) => {
        if (change.operationType === "insert") {
            pusher.trigger("channels", "newChannel", {
                "change": change
            });
        } else if (change.operationType === "update") {
            pusher.trigger("conversation", "newMessage", {
                "change": change
            });
        } else {
            console.log(`err`)
        }
    })
})

//api routes
app.get("/", (req, res) => {
    res.status(200).send("hello, world.")
});

app.post("/new/channel", (req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/get/channellist", (req, res) => {
    mongoData.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let channels = [];

            data.map(channelData => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }
                channels.push(channelInfo);
            })

            res.status(200).send(channels);
        }
    })
});

app.post("/new/message", (req, res) => {
    const id = req.query.id;

    mongoData.updateOne({ _id: id }, { $push: { conversation: req.body } }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/get/conversation", (req, res) => {
    const id = req.query.id;

    mongoData.find({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//listening routes
app.listen(PORT, () => {
    console.log("listening at port ", PORT);
})