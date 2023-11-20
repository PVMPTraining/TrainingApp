'use client';
import { FC, useState } from 'react';

import { Formik, Form, Field } from 'formik';

import { CalorieCalculatorSchema } from '@/src/utils/yup/CalorieCalculatorSchema';

import { FaInfoCircle } from 'react-icons/fa';

type FormDataTypes = {
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
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
      const BMR =
        88.362 +
        13.397 * values.weight +
        4.799 * values.height -
        5.677 * values.age;

      result = BMR * multiplier;
    }

    if (values.gender === 'female') {
      const BMR =
        9.247 * values.weight +
        3.098 * values.height -
        4.33 * values.age +
        447.593;

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
      const BMR =
        10 * values.weight + 6.25 * values.height - 5 * values.age + 5;

      result = BMR * multiplier;
    }

    if (values.gender === 'female') {
      const BMR =
        10 * values.weight + 6.25 * values.height - 5 * values.age - 161;
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
          age: 0,
          weight: 0,
          height: 0,
          activityLevel: '',
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
              <Field
                name="weight"
                type="number"
                value={values.weight}
                placeholder="Weight"
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs caret-current"
              />
              <p className="max-w-xs label-text-alt text-white">
                {errors.weight}
              </p>
            </label>
            <label className="flex flex-col gap-1 w-72 max-w-xs ">
              <p className="label text-white">Height</p>
              <Field
                name="height"
                type="number"
                value={values.height}
                placeholder="Height"
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs caret-current"
              />
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
