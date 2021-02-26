import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css';
import {
    Button,
    Table,
    Container
} from 'react-bootstrap';

class App extends Component{
    constructor(props) {
        super(props)

        this.render = this.render.bind(this);
    }
    
    render() {
        return (
            <div className="App">
                <Container className="header-container">
                    <h1>LAN-Scan</h1>
                </Container>
                <Container>
                    <p className='description'>Scan your network for connected devices! LAN-Scan is a scanning utility implemented in JavaScript using Node.js. Use the "Scan" button below to begin scanning your network for connected devices.</p>
                </Container>
                <Button color='green' className='button' variant='primary' size='lg'>Scan</Button>
                <Container fluid className='table-container'>
                    <Table hover striped borderless className="table-main">
                        <thead>
                            <tr>
                                <th className='table-header'>Devices Found:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>192.168.0.1</td>
                            </tr>
                            <tr>
                                <td>192.168.0.4</td>
                            </tr>
                            <tr>
                                <td>192.168.0.22</td>
                            </tr>
                            <tr>
                                <td>192.168.0.34</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                
            </div>
        );
    }
}

export default App;
