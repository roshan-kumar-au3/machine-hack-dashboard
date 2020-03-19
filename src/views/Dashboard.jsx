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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import './Dashboard.scss';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";

// // core components
// import {
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4
// } from "../variables/charts";
import BarChart from "../components/BarChart/BarChart";
import ExampleDropdown from "../components/Dropdown/Dropdown";




class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      users: [],
      uniqueUsers: [],
      totalUsers: "",
      chartExample3: {},
      topScorers: [],
      selectedHackathon: this.props.selectedHackathon,
    };
  }

  componentDidMount() {

    // const response = await axios.get('http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/hackathonList');
    //     const data = response.data
    //     console.log(data);
    //     this.setState({ hackathonList: data, selectedHackathon: data[0].Name})

    // fetching Users from backend
      axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${this.state.selectedHackathon}/0`)
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
      axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${this.state.selectedHackathon}/0`)
      .then(response => {
            console.log(response.data);
            let data = response.data
            this.setState({topScorers: data.slice(0, 10)})
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  // hackathonValue = (event) => {
  //   this.setState({selectedHackathon: event.target.value});
  //     // fetching Users from backend
  //     axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${event.target.value}/0`)
  //     .then(response => {
  //         let data = response.data;
  //         console.log(data);
  //         console.log("fetching user", response.data);
  //         this.setState({users: response.data})
  //         let outputArr = []
  //         for (let i = 0; i < data.length; i++) {
  //               outputArr.push(data[i].User_ID);
  //         }
  //         let unique = [...new Set(outputArr)];
  //         console.log(unique);
  //         this.setState({totalUsers: unique.length});
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  
  //     //fetching top ten scorers
  //     axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${event.target.value}/0`)
  //     .then(response => {
  //           console.log(response.data);
  //           let data = response.data
  //           this.setState({topScorers: data.slice(0, 10)})
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }
    

    // get Maximum Score from all submission
    getMax = () => {
      let outputArr = [];
      let { users } = this.state;
      for (let i = 0; i < users.length; i++) {
        if(users[i]["Best Score"] !== 12345){
          outputArr.push(users[i]["Best Score"]);
        }
       }
       let max = Math.max(...outputArr);
       console.log(outputArr);
      // console.log(max)
       return max;
    }
  
    setBgChartData = name => {
      this.setState({
        bigChartData: name
      });
    };


    //get minimum score from all submission
    getMin = () => {
      let outputArr = [];
      let { users } = this.state;
      for (let i = 0; i < users.length; i++) {
        if(users[i]["Best Score"] !== 12345){
          outputArr.push(users[i]["Best Score"]);
        }
       }
       let min = Math.min(...outputArr);
       console.log(outputArr);
      //  console.log(maxScore);
      console.log(min);
       return min;
    }
  
    //get average score from all submission
    getAvg = () => {
      let outputArr = [];
      let { users } = this.state;
      for (let i = 0; i < users.length; i++) {
        if(users[i]["Best Score"] !== 12345){
          outputArr.push(users[i]["Best Score"]);
        }
       }
      var sum = outputArr.reduce(function(a, b){
        return a + b;
       }, 0);
      //  console.log(sum);
       let avg = (sum / users.length);
       return avg;
    }

  render() {
    var tasks = [];
    // var number;
    for (var i = 0; i < this.state.topScorers.length; i++) {
      // number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>
            <img style={{
              borderRadius: "50%",
              height: "55px",
              width: "auto"
            }} src={this.state.topScorers[i].Image_url} alt={this.state.topScorers[i].Name}/>
          </td>
          <td>{this.state.topScorers[i].Name}</td>
          <td>{this.state.topScorers[i]['Best Score'].toFixed(3)}</td>
          <td>{this.state.topScorers[i]['Latest Score'].toFixed(3)}</td>
          <td>{this.state.topScorers[i]['Date of Submission']}</td>
          <td>{this.state.topScorers[i]['Time']}</td>
        </tr>
      );
    }
    if (this.state.users.length === 0) {
      return <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}><div className="loader"></div></div>
    } else {

    return (
      <>
        <div className="content">
          <Row>
            <Col className="mb-3" md="2">
              <ExampleDropdown hackathonList={this.props.hackathonList} 
              hackathonValue={this.props.hackathonValue} selectedHackathon={this.props.selectedHackathon} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
                <Card className="total-users">
                    {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                    <CardBody>
                      <CardTitle>Total Users</CardTitle>
                      <h3 style={{
                        fontSize: "18px",
                        padding: "0px",
                        margin: "0px"
                      }}>{this.state.totalUsers}</h3>
                      <CardText>Total number of users participated in the hackathon.</CardText>
                    </CardBody>
                  </Card>
            </Col>

            <Col md="6">
            <Card className="total-submission">
                {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                <CardBody>
                  <CardTitle>Total Submission</CardTitle>
                  <h3 style={{
                    fontSize: "18px",
                    padding: "0px",
                    margin: "0px"
                  }}>{this.state.users.length}</h3>
                  <CardText>Total number of Submission in this hackathon</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="stat-card-min">
                  {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                  <CardBody>
                    <CardTitle>Min Score</CardTitle>
                    <h3 style={{
                      fontSize: "21px",
                      padding: "0px",
                      margin: "0px"
                    }}>{this.getMin().toFixed(3)}</h3>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4">
              <Card className="stat-card-max">
                  {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                  <CardBody>
                    <CardTitle>Max Score</CardTitle>
                    {/* <CardSubtitle style={{
                      fontSize: "21px"
                    }}>{this.getMax().toFixed(3)}</CardSubtitle> */}
                    <h3 style={{
                      fontSize: "18px",
                      padding: "0px",
                      margin: "0px"
                    }}>{this.getMax().toFixed(3)}</h3>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4">
              <Card className="stat-card-avg">
                  {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                  <CardBody>
                    <CardTitle>Average Score</CardTitle>
                    {/* <CardSubtitle style={{
                      fontSize: "21px"
                    }}>{this.getAvg().toFixed(3)}</CardSubtitle> */}
                    <h3 style={{
                      fontSize: "18px",
                      padding: "0px",
                      margin: "0px"
                    }}>{this.getAvg().toFixed(3)}</h3>
                  </CardBody>
                </Card>
              </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <h3 className="card-category">Daily Submission</h3>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" style={{
                    height: "245px"
                  }}>
                    {/* <Bar
                      data={this.state.chartExample3.data}
                      options={this.state.chartExample3.options}
                    /> */}
                    <BarChart />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          <Row>
            {/* <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Tasks(5)</h6>
                  <p className="card-category d-inline"> today</p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Update the Documentation</p>
                            <p className="text-muted">
                              Dwuamish Head, Seattle, WA 8:47 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip636901683"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">GDPR Compliance</p>
                            <p className="text-muted">
                              The GDPR is a regulation that requires businesses
                              to protect the personal data and privacy of Europe
                              citizens for transactions that occur within EU
                              member states.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip457194718"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Solve the issues</p>
                            <p className="text-muted">
                              Fifty percent of all respondents said they would
                              be more likely to shop at a company
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip362404923"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip362404923"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Release v2.0.0</p>
                            <p className="text-muted">
                              Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip818217463"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip818217463"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Export the processed files</p>
                            <p className="text-muted">
                              The report also shows that consumers will not
                              easily forgive a company once a breach exposing
                              their personal data occurs.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip831835125"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip831835125"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Arival at export process</p>
                            <p className="text-muted">
                              Capitol Hill, Seattle, WA 12:34 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip217595172"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip217595172"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
            <Col lg="12" md="12">
              <Card className="table-card">
                <CardHeader>
                  <CardTitle tag="h4">Top Ten Scorers</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter text-center" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Best Score</th>
                        <th>Latest Score</th>
                        <th>Date of Submission</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                           {tasks}
                               {/* <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
 }
}

export default Dashboard;
