import { useState } from "react";
import { Form, Field } from "react-final-form";

function App() {
  const [rockets, setRockets] = useState([]);

  const onSubmit = (data, formData) => {
    console.log(data);
    const newRocket = {
      name: data.rocketname,
      rocketType: data.rockettype,
      engineType: data.enginetype,
      engineNumber: data.enginenumbers,
      sent:Date.now()
    };
    setRockets([...rockets, newRocket]);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.rocketname) {
      errors.rocketname = "You have to name your roket!";
    }
    if (values.terms === false) {
      errors.terms = "You have to accept the risk";
    }
    return errors;
  };

  const isTrue = value => (value===true ? undefined : "required")

  const formatDate =(dateStamp)=>{
    let extractedDate = new Date(dateStamp);
    let tls = extractedDate.toLocaleString();
    return `Launched at: ${tls}`
  }


  const renderRockets = (rockets) => {
    if (rockets.length) {
      return rockets.map((rocket) => {
        return (
          <div
            className="card col-3 m-2"
            key={Date.now()}
            style={{ height: "fit-content" }}
          >
            <img
              src="https://img.freepik.com/free-vector/rocket-doodle-space-sketch-cartoon_507816-294.jpg"
              className="card-img-top"
              style={{ width: "auto" }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{rocket.name}</h5>
              <p>{rocket.rocketType}</p>
              <p>Engines:{rocket.engineNumber} x {rocket.engineType}</p>
              <p>{rocket.engineNumber}</p>
              <p>{formatDate(rocket.sent)}</p>
            </div>
          </div>
        );
      });
    }
  };

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
                enginenumbers:"1",
                terms:false
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
                    {/* in the next field i am using render again because i don't know what component to specify for number type */}
                    <Field
                      name="enginenumbers"
                      render={({ input, meta }) => (
                        <div>
                          <label htmlFor="rocketname" className="form-label">
                            Number of Engines
                          </label>
                          <input
                            {...input}
                            className="form-control"
                            type="number"
                            max="12"
                            min="1"
                          />
                        </div>
                      )}
                    />
                  </div>


                  <div className="m-3 form-check">
                    <Field
                      name="terms"
                      type="checkbox"
                      component="input"
                      className="form-check-input"
                      id="terms"
                      validate={isTrue}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      Agree To Take Risk
                    </label>
                  </div>

                  <div className="m-3 form-check">
                    <Field
                      name="terms2"
                      type="checkbox"
                      validate={isTrue}
                    >
                      {({ input, meta }) => (
                          <div>
                            <input {...input} type="checkbox" id="terms2" className="form-check-input"/>
                            <label  className="form-check-label" htmlFor="terms2">
                                  Agree To Thank Elon
                                </label>
                                <br/>
                                {meta.touched && meta.error && (
                            <span className="text-danger">
                              {meta.error}
                            </span>
                          )}
                          </div>
                      )}
                    </Field>
                  </div>

                  
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
          <div className="col-8 bg-secondary d-inline-flex">
            {renderRockets(rockets)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
