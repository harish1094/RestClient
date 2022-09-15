import React from "react";
import ReactJsonPrint from 'react-json-print';
import Spacer from "react-spacer";
import "./App.css";
import './css/app.css';
/**
   * ResponseData Component
   *
   */

export default class ResponseData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resSection: 1
        };
    }

    render() {
        return (
            <div className="inner-div">
                <div className="res-text">{"Response"} </div>
                <div >{"Status: " + this.props.response.status + " " + this.props.response.statusText}  </div>
                <div >
                    <button
                        className={"menu-button " + (this.state.resSection !== 1 ? "" : "menu-button-active")}
                        onClick={() => this.setState({ resSection: 1 })}>Json</button>
                    <button
                        className={"menu-button " + (this.state.resSection !== 2 ? "" : "menu-button-active")}
                        onClick={() => this.setState({ resSection: 2 })}>Raw</button>
                    <button
                        className={"menu-button " + (this.state.resSection !== 3 ? "" : "menu-button-active")}
                        onClick={() => this.setState({ resSection: 3 })}>Headers</button>
                    <button
                        className={"menu-button " + (this.state.resSection !== 4 ? "" : "menu-button-active")}
                        onClick={() => this.setState({ resSection: 4 })}>Configs</button>
                </div>
                <Spacer height={5} />
                <div className="res-div">
                    {this.state.resSection === 1 ?
                        <ReactJsonPrint dataObject={this.props.response.data} expanded={true} />
                        :
                        this.state.resSection === 2 ?
                            <pre style={{ maxHeight: 300, color: "black" }}>
                                {JSON.stringify(this.props.response.data, null, 2)}
                            </pre>

                            : this.state.resSection === 3 ?
                                <ReactJsonPrint dataObject={this.props.response.headers} expanded={true} />

                                : this.state.resSection === 4 ?
                                    <ReactJsonPrint dataObject={this.props.response.config} expanded={true} />

                                    : null
                    } </div>



            </div>
        );
    }
}


/*
  --accent-color: #3b82f6;
  --accent-light-color: #60a5fa;
  --accent-dark-color: #2563eb;
  --accent-contrast-color: #fff;
  --gradient-from-color: #bfdbfe;
  --gradient-via-color: #60a5fa;
  --gradient-to-color: #2563eb;

*/