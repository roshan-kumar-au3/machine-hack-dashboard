import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonGroupComponent from '../components/ButtonGroup/ButtonGroup';
import './AllUsers.scss'

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        // fetching Users from backend
      axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/admin_panel/sub_stats/${this.props.selectedHackathon}/0`)
      .then(response => {
          let data = response.data;
          console.log(data);
          console.log("fetching user", response.data);
          this.setState({users: response.data})
        //   let outputArr = []
        //   for (let i = 0; i < data.length; i++) {
        //         outputArr.push(data[i].User_ID);
        //   }
        //   let unique = [...new Set(outputArr)];
        //   console.log(unique);
        //   this.setState({totalUsers: unique.length});
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
    render() {
        return (
            <div className="content">
                <Row>
                {
                    this.state.users.map((user) => {
                        return (
                            <Col md={3} key={user["User_ID"]}>
                                <Card>
                                    <CardImg style={{ borderRadius: "50%", width: "50%", alignSelf: "center"}} top width="100%" src={user["Image_url"]} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle>Name: {user["Name"]}</CardTitle>
                                    <CardSubtitle>Best Sore: {user["Best Score"]}</CardSubtitle>
                                    <CardText>Date of Submission: {user["Date of Submission"]}</CardText>
                                    <Button href={user["Profile_url"]} target="_blank"  rel="noopener noreferrer">Go to Profile </Button>
                                    </CardBody>
                                    <Row>
                                    {/* <Col lg={4}>
                                      <ButtonGroupComponent userId={user["User_ID"]}  />
                                    </Col>     */}
                                    {/* {
                                        axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/p_card/${user["User_ID"]}`)
                                        .then(response => {
                                            let {data} = response.data;
                                            // let dataArr = [...data];
                                            // console.log(dataArr);
                                            for (let key in data) {
                                                console.log(data[key]);
                                            }
                                            //<a type="button" className="btn-outline-success" href={response.data["linkedin"]}>LinkedIn</a>
                                        })
                                    } */}
                                    </Row>
                                </Card>
                            </Col>
                        )
                    })
                }
                </Row>   
            </div>
        )
    }
}

export default AllUsers;