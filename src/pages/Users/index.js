import "./styles.scoped.css";
import React, { useState, useEffect } from "react";
import TileComponent from "../../components/TileComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { listUser, deleteUser } from "../../utils/zoomService";
import { humanDate } from "../../utils/helpers";
import { useHistory } from "react-router-dom";

export default function Users() {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeUser = async (item) => {
    if (window.confirm("Are you sure?")) {
      setLoading(true);
      const resp = await deleteUser(item._id);
      refreshData();
      resp.err ? alert("Something went wrong") : alert("User was deleted!");
    }
  };

  const gotoCreateMeeting = (item) => {
    history.push(`/create-meeting?userId=${item._id}`);
  };

  const tilesConfig = {
    columns: [
      {
        name: "ID",
        key: "_id"
      },
      {
        name: "First Name",
        key: "firstName"
      },
      {
        name: "Last Name",
        key: "lastName"
      },
      {
        name: "E-mail",
        key: "email"
      },
      {
        name: "Created At",
        key: "createdAt",
        formatter: humanDate,
        class: "date-tile"
      }
    ],
    actions: [
      {
        name: "❌ Delete",
        class: "delete-option",
        handler: removeUser
      },
      {
        name: "💻 Create Meeting",
        class: "meeting-option",
        handler: gotoCreateMeeting
      }
    ]
  };

  const refreshData = async () => {
    setLoading(true);
    const resp = await listUser();
    setUsers(resp.data);
    resp.err ? setError(resp.err.message) : setError(null);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="container">
      <h1>Users page</h1>
      <br />
      <TileComponent
        records={users}
        actions={tilesConfig.actions}
        columns={tilesConfig.columns}
      />
      {loading ? <LoadingComponent /> : null}
    </div>
  );
}
