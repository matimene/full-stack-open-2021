enum BmiResults {
  under = "Underweight (unhealthy results)",
  normal = "Normal (healthy results)",
  over = "Overweight (unhealthy results)",
}

const parseArguments = (
  args: Array<string>
): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const bmiCalculator = (height: number, weight: number): BmiResults => {
  const bmiNumber = weight / ((height / 100) * (height / 100));
  switch (true) {
    case bmiNumber < 18.5:
      return BmiResults.under;
    case bmiNumber > 18.5 && bmiNumber < 24.9:
      return BmiResults.normal;
    case bmiNumber > 25:
      return BmiResults.over;
    default:
      throw new Error();
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (e) {
  console.log("Error: ", e);
}

// TO RUN: "npm run calculateBmi 180 74" => "Normal (healthy weight)"
