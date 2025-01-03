const express = require("express");
const app = express();
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connect");
const Events = require("./models/events.models");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello, Express")
})

const createEvents = async (newEvent) => {
    try {
        const events = new Events(newEvent);
        const saveEvents = await events.save();
    } catch (error) {
        throw error
    }
}

app.post("/events/", async (req, res) => {
    try {
        const events = await createEvents(req.body)
        if(events){
            res.status(201).json({message: "Events added successfully"})
        }else{
            res.status(404).json({error:"Events not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to add events"})
    }
})

async function readAllEvents(){
    try {
        const allEvents = await Events.find();
        return allEvents
    } catch (error) {
        throw error
    }
}

app.get("/events/", async (req, res) => {
    try {
        const events = await readAllEvents()
        if(events.length != 0){
            res.json(events)
        }else{
            res.status(404).json({error: "No events found."})
        }
    } catch (error) {
        res.status(500).json({error : "Failed to fetch"})
    }
})

async function readEventsByUpdateById(eventId, updateToData){
    try {
        const events = await Events.findByIdAndUpdate(eventId, updateToData, {new:true});
        return events
    } catch (error) {
        console.log("Error in update events by id", error);
    }
}

app.post("/events/:eventId", async (req, res) => {
    try {
        const updateEvents = await readEventsByUpdateById(req.params.eventId, req.body)
        if(updateEvents){
            res.status(200).json({message : "Event update successfully"})
        }else{
            res.status(404).json({error: "Event does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update event"})
    }
})

async function readEventsByDeleteById(eventId){
    try {
        const events = await Events.findByIdAndDelete(eventId)
        return events
    } catch (error) {
        console.log("Error in Delete a events");
        
    }
}

app.delete("/events/:eventId", async (req, res) => {
    try {
        const events = await readEventsByDeleteById(req.params.eventId)
        if(events){
            res.status(200).json({message:"Events delete successfully"})
        }
    } catch (error) {
        res.status(500).json({error : "Failed to delete events"})
    }
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server running on server, ${PORT}`);
})