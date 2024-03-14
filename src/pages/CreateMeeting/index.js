import React, { useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import NotificationComponent from "../../components/NotificationComponent";
import { useQuery } from "../../utils/helpers";
import { createMeeting } from "../../utils/zoomService";

const successMsg = "Meeting successfully created!";
const errorMsg = "Ops! Something went wrong";

const partialPayload = {
  settings: {
    host_video: false,
    participant_video: false,
    join_before_host: false,
    mute_upon_entry: true,
    use_pmi: false,
    approval_type: 0
  }
};

const initialFormState = {
  agenda: null,
  type: 1,
  topic: "Zoom meeting from react web app",
  password: null,
  start_time: null
};

export default function CreateMeeting() {
  const { userId: userIdQS } = useQuery();
  const [userId, setUserId] = useState(userIdQS);
  const [notification, setNotification] = useState({});
  const [form, setForm] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const cleanUp = () => {
    setForm(initialFormState);
    setUserId(null);
  };

  const showNotification = (error) => {
    const notiObj = error
      ? { msg: errorMsg, type: "danger" }
      : { msg: successMsg, type: "success" };
    setNotification(notiObj);
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    if (form.agenda && form.type && form.topic && userId) {
      if ((form.type == 2 && form.start_time) || form.type == 1) {
        setEnableSubmit(true);
      } else {
        setEnableSubmit(false);
      }
    } else {
      setEnableSubmit(false);
    }
  }, [form, userId]);

  const onCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, ...partialPayload };
    const resp = await createMeeting(userId, payload);
    showNotification(resp.err);
    cleanUp();
    setLoading(false);
  };
  return (
    <div className="container">
      <h1>Create Meeting page</h1>
      <br />
      <form className="form-container" onSubmit={(e) => onCreateUser(e)}>
        <div className="input-group">
          <label className="input-label">User ID</label>
          <input
            name="topic"
            className="input-val"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Topic</label>
          <input
            name="topic"
            className="input-val"
            value={form.topic}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Description</label>
          <input
            name="agenda"
            className="input-val"
            value={form.agenda}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            name="password"
            className="input-val"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Type</label>
          <select
            name="type"
            className="input-val"
            onChange={handleChange}
            value={form.type}
          >
            <option value="1">Instant</option>
            <option value="2">Scheduled</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Start time</label>
          <input
            type="datetime-local"
            name="start_time"
            className="input-val"
            value={form.start_time}
            onChange={handleChange}
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
