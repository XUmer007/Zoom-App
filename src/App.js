import "./styles.css";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import CreateMeeting from "./pages/CreateMeeting";
import CreateUser from "./pages/CreateUser";
import Meetings from "./pages/Meetings";
import JoinMeeting from "./pages/JoinMeeting";
import VideoCall from "./pages/VideoCall";
import VideoCallEnd from "./pages/VideoCallEnd";

const menu = [
  {
    path: "/",
    name: "Home",
    exact: true
  },
  {
    path: "/users",
    name: "Users"
  },
  {
    path: "/create-user",
    name: "Create User"
  },
  {
    path: "/meetings",
    name: "Meetings"
  },
  {
    path: "/create-meeting",
    name: "Create Meeting"
  },
  {
    path: "/join-meeting",
    name: "Join Meeting"
  }
];

function SideNav() {
  return (
    <div className="main-menu">
      <ul className="menu">
        {menu.map((menuItem, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={menuItem.path}
                exact={menuItem.exact}
                className="menu-item"
                activeClassName="menu-item--active"
              >
                {menuItem.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Header() {
  return <div className="main-header">Header</div>;
}

function Footer() {
  return <div className="main-footer">Footer</div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="full-container">
        <Header />
        <SideNav />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/create-user">
              <CreateUser />
            </Route>
            <Route path="/meetings">
              <Meetings />
            </Route>
            <Route path="/create-meeting">
              <CreateMeeting />
            </Route>
            <Route path="/join-meeting">
              <JoinMeeting />
            </Route>
            <Route path="/video-call">
              <VideoCall />
            </Route>
            <Route path="/video-call-end">
              <VideoCallEnd />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
