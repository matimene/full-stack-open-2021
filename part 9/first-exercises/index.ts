import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { bmiCalculator } from "./src/bmiCalculator";
import { exerciseCalculator } from "./src/exerciseCalculator";

const app = express();
app.use(bodyParser.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = bmiCalculator(height, weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.send({ bmi, height, weight });
});

app.post("/exercises", (req, res) => {
  const target: number = req.body.target;
  const daily_exercises: number[] = req.body.daily_exercises;

  const arrExercises = [target, ...daily_exercises];

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (arrExercises.some((day) => isNaN(day))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.send(exerciseCalculator(arrExercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
