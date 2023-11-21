'use client';
import { FC, useState } from 'react';

import { Formik, Form, Field } from 'formik';

import { CalorieCalculatorSchema } from '@/src/utils/yup/CalorieCalculatorSchema';

import { FaInfoCircle } from 'react-icons/fa';

type FormDataTypes = {
  gender: string;
  age: number;
  unit: string;
  activityLevel: string;
  weight: number;
  weightPound: number;
  height: number;
  heightFeet: number;
  heightInch: number;
};

type UserCalorieResultsTypes = {
  HarrisBenedict: null | number;
  MifflinStJeor: null | number;
};

interface CalorieCalculatorProps {}

const CalorieCalculator: FC<CalorieCalculatorProps> = ({}) => {
  const [userCalorieResults, setUserCalorieResults] =
    useState<UserCalorieResultsTypes>({
      HarrisBenedict: null,
      MifflinStJeor: null,
    });

  const [
    openedCalorieCalculateMethodInfoModal,
    setOpenedCalorieCalculateMethodInfoModal,
  ] = useState({
    HarrisBenedictModal: false,
    MifflinStJeorModal: false,
  });

  const HarrisBenedictEquationHandler = (values: FormDataTypes) => {
    let result: number | null = null;
    const multiplier =
      values.activityLevel === 'sedentary'
        ? 1.2
        : values.activityLevel === 'lightly'
        ? 1.375
        : values.activityLevel === 'moderately'
        ? 1.55
        : values.activityLevel === 'veryActive'
        ? 1.725
        : values.activityLevel === 'extremely'
        ? 1.9
        : 0;

    if (values.gender === 'male') {
      let BMR = 0;

      if (values.unit === 'metric') {
        BMR =
          66.5 +
          13.75 * values.weight +
          5.003 * values.height -
          6.75 * values.age;
      } else {
        const inches = values.heightFeet * 12 + values.heightInch;

        const weightInPounds = values.weightPound;

        BMR =
          66.47 + 6.24 * values.weightPound + 12.7 * inches - 6.75 * values.age;
      }

      result = BMR * multiplier;
    }

    if (values.gender === 'female') {
      let BMR = 0;

      if (values.unit === 'metric') {
        BMR =
          9.563 * values.weight +
          1.85 * values.height -
          4.676 * values.age +
          655.1;
      } else {
        const inches = values.heightFeet * 12 + values.heightInch;

        const weightInPounds = values.weightPound;

        BMR =
          655.1 + 4.35 * values.weightPound + 4.7 * inches - 4.7 * values.age;
      }

      result = BMR * multiplier;
    }

    setUserCalorieResults((prev) => ({
      ...prev,
      HarrisBenedict: result,
    }));
  };

  const MifflinStJeorEquationHandler = (values: FormDataTypes) => {
    let result: number | null = null;
    const multiplier =
      values.activityLevel === 'sedentary'
        ? 1.2
        : values.activityLevel === 'lightly'
        ? 1.375
        : values.activityLevel === 'moderately'
        ? 1.55
        : values.activityLevel === 'veryActive'
        ? 1.725
        : values.activityLevel === 'extremely'
        ? 1.9
        : 0;

    if (values.gender === 'male') {
      let BMR = 0;

      if (values.unit === 'metric') {
        BMR = 10 * values.weight + 6.25 * values.height - 5 * values.age + 5;
      } else {
        const inches = values.heightFeet * 12 + values.heightInch;

        BMR =
          10 * values.weightPound * 0.45359237 +
          6.25 * inches * 2.54 -
          5 * values.age +
          5;
      }

      result = BMR * multiplier;
    }

    if (values.gender === 'female') {
      let BMR = 0;

      if (values.unit === 'metric') {
        BMR = 10 * values.weight + 6.25 * values.height - 5 * values.age - 161;
      } else {
        const inches = values.heightFeet * 12 + values.heightInch;

        BMR =
          10 * values.weightPound * 0.45359237 +
          6.25 * inches * 2.54 -
          5 * values.age -
          161;
      }

      result = BMR * multiplier;
    }

    setUserCalorieResults((prev) => ({
      ...prev,
      MifflinStJeor: result,
    }));
  };

  const methodInfoModalsToggleHandler = (modal: string) => {
    setOpenedCalorieCalculateMethodInfoModal((prev) => ({
      ...prev,
      HarrisBenedictModal: modal === 'HarrisBenedictModal',
      MifflinStJeorModal: modal === 'MifflinStJeorModal',
    }));
  };

  const methodInfoModalsCloseModal = (modal: string) => {
    setOpenedCalorieCalculateMethodInfoModal((prev) => ({
      ...prev,
      [modal]: false,
    }));
  };

  return (
    <div className="bg-slate-950 py-5 flex flex-col gap-5 items-center relative">
      <Formik
        initialValues={{
          gender: '',
          unit: 'metric',
          age: 0,
          activityLevel: '',
          weight: 0,
          weightPound: 0,
          height: 0,
          heightFeet: 0,
          heightInch: 0,
        }}
        validationSchema={CalorieCalculatorSchema}
        onSubmit={(values, actions) => {
          HarrisBenedictEquationHandler(values);
          MifflinStJeorEquationHandler(values);
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form className="flex flex-col gap-5 items-center caret-transparent">
            <label className="flex flex-col items-center w-72 gap-3 max-w-xs">
              <p className="text-white label">Gender</p>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-3">
                  <p className="text-white">Male</p>
                  <Field
                    name="gender"
                    type="radio"
                    value="male"
                    checked={values.gender === 'male'}
                    onChange={handleChange}
                    className="radio radio-md bg-white"
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
                    className="radio radio-md bg-white"
                  />
                </label>
              </div>
              <p className="max-w-xs label-text-alt text-white">
                {errors.gender}
              </p>
            </label>
            <label className="flex flex-col items-center w-72 gap-3 max-w-xs">
              <p className="text-white label">Unit</p>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-3">
                  <p className="text-white">Metric Units</p>
                  <Field
                    name="unit"
                    type="radio"
                    value="metric"
                    checked={values.unit === 'metric'}
                    onChange={handleChange}
                    className="radio radio-md bg-white"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <p className="text-white">US Units</p>
                  <Field
                    name="unit"
                    type="radio"
                    value="us"
                    checked={values.unit === 'us'}
                    onChange={handleChange}
                    className="radio radio-md bg-white"
                  />
                </label>
              </div>
              {/* <p className="max-w-xs label-text-alt text-white">
                {errors.gender}
              </p> */}
            </label>
            <label className="flex flex-col gap-1 w-72 max-w-ws">
              <p className="label text-white">Age</p>
              <Field
                name="age"
                type="number"
                value={values.age}
                placeholder="Age"
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs caret-current"
              />
              <p className="max-w-xs label-text-alt text-white">{errors.age}</p>
            </label>
            <label className="flex flex-col gap-1 w-72 max-w-ws">
              <p className="label text-white">Weight</p>
              {values.unit === 'us' ? (
                <>
                  <div className="relative">
                    <Field
                      name="weightPound"
                      type="number"
                      value={values.weightPound}
                      placeholder="Pounds"
                      onChange={handleChange}
                      className="input input-bordered w-full max-w-xs caret-current pr-16"
                    />
                    <p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">
                      pounds
                    </p>
                  </div>
                  <p className="max-w-xs label-text-alt text-white">
                    {errors.weightPound}
                  </p>
                </>
              ) : (
                <div className="relative">
                  <Field
                    name="weight"
                    type="number"
                    value={values.weight}
                    placeholder="Weight"
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs caret-current pr-7"
                  />
                  <p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">
                    kg
                  </p>
                </div>
              )}
              <p className="max-w-xs label-text-alt text-white">
                {errors.weight}
              </p>
            </label>
            <label className="flex flex-col gap-1 w-72 max-w-xs">
              <p className="label text-white">Height</p>
              {values.unit === 'us' ? (
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col h-20">
                      <div className="relative">
                        <Field
                          name="heightFeet"
                          type="number"
                          value={values.heightFeet}
                          placeholder="Feet"
                          onChange={handleChange}
                          className="input input-bordered w-full max-w-xs caret-current pr-10"
                        />
                        <p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">
                          feet
                        </p>
                      </div>
                      <p className="max-w-xs label-text-alt text-white">
                        {errors.heightFeet}
                      </p>
                    </div>
                    <div className="flex flex-col h-20">
                      <div className="relative">
                        <Field
                          name="heightInch"
                          type="number"
                          value={values.heightInch}
                          placeholder="Height"
                          onChange={handleChange}
                          className="input input-bordered w-full max-w-xs caret-current pr-14"
                        />
                        <p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">
                          inches
                        </p>
                      </div>
                      <p className="max-w-xs label-text-alt text-white">
                        {errors.heightInch}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Field
                    name="height"
                    type="number"
                    value={values.height}
                    placeholder="Height"
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs caret-current pr-8"
                  />
                  <p className="absolute select-none opacity-75 top-[50%] -translate-y-[50%] right-1">
                    cm
                  </p>
                </div>
              )}
              <p className="max-w-xs label-text-alt text-white">
                {errors.height}
              </p>
            </label>
            <label className="flex flex-col gap-1 w-72">
              <label className="label">
                <span className="text-white">Select activity level</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <Field
                id="activityLevel"
                name="activityLevel"
                as="select"
                onChange={handleChange}
                className="select select-md w-72 max-w-xs"
              >
                <option
                  disabled
                  value=""
                >
                  Select one
                </option>
                <option value="sedentary">
                  Sedentary: little or no exercise
                </option>
                <option value="lightly">Lightly Active: 1-3 times/week</option>
                <option value="moderately">
                  Moderately Active: 4-5 times/week
                </option>

                <option value="veryActive">
                  Very Active: intense exercise 6-7 times/week
                </option>
                <option value="extremely">
                  Extremely Active: very intense exercise daily, or physical job
                </option>
              </Field>
              <p className="max-w-xs label-text-alt text-white">
                {errors.activityLevel}
              </p>
            </label>
            <button
              type="submit"
              className="bg-slate-900 px-4 py-3 text-white hover:text-black btn btn-active"
            >
              Calculate
            </button>
          </Form>
        )}
      </Formik>
      {userCalorieResults.HarrisBenedict && userCalorieResults.MifflinStJeor ? (
        <div className="text-white flex gap-10 items-center caret-transparent">
          <div className="flex flex-col items-center">
            <p className="flex items-center gap-2">
              Harris Benedict Method{' '}
              <button
                onClick={() =>
                  methodInfoModalsToggleHandler('HarrisBenedictModal')
                }
              >
                <FaInfoCircle className="text-lg" />
              </button>
            </p>
            <span>{userCalorieResults.HarrisBenedict.toFixed()}</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex items-center gap-2">
              Mifflin and St Jeor Method{' '}
              <button
                onClick={() =>
                  methodInfoModalsToggleHandler('MifflinStJeorModal')
                }
              >
                <FaInfoCircle className="text-lg" />
              </button>
            </p>
            <span>{userCalorieResults.MifflinStJeor.toFixed()}</span>
          </div>
        </div>
      ) : null}
      {openedCalorieCalculateMethodInfoModal.HarrisBenedictModal ? (
        <div className="absolute flex flex-col top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white w-96 h-96 p-4 rounded-md">
          <button
            className="self-end"
            onClick={() => methodInfoModalsCloseModal('HarrisBenedictModal')}
          >
            X
          </button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ad animi
          nisi veritatis corrupti earum rem, qui facilis sequi illum assumenda
          aspernatur id, obcaecati suscipit ex libero, recusandae officiis
          sapiente!
        </div>
      ) : openedCalorieCalculateMethodInfoModal.MifflinStJeorModal ? (
        <div className="absolute flex flex-col top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white w-96 h-96 p-4 rounded-md">
          <button
            className="self-end"
            onClick={() => methodInfoModalsCloseModal('MifflinStJeorModal')}
          >
            X
          </button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          mollitia deserunt consequuntur placeat, sapiente impedit vitae
          praesentium dolore consectetur. Delectus fugit omnis officiis at!
          Similique quis eligendi ex exercitationem atque!
        </div>
      ) : null}
    </div>
  );
};

export default CalorieCalculator;
