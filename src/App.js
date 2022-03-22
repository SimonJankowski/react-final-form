import { useState } from "react";
import { Form, Field } from "react-final-form";

import List from "./List";

function App() {
  const [rockets, setRockets] = useState([]);

  const onSubmit = (data, formData) => {
    let newRocket = {
      name: data.rocketname,
      rocketType: data.rockettype,
      engineType: data.enginetype,
      engineNumber: data.enginenumber,
      sent: Date.now(),
    };
    setRockets([...rockets, newRocket]);
  };
  // Record level validation
  const validate = (values) => {
    const errors = {};
    if (!values.rocketname) {
      errors.rocketname = "You have to name your rocket!";
    }
    if (values.rocketname && values.rocketname.length < 6) {
      errors.rocketname = "Rocket name has to be atleast 6 characters";
    }
    if (values.terms === false) {
      errors.terms = "You have to accept the risk";
    }
    if (values.enginetype === "Marlin" && values.enginenumber < 3) {
      errors.enginenumber =
        "Weak Rocket, You have to Change Egine type, or add more engines";
    }
    return errors;
  };
//Field level validation
  const isTrue = (value) => (value === true ? undefined : "required");

  return (
    <div className="App">
      <div className="container m-5">
        <div className="row">
          {/* Card For the Form only */}
          <div className="card col-4">
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={{
                rocketname: "",
                rockettype: "Falcon 1",
                enginetype: "Marlin",
                enginenumber: "",
                terms: false,
              }}
              render={({ handleSubmit, values }) => (
                <form className="g-3" onSubmit={handleSubmit}>
                  <div className="m-3">
                    <Field
                      name="rocketname"
                      render={({ input, meta }) => (
                        <div>
                          <label htmlFor="rocketname" className="form-label">
                            Rocket Name
                          </label>
                          <input
                            {...input}
                            className={
                              meta.touched && meta.error
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          {meta.touched && meta.error && (
                            <span className="invalid-feedback">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="m-3">
                    <p>Select Rocket</p>
                    <Field
                      name="rockettype"
                      component="select"
                      className="form-select"
                    >
                      <option value="Falcon 1">Falcon 1</option>
                      <option value="Falcon 9">Falcon 9</option>
                      <option value="Falcon Heavy ">Falcon Heavy </option>
                    </Field>
                  </div>

                  <div className="m-3">
                    <p>Select engine</p>
                    <Field
                      name="enginetype"
                      component="select"
                      className="form-select"
                    >
                      <option value="Marlin">Marlin</option>
                      <option value="Raptor">Raptor</option>
                      <option value="Raptor 2">Raptor 2</option>
                      <option value="Super Draco">Super Draco</option>
                    </Field>
                  </div>

                  <div className="m-3">
                    <Field
                      name="enginenumber"
                      render={({ input, meta }) => (
                        <div>
                          <label htmlFor="enginenumber" className="form-label">
                            Number of Engines
                          </label>
                          <input
                            {...input}
                            className={
                              meta.touched && meta.error
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            type="number"
                            max="12"
                            min="1"
                          />
                          {meta.touched && meta.error && (
                            <span className="invalid-feedback">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="m-3 form-check">
                    <Field
                      name="terms"
                      type="checkbox"
                      id="terms"
                      validate={isTrue}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            type="checkbox"
                            id="terms"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="terms">
                            Agree To Take Risk
                          </label>
                          <br />
                          {meta.touched && meta.error && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  <div className="m-3 form-check">
                    <Field
                      name="terms2"
                      type="checkbox"
                      id="terms2"
                      validate={isTrue}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            type="checkbox"
                            id="terms2"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="terms2">
                            Send msg to Elon
                          </label>
                          <br />
                          {meta.touched && meta.error && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  {values.terms2 === true && (
                    <div className="m-3">
                      <Field
                        name="msg"
                        type="input"
                        component="textarea"
                        className="form-control"
                      ></Field>
                    </div>
                  )}

                  <div className="col-12">
                    <button className="btn btn-primary m-3" type="submit">
                      Send to Mars
                    </button>
                  </div>
                  {JSON.stringify(values)}
                </form>
              )}
            ></Form>
          </div>

          {/* Side for sent Rockets */}
          <div className="col-8 bg-secondary">
            <div className="container d-block">
              <div className="row">
                <List list={rockets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
