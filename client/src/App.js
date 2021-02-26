import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
    Button,
    Table,
    Container,
    Fade,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';

class App extends Component{

    constructor(props) {
        super(props)

        this.render = this.render.bind(this);
        this.callAPI = this.callAPI.bind(this);
        this.renderTableData = this.renderTableData.bind(this);

        this.state = {
            hosts: [],
            isLoading: false,
            loaded: false
        }
    }

    async callAPI() {
        this.setState({isLoading: true});
        this.setState({loaded: false});

        let response = await axios('http://localhost:4000/api/scan', {headers: {"Content-Type": "application/json"}})

        this.setState({hosts: response.data.hosts});
        this.setState({isLoading: false});
        this.setState({loaded: true});
    }

    renderTableData() {
        return this.state.hosts.map((host) => {
            return (
                <tr>
                    <td>
                        <Container className="table-host-container">{host}</Container>
                    </td>
                </tr>
            )
        })
    }

    setRefresh() {

    }
    
    render() {
        return (
            <div className="App">

                <Container className="header-container">
                    <h1>LAN-Scan</h1>
                </Container>

                <Container>
                    <p className='description'>Scan your network for connected devices! LAN-Scan is a scanning tool implemented entirely in JavaScript using Node.js. Use the "Scan" button below to begin scanning your network for connected devices. Any device found will be displayed with their IP address below.</p>
                </Container>
                {this.state.isLoading ? 
                    <Button disabled className='button' variant='primary' size='lg'>Scanning...</Button> 
                    :
                    <Button onClick={this.callAPI} className='button' variant='primary' size='lg'>Scan</Button> 
                }

                <Container className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Refresh Rate
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">None</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">1 sec</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5 sec</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">10 ssec</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                

                <Container fluid className='table-container'>
                    <Fade in={this.state.loaded}>
                        <Table hover striped borderless className="table-main">
                            <thead>
                                <tr>
                                    <th className='table-header'>Devices Found:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </Fade>

                </Container>
                
            </div>
        );
    }
}

export default App;
