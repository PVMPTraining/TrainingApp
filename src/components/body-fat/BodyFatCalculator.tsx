'use client';
import { FC, useState, useEffect } from 'react';

import { Formik, Form, Field } from 'formik';
import { bodyFatCalculateFormSchema } from '@/src/utils/yup/BodyFatCalculatorFormSchema';

interface BodyFatCalculatorProps {}

type FormDataTypes = {
  gender: string;
  age: number;
  measurements: {
    weight: number;
    height: number;
    waist: number;
    neck: number;
    hip: number;
  };
};

type UserResultsType = {
  NavyMethod: number | null;
  BMIMethod: number | null;
  FatMass: number | null;
  LeanMass: number | null;
};

const BodyFatCalculator: FC<BodyFatCalculatorProps> = ({}) => {
  const [userResults, setUserResults] = useState<UserResultsType>({
    NavyMethod: null,
    BMIMethod: null,
    FatMass: null,
    LeanMass: null,
  });

  const BFPCalculateWithUSNavyFormulaHandler = (
    waist: number,
    neck: number,
    height: number,
    hip: number,
    gender: string,
  ) => {
    let bodyFatPercentage: number | null = null;

    if (gender === 'male') {
      bodyFatPercentage =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    }
    if (gender === 'female') {
      bodyFatPercentage =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
    }

    setUserResults((prev) => ({
      ...prev,
      NavyMethod: bodyFatPercentage,
    }));
    return bodyFatPercentage;
  };

  const BFPCalculateWithBMIFormulaHandler = (
    weight: number,
    height: number,
    age: number,
    gender: string,
  ) => {
    let bodyFatPercentage: number | null = null;
    const BMI = weight / Math.pow(height / 100, 2);

    if (age < 18 && gender === 'male') {
      bodyFatPercentage = 1.51 * BMI - 0.7 * age - 2.2;
    }
    if (age >= 18 && gender === 'male') {
      bodyFatPercentage = 1.2 * BMI + 0.23 * age - 16.2;
    }
    if (age < 18 && gender === 'female') {
      bodyFatPercentage = 1.51 * BMI - 0.7 * age + 1.4;
    }
    if (age >= 18 && gender === 'female') {
      bodyFatPercentage = 1.2 * BMI + 0.23 * age - 5.4;
    }

    setUserResults((prev) => ({
      ...prev,
      BMIMethod: bodyFatPercentage,
    }));
  };

  const BFPCalculateFunctionsCallHandler = (values: FormDataTypes) => {
    const navyMethodResult = BFPCalculateWithUSNavyFormulaHandler(
      values.measurements.waist,
      values.measurements.neck,
      values.measurements.height,
      values.measurements.hip,
      values.gender,
    );

    const bmiMethodResult = BFPCalculateWithBMIFormulaHandler(
      values.measurements.weight,
      values.measurements.height,
      values.age,
      values.gender,
    );

    if (navyMethodResult) {
      const fatMass = (navyMethodResult * values.measurements.weight) / 100;
      const leanMass = values.measurements.weight - fatMass;

      setUserResults((prev) => ({
        ...prev,
        FatMass: fatMass,
        LeanMass: leanMass,
      }));
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          gender: '',
          age: 0,
          measurements: {
            weight: 0,
            height: 0,
            waist: 0,
            neck: 0,
            hip: 0,
          },
        }}
        validationSchema={bodyFatCalculateFormSchema}
        onSubmit={(values, actions) => {
          BFPCalculateFunctionsCallHandler(values);
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form className="flex flex-col gap-5 items-center">
            <label className="flex flex-col items-center gap-1">
              <p className="text-white">Gender</p>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-3">
                  <p className="text-white">Male</p>
                  <Field
                    name="gender"
                    type="radio"
                    value="male"
                    checked={values.gender === 'male'}
                    onChange={handleChange}
                  />
                </label>
                <label className="flex items-center gap-3">
                  <p className="text-white">Female</p>
                  <Field
                    name="gender"
                    type="radio"
                    value="female"
                    checked={values.gender === 'female'}
                    onChange={handleChange}
                  />
                </label>
                {errors.gender}
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <p className="text-white">Age</p>
              <Field
                name="age"
                type="number"
                value={values.age === 0 ? '' : values.age}
                placeholder="Age"
                onChange={handleChange}
              />
              {errors.age}
            </label>
            <label className="flex flex-col gap-1">
              <p className="text-white">Weight</p>
              <Field
                name="measurements.weight"
                type="number"
                value={values.measurements.weight}
                placeholder="Weight"
                onChange={handleChange}
              />
              {errors.measurements?.weight}
            </label>
            <label className="flex flex-col gap-1">
              <p className="text-white">Height</p>
              <Field
                name="measurements.height"
                type="number"
                value={values.measurements.height}
                placeholder="Height"
                onChange={handleChange}
              />
              {errors.measurements?.height}
            </label>
            <label className="flex flex-col gap-1">
              <p className="text-white">Waist</p>
              <Field
                name="measurements.waist"
                type="number"
                value={values.measurements.waist}
                placeholder="Waist"
                onChange={handleChange}
              />
              {errors.measurements?.waist}
            </label>
            <label className="flex flex-col gap-1">
              <p className="text-white">Neck</p>
              <Field
                name="measurements.neck"
                type="number"
                value={values.measurements.neck}
                placeholder="Neck"
                onChange={handleChange}
              />
              {errors.measurements?.neck}
            </label>
            {values.gender === 'female' ? (
              <label className="flex flex-col gap-1">
                <p className="text-white">Hip</p>
                <Field
                  name="measurements.hip"
                  type="number"
                  value={values.measurements.hip}
                  placeholder="Hip"
                  onChange={handleChange}
                />
                {errors.measurements?.hip}
              </label>
            ) : null}
            <button
              type="submit"
              className="bg-slate-700 px-4 py-3 text-white"
            >
              Calculate
            </button>
          </Form>
        )}
      </Formik>
      {userResults.NavyMethod ? (
        <div className="text-white">
          <p>Body Fat Mass: {userResults.FatMass?.toFixed(2)}</p>
          <p>Lean Body Mass: {userResults.LeanMass?.toFixed(2)}</p>
          <div className="flex items-center gap-5">
            <div>
              <p>U.S Navy Method</p>
              <p className="text-white text-center text-lg">
                {userResults.NavyMethod.toFixed(2)}
              </p>
            </div>
            <div>
              <p>BMI Method</p>
              <p className="text-white text-center text-lg">
                {userResults.BMIMethod?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BodyFatCalculator;
