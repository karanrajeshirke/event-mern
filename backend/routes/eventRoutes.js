import express from "express";

import { requireSignIn } from "../middleware/middleware.js";
import { createEventController, deleteEventController, filterController, getEventsController, getEventsOfUserController, getParticularEvent, getRegisterationForEvent, registerEventController, updateEventController,yourRegisteredEventsController } from "../controller/eventController.js";


const router = express.Router();



router.post('/create',requireSignIn,createEventController)
router.get('/get-all',getEventsController)
router.get('/get',requireSignIn,getEventsOfUserController)
router.get('/get/:eventId',getParticularEvent)

router.delete('/delete/:eventId',requireSignIn,deleteEventController)
router.get('/register/:eventId',requireSignIn,registerEventController)
router.get('/registered/:eventId',requireSignIn,getRegisterationForEvent)
router.put('/update/:eventId',requireSignIn,updateEventController)
router.post('/filter',filterController)
router.get('/your-events',requireSignIn,yourRegisteredEventsController)







export default router;
