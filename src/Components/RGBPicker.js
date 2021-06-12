import React from "react";
import Form from 'react-bootstrap/Form'
import { v4 as uuidv4 } from 'uuid';


class RGBPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            red: props.colors.red,
            green: props.colors.green,
            blue: props.colors.blue
        }
    }

    render() {
        let id = uuidv4().replace("-", "")

        return (
            <>
                <h3>{this.props.title}</h3>
                <Form>
                    <Form.Group controlId={"red-" + id}>
                        <Form.Label>Red - <span>{this.props.colors.red} </span></Form.Label>
                        <Form.Control type="range" min={0} max={255} step={1} value={this.props.colors.red} onChange={ this.props.onRedChange }/>
                    </Form.Group>

                    <Form.Group controlId={"green-" + id}>
                        <Form.Label>Green - <span>{this.props.colors.green} </span></Form.Label>
                        <Form.Control type="range" min={0} max={255} step={1} value={this.props.colors.green} onChange={this.props.onGreenChange}/>
                    </Form.Group>

                    <Form.Group controlId={"blue-" + id}>
                        <Form.Label column>Blue - <span>{this.props.colors.blue} </span></Form.Label>
                        <Form.Control type="range" min={0} max={255} step={1} value={this.props.colors.blue} onChange={this.props.onBlueChange}/>
                    </Form.Group>
                </Form>
            </>
        );
    }
}

export default RGBPicker;
