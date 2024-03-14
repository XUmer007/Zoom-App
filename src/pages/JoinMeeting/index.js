import "./styles.scoped.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const WEB_URI = "https://be2u7.csb.app";
export default function JoinMeeting() {
  const history = useHistory();
  const [meetingNumber, setMeetingNumber] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(
    (ar) => {
      if (meetingNumber && password && username) {
        setEnableSubmit(true);
      } else {
        setEnableSubmit(false);
      }
    },
    [meetingNumber, password, username]
  );

  const goToVideoCall = (role) => {
    /* const url = `${WEB_URI}/video-call?username=${username}&meetingNumber=${meetingNumber}&password=${password}&role=${role}`;
    let windowReference = window.open(
      url,
      "_blank",
      "width=600,height=600,scrollbars=0,resizable=yes"
    ); */
    const url = `/video-call?username=${username}&meetingNumber=${meetingNumber}&password=${password}&role=${role}`;
    history.push(url);
  };

  return (
    <div className="container">
      <h1>Join Meeting Page</h1>
      <br />
      <div className="form-container">
        <div className="input-group">
          <label className="input-label">Username / Alias</label>
          <input
            name="username"
            className="input-val"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Meeting Number</label>
          <input
            name="meetingNumber"
            className="input-val"
            value={meetingNumber}
            onChange={(e) => setMeetingNumber(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            name="password"
            className="input-val"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="btn-group">
          <button
            onClick={(e) => goToVideoCall(1)}
            className="btn btn-item host"
            disabled={!enableSubmit}
          >
            Join as Host{" "}
            <span role="img" aria-label="technology-man">
              💻
            </span>
          </button>
          <button
            onClick={(e) => goToVideoCall(0)}
            className="btn btn-item participant"
            disabled={!enableSubmit}
          >
            Join as Participant{" "}
            <span role="img" aria-label="technology-man">
              👨🏻‍💻
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
