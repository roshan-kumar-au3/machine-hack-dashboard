import React, { Component } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

class ButtonGroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            linkObj: {}
        }
    }

    async componentDidMount(){
        const response = await axios.get(`http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/p_card/${this.props.userId}`)
        console.log(response.data);
        this.setState({linkObj: response.data})
    }
    render() {
        return (
            <>
            <ButtonGroup>
             <a type="button" className="btn-outline-success" href={this.state.linkObj.linkedin}>LinkedIn</a>
             <button className="btn-outline-success" href={this.state.linkObj.linkedin}>Github</button>
            </ButtonGroup>
            </>
        )
    }
}

export default ButtonGroupComponent;
