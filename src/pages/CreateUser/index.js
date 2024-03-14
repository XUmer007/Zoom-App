import React, { useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import NotificationComponent from "../../components/NotificationComponent";
import { createUser } from "../../utils/zoomService";

const successMsg = "User successfully created!";
const errorMsg = "Ops! Something went wrong";

export default function CreateUser() {
  const [notification, setNotification] = useState({});
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect((ar) => {
    if (firstName && lastName && email) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  });

  const showNotification = (error) => {
    const notiObj = error
      ? { msg: errorMsg, type: "danger" }
      : { msg: successMsg, type: "success" };
    setNotification(notiObj);
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const cleanUp = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  const onCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { firstName, lastName, email };
    const resp = await createUser(payload);
    setLoading(false);
    showNotification(resp.err);
    cleanUp();
  };
  return (
    <div className="container">
      <h1>Create User page</h1>
      <br />
      <form className="form-container" onSubmit={(e) => onCreateUser(e)}>
        <div className="input-group">
          <label className="input-label">Firstname</label>
          <input
            name="firstName"
            className="input-val"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Lastname</label>
          <input
            name="lastName"
            className="input-val"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">E-mail</label>
          <input
            name="email"
            className="input-val"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" disabled={!enableSubmit}>
          Create
        </button>
      </form>
      <br />
      {loading ? <LoadingComponent /> : null}
      {notification.msg ? (
        <NotificationComponent
          message={notification.msg}
          type={notification.type}
        />
      ) : null}
    </div>
  );
}
