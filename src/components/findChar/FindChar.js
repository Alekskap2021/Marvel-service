import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import * as Yup from "yup";

import ErrorMessage from "../errorMessage/ErrorMessage";

import "./findChar.scss";

const FindChar = () => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getCharacterByName, error, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const updateChar = (name) => {
    clearError();
    setLoading(true);

    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;

  const result = !char ? null : char.length > 0 && char ? (
    <div className="form__success">
      <p> There is! Visit {char[0].name} page?</p>
      <Link to={`/${char[0].id}`} className="button button__secondary">
        <div className="inner">Wiki</div>
      </Link>
    </div>
  ) : (
    <div className="form__error">The character was not found. Check the name and try again</div>
  );

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={({ name }) => updateChar(name)}
    >
      {({ values }) => (
        <Form className="form">
          <label className="form__title" htmlFor="name">
            Or find a character by name:
          </label>
          <div className="form__search">
            <Field className="form__input" name="name" type="text" />
            <button href="#" className="button button__main" type="submit" disabled={loading}>
              <div className="inner">Find</div>
            </button>
          </div>
          <FormikErrorMessage className="form__error" name="name" component="div" />

          {values.name.length > 0 ? result : null}
          {values.name.length > 0 ? errorMessage : null}
        </Form>
      )}
    </Formik>
  );
};

export default FindChar;
