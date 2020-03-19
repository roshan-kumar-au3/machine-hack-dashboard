import React from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Dropdown.scss';

class ExampleDropdown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            selectedHackathon: this.props.selectedHackathon,
            hackathonList: this.props.hackathonList
        }
    }

    // async componentDidMount() {
    //     // const response = await axios.get('http://ec2-3-0-19-198.ap-southeast-1.compute.amazonaws.com/hackathonList');
    //     // const data = response.data
    //     // console.log(data);
    //     // this.setState({ hackathonList: data})
    // }
    toggle = () => this.setState({dropdownOpen : !this.state.dropdownOpen});
    // hackathonValue = (event) => this.setState({selectedHackathon: event.target.value})
    
    render() {
        return (
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.props.selectedHackathon ? this.props.selectedHackathon : "Select Hackathon"}
              </DropdownToggle>
            <DropdownMenu>
              {
                this.state.hackathonList.map(hackathon => {
                return <DropdownItem className="dropdown-item" key={hackathon.Name} onClick={this.props.hackathonValue} value={hackathon.Name}>{hackathon.Name}</DropdownItem>
                })
              }
              {/* <DropdownItem header>Header</DropdownItem> */}
              
              {/* <DropdownItem disabled>Action (disabled)</DropdownItem>
              <DropdownItem divider /> */}
              {/* <DropdownItem className="dropdown-item" onClick={this.hackathonValue} value="Hackathon two">Hackathon two</DropdownItem>
              <DropdownItem className="dropdown-item" onClick={this.hackathonValue} value="Hackathon three">Hackathon three</DropdownItem>
              <DropdownItem className="dropdown-item" onClick={this.hackathonValue} value="Hackathon four">Hackathon four</DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        );
    }
}


export default ExampleDropdown;