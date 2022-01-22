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
    Row,
    Col,
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
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>LAN Scan</h1>
                            
                            <p className='description'>Scan your network for connected devices! LAN-Scan is a scanning tool implemented entirely in JavaScript using Node.js. Use the "Scan" button below to begin scanning your network for connected devices. Any device found will be displayed with their IP address below.</p>
                            
                            {this.state.isLoading ? 
                                <Button disabled className='button loading' variant='primary' size='lg'>Scanning...</Button> 
                                :
                                <Button onClick={this.callAPI} className='button' variant='primary' size='lg'>Scan</Button> 
                            }
                        </Col>
                        
                        <Col md={12}>
                            <Fade in={this.state.loaded}>
                                <div>
                                    <h2>Found {this.state.hosts.length} devices</h2>
                                    <ul className="nodes">
                                    {
                                        this.state.hosts.map((host) => {
                                            return (
                                                <li className='node'>{host}</li>
                                            );
                                        })
                                    }
                                    </ul>
                                </div>
                            </Fade>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
