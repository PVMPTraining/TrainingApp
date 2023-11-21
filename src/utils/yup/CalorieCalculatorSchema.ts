import * as yup from 'yup';

export const CalorieCalculatorSchema = yup.object({
  gender: yup.string().required('Gender is required'),
  activityLevel: yup.string().required('Activity level is required'),
  unit: yup.string(),
  age: yup
    .number()
    .min(1, 'Please enter a number greater than 0')
    .max(123, 'Please enter a number less than or equal to 123')
    .required('Age is required'),
  weight: yup.number().when('unit', {
    is: 'metric',
    then: yup
      .number()
      .min(2, 'Please enter a number greater than 1')
      .max(638, 'Please enter a number less than or equal to 638')
      .required('Weight is required'),
    otherwise: yup.number(),
  }),
  height: yup.number().when('unit', {
    is: 'metric',
    then: yup
      .number()
      .min(2, 'Please enter a number greater than 1')
      .max(638, 'Please enter a number less than or equal to 638')
      .required('Weight is required'),
    otherwise: yup.number(),
  }),
  weightPound: yup.number().when('unit', {
    is: 'us',
    then: yup.number().min(100),
    otherwise: yup.number(),
  }),
  heightFeet: yup.number().when('unit', {
    is: 'us',
    then: yup.number().min(2).max(9),
    otherwise: yup.number(),
  }),
  heightInch: yup.number().when('unit', {
    is: 'us',
    then: yup.number().required().min(0).max(11.99),
    otherwise: yup.number(),
  }),
});
