import express from "express";
import patientsService from "../services/patients";
import { toNewPatientEntry, toNewEntryToPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getAll();

  res.send(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getById(id);

  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatientEntry = patientsService.addPatient(newPatientEntry);

    res.json(addedPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;

  try {
    const newEntryToPatient = toNewEntryToPatient(req.body);
    const addedEntryToPatient = patientsService.addEntry(id, newEntryToPatient);

    res.json(addedEntryToPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
