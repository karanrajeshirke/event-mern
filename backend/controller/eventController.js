import eventModel from "../models/eventModel.js";
import userModel from "../models/userModel.js";
//! create an event
export const createEventController = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity } = req.body;
    const creator = req.user._id;

    const newEvent = new eventModel({
      title,
      description,
      date,
      location,
      category,
      capacity,
      creator,
    });

    const savedEvent = await newEvent.save();

    res.status(200).send(savedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//! finding event of particular creator

export const getEventsOfUserController = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await eventModel.find({ creator: userId });

    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEventsController = async (req, res) => {
  try {
    const events = await eventModel.find().populate("creator");
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//! delete an event
export const deleteEventController = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).send("Event not found");
    }

    if (event.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send("Unauthorized: You do not have permission to delete this event");
    }
    const deleted = await eventModel.findByIdAndDelete(eventId);

    res.status(200).send({ message: "Event deleted successfully", deleted });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const registerEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    if (event.registrations.includes(userId)) {
      return res
        .status(400)
        .send({ message: "User is already registered for this event" });
    }

    const uptd = await eventModel.findByIdAndUpdate(
      eventId,
      { $push: { registrations: userId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(userId,{$push:{registeredEvents:event._id}})

    console.log(uptd);
    res.status(200).send({
      message: "did a registeration",
      uptd,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRegisterationForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await eventModel.findById(eventId).populate("registrations");

    res.status(200).send({ registerations: event.registrations });
  } catch (error) {
    console.log(error);
  }
};

export const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const eventCreator = await eventModel.findById(eventId);

    const eventCreatorId = eventCreator.creator;

    if (eventCreatorId.toString() != userId.toString()) {
      return res.status(400).send({
        message: "you are not the creator of the event to update it ",
      });
    }

    const { title, description, date, location, category, capacity } = req.body;

    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, {
      title,
      description,
      date,
      location,
      category,
      capacity,
    });

    res.status(200).send({ updatedEvent });
  } catch (error) {
    console.log(error);
  }
};

export const getParticularEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await eventModel.findById(eventId);

    res.status(200).send(event);
  } catch (error) {
    console.log(error);
  }
};

export const filterController = async (req, res) => {
  try {
    const { checkedList } = req.body;

    const events = await eventModel.find({ category: checkedList });

    res.send(events);
  } catch (error) {
    console.log(error);
  }
};


export const yourRegisteredEventsController = async (req, res) => {
  try {
    const id=req.user._id;
    const user=await userModel.findById(id).populate('registeredEvents');


    res.send({events:user.registeredEvents})
  


  } catch (error) {
    console.log(error);
  }
};