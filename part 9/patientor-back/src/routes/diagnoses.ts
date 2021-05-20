import express from "express";
import diagnosesService from "../services/diagnoses";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesService.getAll();
  res.send(diagnoses);
});

export default router;
