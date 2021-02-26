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
                <h1>lan-scan-js</h1>
                <Button variant='primary' size='lg'>Scan</Button>
                <Container>
                    <Table className="table-main">
                        <thead>
                            <tr>
                                <th>Hosts</th>
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
