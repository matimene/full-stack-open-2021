enum Rating {
  Bad = 1,
  Fine = 2,
  Good = 3,
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgsExercise = (args: Array<string>): number[] => {
  if (args.length < 5) throw new Error("Not enough arguments");

  let arr = [...args];
  arr.splice(0, 2);

  if (arr.map((v) => !isNaN(Number(v)))) {
    return arr.map((v) => Number(v));
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const exerciseCalculator = (array: number[]): ExerciseResult => {
  const arr = array;
  const target = array.shift();
  if (target) {
    const periodLength = arr.length;
    const trainingDays = arr.filter((hours) => hours > 0);
    const average = trainingDays.reduce((a, b) => a + b, 0) / periodLength;
    const success = target && average >= target ? true : false;
    let ratingDescription = "";
    const rating = (): Rating => {
      switch (true) {
        case target && average < target:
          ratingDescription = "Move your body, lazy!";
          return Rating.Bad;
        case target && average > target && average < target * 1.5:
          ratingDescription = "You're doing a fine job but could be better!";
          return Rating.Fine;
        case target && average > target * 2:
          ratingDescription = "Good job buddy, keep it up!";
          return Rating.Good;
        default:
          throw new Error();
      }
    };

    return {
      periodLength,
      trainingDays: trainingDays.length,
      success,
      rating: rating(),
      ratingDescription,
      target,
      average,
    };
  }

  throw new Error("Error during calculation");
};

try {
  const argsArr = parseArgsExercise(process.argv);
  console.log(exerciseCalculator(argsArr));
} catch (e) {
  console.log("Error: ", e);
}

//console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
