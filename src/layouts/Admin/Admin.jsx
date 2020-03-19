/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import axios from 'axios';

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.jsx";

import routes from "../../routes.js";

// import logo from "../assets/img/react-logo.png";
import logo from "../../assets/img/react-logo.png"
import Dashboard from "../../views/Dashboard.jsx";
import AllUsers from "../../views/AllUsers.jsx";
import UserProfile from "../../views/UserProfile.jsx";
import Leaderboard from "../../views/Leaderboard.jsx";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "primary",
      sidebarOpened: document.documentElement.className.indexOf("nav-open") !== -1,
      selectedHackathon: "",
      hackathonList: []
    };
  }
  async componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }

    const response = await axios.get('http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/hackathonList');
        const data = response.data
        console.log(data);
        this.setState({ hackathonList: data, selectedHackathon: data[0].Name})
  }


  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  hackathonValue = (event) => {
    this.setState({selectedHackathon: event.target.value});
      // fetching Users from backend
      axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${event.target.value}/0`)
      .then(response => {
          let data = response.data;
          console.log(data);
          console.log("fetching user", response.data);
          this.setState({users: response.data})
          let outputArr = []
          for (let i = 0; i < data.length; i++) {
                outputArr.push(data[i].User_ID);
          }
          let unique = [...new Set(outputArr)];
          console.log(unique);
          this.setState({totalUsers: unique.length});
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  
      //fetching top ten scorers
      axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${event.target.value}/0`)
      .then(response => {
            console.log(response.data);
            let data = response.data
            this.setState({topScorers: data.slice(0, 10)})
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // getRoutes = routes => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://www.creative-tim.com/",
              text: "Machine Hack",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            {/* <Switch >{this.getRoutes(routes)}</Switch> */}
            <Switch>
                  <Route
                      path="/admin/dashboard"
                      component={(props) => <Dashboard {...props} selectedHackathon={this.state.selectedHackathon} 
                      hackathonList={this.state.hackathonList} hackathonValue={this.hackathonValue}  /> }
                  />
                  <Route
                      path="/admin/allusers"
                      component={(props) => <AllUsers {...props} selectedHackathon={this.state.selectedHackathon} /> }
                  />
                  <Route
                      path="/admin/user-profile"
                      component={(props) => <UserProfile {...props} selectedHackathon={this.state.selectedHackathon} /> }
                  />
                  <Route
                      path="/admin/leaderboard"
                      component={(props) => <Leaderboard {...props} selectedHackathon={this.state.selectedHackathon} /> }
                  />
            </Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}

export default Admin;
