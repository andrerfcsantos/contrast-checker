import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RGBPicker from "../Components/RGBPicker";
import classes from "./CheckerPage.module.css"

function bigFactor(c) {
    const sRGB = c / 255.0
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow(((sRGB + 0.055) / 1.055), 2.4)
}

function luminance(red, green, blue) {
    let [R, G, B] = [bigFactor(red), bigFactor(green), bigFactor(blue)]
    return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

class CheckerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundRed: 0,
            backgroundGreen: 0,
            backgroundBlue: 0,
            textRed: 255,
            textGreen: 255,
            textBlue: 255,
        }
        this.handleRedBackgroundChange = this.handleRedBackgroundChange.bind(this)
        this.handleGreenBackgroundChange = this.handleGreenBackgroundChange.bind(this)
        this.handleBlueBackgroundChange = this.handleBlueBackgroundChange.bind(this)

        this.handleRedTextChange = this.handleRedTextChange.bind(this)
        this.handleGreenTextChange = this.handleGreenTextChange.bind(this)
        this.handleBlueTextChange = this.handleBlueTextChange.bind(this)
    }

    handleRedBackgroundChange(e) {
        this.setState({
            backgroundRed: e.target.value,
        })
    }

    handleGreenBackgroundChange(e) {
        this.setState({
            backgroundGreen: e.target.value,
        })
    }

    handleBlueBackgroundChange(e) {
        this.setState({
            backgroundBlue: e.target.value,
        })
    }

    handleRedTextChange(e) {
        this.setState({
            textRed: e.target.value,
        })
    }

    handleGreenTextChange(e) {
        this.setState({
            textGreen: e.target.value,
        })
    }

    handleBlueTextChange(e) {
        this.setState({
            textBlue: e.target.value,
        })
    }

    getTextColorString() {
        return "rgb(" + this.state.textRed + ", " + this.state.textGreen + ", " + this.state.textBlue + ")"
    }

    getBackgroundColorString() {
        return "rgb(" + this.state.backgroundRed + ", " + this.state.backgroundGreen + ", " + this.state.backgroundBlue + ")"
    }

    render() {

        let backgroundL = luminance(this.state.backgroundRed, this.state.backgroundGreen, this.state.backgroundBlue)
        let textL = luminance(this.state.textRed, this.state.textGreen, this.state.textBlue)

        let ratio = 0
        if (backgroundL > textL) {
            ratio = (backgroundL + 0.05) / (textL + 0.05)
        } else {
            ratio = (textL + 0.05) / (backgroundL + 0.05)
        }

        let tripleALargeOk = ratio > 4.5
        let tripleAOk = ratio > 7.0

        let doubleALargeOk = ratio > 3.0
        let doubleAOk = ratio > 4.5

        return (
            <Container className="App">
                <Row className="justify-content-center">
                    <Col sm={12} md={9} lg={8}>
                        <h1>Contrast Checker</h1>
                        <p>
                            The Web Content Accessibility Guidelines (WCAG) defines the minimum contrast ratios
                            between the colors of a text and its background for them to be "distinguishable".
                            Select different background and text colors to see their compliance with WCAG.&nbsp;
                            <a href={"https://www.w3.org/TR/WCAG22/#distinguishable"}
                               target="_blank"
                               rel="noreferrer">
                                More info
                            </a>
                        </p>

                        <div
                            className={classes.contrastDisplay}
                            style={{
                                color: this.getTextColorString(),
                                backgroundColor: this.getBackgroundColorString()
                            }}>
                            <span className={classes.sampleText}>
                                The quick brown fox jumps over the lazy dog.
                            </span>
                        </div>

                        <Container >
                            <Row>
                                <Col sm={12} md={6}>
                                    <p><b>Contrast Ratio: {ratio.toFixed(3)}</b></p>
                                    <p>Background luminance: {backgroundL.toFixed(3)}</p>
                                    <p>Text luminance: {textL.toFixed(3)}</p>
                                </Col>

                                <Col sm={12} md={6}>
                                    <p><b>WCAG Ratings:</b></p>
                                    <p>
                                        <span className={tripleAOk ? classes.ok : classes.bad}> AAA</span> |
                                        <span className={tripleALargeOk ? classes.ok : classes.bad}> AAA (large) </span>
                                    </p>

                                    <p>
                                        <span className={doubleAOk ? classes.ok : classes.bad}> AA</span> |
                                        <span className={doubleALargeOk ? classes.ok : classes.bad}> AA (large) </span>
                                    </p>

                                </Col>

                            </Row>

                        </Container>


                        <Container>
                            <Row>
                                <Col sm={12} md={6}>
                                    <RGBPicker
                                        title="Background color"
                                        colors={{
                                            red: this.state.backgroundRed,
                                            green: this.state.backgroundGreen,
                                            blue: this.state.backgroundBlue,
                                        }}
                                        onRedChange={this.handleRedBackgroundChange}
                                        onGreenChange={this.handleGreenBackgroundChange}
                                        onBlueChange={this.handleBlueBackgroundChange}
                                    />
                                </Col>

                                <Col sm={12} md={6}>
                                    <RGBPicker
                                        title="Text color"
                                        colors={{
                                            red: this.state.textRed,
                                            green: this.state.textGreen,
                                            blue: this.state.textBlue,
                                        }}
                                        onRedChange={this.handleRedTextChange}
                                        onGreenChange={this.handleGreenTextChange}
                                        onBlueChange={this.handleBlueTextChange}
                                    />
                                </Col>
                            </Row>
                        </Container>

                    </Col>

                </Row>
            </Container>
        );
    }
}

export default CheckerPage;
