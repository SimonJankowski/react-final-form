import React from "react";

const List = ({list})=>{

    const formatDate =(dateStamp)=>{
        let extractedDate = new Date(dateStamp);
        let tls = extractedDate.toLocaleString();
        return `Launched at: ${tls}`
      }

    const renderRockets = () => {
        if (list.length) {
          return list.map((rocket) => {
            return (
              <div
                className="card col-3 m-2"
                key={rocket.sent}
                style={{ height: "fit-content" }}
              >{console.log("i run")}
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
                  <p>{formatDate(rocket.sent)}</p>
                </div>
              </div>
            );
          });
        }
      };

      return <>{renderRockets()}</>
}

export default List