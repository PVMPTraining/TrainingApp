import * as yup from 'yup';

export const CalorieCalculatorSchema = yup.object({
  gender: yup.string().required('Gender is required'),
  age: yup
    .number()
    .min(1, 'Please enter a number greater than 0')
    .max(123, 'Please enter a number less than or equal to 123')
    .required('Age is required'),
  weight: yup
    .number()
    .min(2, 'Please enter a number greater than 1')
    .max(638, 'Please enter a number less than or equal to 638')
    .required('Weight is required'),
  height: yup
    .number()
    .min(54, 'Please enter a number greater than 53')
    .max(272, 'Please enter a number less than or equal to 272')
    .required('Height is required'),
  activityLevel: yup.string().required('Activity level is required'),
});
