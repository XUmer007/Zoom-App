import "./styles.scoped.css";
import React, { useState, useEffect } from "react";
import TileComponent from "../../components/TileComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { listMeetings } from "../../utils/zoomService";
import { humanDate } from "../../utils/helpers";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const tilesConfig = {
    columns: [
      {
        name: "Type",
        key: "type"
      },
      {
        name: "User",
        key: "username"
      },
      {
        name: "Topic",
        key: "zoomReference.topic"
      },
      {
        name: "Meeting Number",
        key: "zoomReference.id"
      },
      {
        name: "Password",
        key: "zoomReference.password"
      },
      {
        name: "Created At",
        key: "createdAt",
        formatter: humanDate,
        class: "date-tile"
      }
    ],
    actions: []
  };

  const refreshData = async () => {
    setLoading(true);
    const resp = await listMeetings("all");
    setMeetings(resp.data);
    resp.err ? setError(resp.err.message) : setError(null);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="container">
      <h1>Meetings page</h1>
      <br />
      <TileComponent
        records={meetings}
        actions={tilesConfig.actions}
        columns={tilesConfig.columns}
      />
      {loading ? <LoadingComponent /> : null}
    </div>
  );
}
