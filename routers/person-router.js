import { Router } from "express";
import { personRepository } from "../om/person.js";

export const router = Router();

router.put("/", async (req, res) => {
  const person = await personRepository.createAndSave(req.body);
  res.send(person);
});