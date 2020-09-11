import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Jumbotron, Container } from "react-bootstrap";

export default function Profile() {
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  console.log(jwt_decode(localStorage.usertoken));

  useEffect(() => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    setValues({
      email: decoded.identity.email,
      firstName: decoded.identity.firstName,
      lastName: decoded.identity.lastName,
    });
  }, []);

  // componentDidMount() {
  //     const token = localStorage.usertoken
  //     const decoded = jwt_decode(token)
  //     setValues({
  //         username: decoded.identity.username,
  //         firstName: decoded.identity.firstName,
  //         lastName: decoded.identity.lastName,
  //         email: decoded.identity.email
  //     })
  //   }

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1 className="text-center">Hello {values.email}!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                style={{ borderRadius: "100px" }}
                src="https://media-exp1.licdn.com/dms/image/C4E03AQESA9cm_tCYow/profile-displayphoto-shrink_200_200/0?e=1603929600&v=beta&t=dXSYQ2p67McGlDnzyuH7_dqBNcUMPwKTGJ2yrs0onQk"
                alt=""
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h2>
                {values.firstName} {values.lastName}
              </h2>
              <div>
                <h5>40 posts</h5>
                <h5>40 followers</h5>
                <h5>40 following</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
