export function calculateBmi(mass: number, height: number): string {
  const BMI = mass / (height/100 * height/100);

  let category = "Invalid BMI value";

  if (BMI < 18.5 && BMI > 0) {
    category = "Underweight (unhealthy weight)";
  } else if (BMI >=18.5 && BMI <= 22.9) {
    category = "Normal (healthy weight)";
  } else if (BMI >= 23.0 && BMI <= 24.9) {
    category = "Overweight I (at risk weight)";
  } else if (BMI >= 25.0 && BMI <= 29.9) {
    category = "Overweight II (moderately obese weight)"
  } else if (BMI >= 30.0) {
    category = "Overweight III (severely obese weight)";
  }
  return category;
}

// console.log(calculateBmi(74, 1.80))

const args = process.argv.slice(2).map(arg => Number(arg));
const height = args[0];
const mass = args[1];

if (!args.every(arg => !isNaN(arg))) {
  console.log('Please provide only numbers as argument');
  process.exit(1);
}

const result = calculateBmi(mass, height);
console.log(result);
