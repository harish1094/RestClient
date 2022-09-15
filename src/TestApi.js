import React from "react";
import { Col, Row } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import ReactJsonPrint from 'react-json-print';
import Spacer from "react-spacer";
import "../App.css";
import axiosClient from "../services/axios_client";
import { uriEncode } from "../utils/helpers";
import withNavigation from '../utils/navigator';
import Button from "./components/Button";
import CustomDropDown from "./components/CustomDropDown";
import './css/app.css';
/**
   * Table Component
   *
   * Fetches list of connected Tables from all the connectors 
   * and renders it in UI
   *
   */
class TestAPI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            method: "GET",
            methodOption: [{ label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
            { label: "DELETE", value: "DELETE" }],
            params: [{}, {}, {}],
            headers: [{}, {}, {}],
            body: "",
            showAlert: false,
            url: "https://reqres.in/api/products/3",
            response: "",
            errorMsg: {},
            inputSection: 0,
            token: "",
            loading: false
        };

        this.dialogRef = React.createRef();
        this.onMethodChange = this.onMethodChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onParamsKeyChange = this.onParamsKeyChange.bind(this);
        this.onParamsValueChange = this.onParamsValueChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
    }

    onMethodChange(e) {
        this.setState({ method: e.value });
    }

    onUrlChange(e) {
        this.setState({ url: e.target.value });
    }

    onParamsKeyChange(e) {

    }

    onParamsValueChange(e) {

    }

    onSend(e) {
        this.setState({ loading: true })
        let endPoint = uriEncode(this.state.url);
        axiosClient({
            method: this.state.method,
            url: endPoint,
            /*  data: {
               firstName: 'Fred',
               lastName: 'Flintstone'
             } */
        })/* ;
        axiosClient.delete(endPoint) */.then((response) => {
            console.log(response)
            this.setState({ response: response, loading: false });
        })
            .catch((error) => {
                console.log(error)
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <>
                <Row >
                    <Col xs="8" md="8" lg="8">
                        <Row>
                            <Col xs="auto" md="auto" lg="auto">
                                <CustomDropDown
                                    placeholder="GET"
                                    id={"select-method"}
                                    options={this.state.methodOption}
                                    isSearchable={true}
                                    value={{ value: this.state.method, label: this.state.method }}
                                    onChange={this.onMethodChange}
                                />
                            </Col>
                            <Col>
                                <input name="url" aria-label="url" placeholder="https://domain.name.com:8000"
                                    type="text" id="url" className="form-control" value="https://reqres.in/api/products/3"
                                    onChange={this.onUrlChange}></input></Col>

                            <Col xs="auto" md="auto" lg="auto">
                                <Button
                                    id={"send"}
                                    className="primary-button float-end"
                                    title={this.state.loading ?
                                        <div className="loading-anim-container">
                                            <div /><div /><div />
                                        </div>
                                        : "Send"}
                                    onClick={this.onSend}
                                /></Col>
                        </Row>
                        <Spacer height={20} />
                        <div >
                            <button
                                className={"menu-button " + (this.state.inputSection !== 1 ? "" : "menu-button-active")}
                                onClick={() => this.setState({ inputSection: 1 })}>Parameters</button>
                            <button
                                className={"menu-button " + (this.state.inputSection !== 2 ? "" : "menu-button-active")}
                                onClick={() => this.setState({ inputSection: 2 })}>Body</button>
                            <button
                                className={"menu-button " + (this.state.inputSection !== 3 ? "" : "menu-button-active")}
                                onClick={() => this.setState({ inputSection: 3 })}>Headers</button>
                            <button
                                className={"menu-button " + (this.state.inputSection !== 4 ? "" : "menu-button-active")}
                                onClick={() => this.setState({ inputSection: 4 })}>Authorization</button>
                        </div>
                        <Spacer height={5} />
                        <div>
                            {this.state.inputSection === 1 ?
                                this.state.params.map((element, index) => (
                                    <div key={"table-column-" + index}>
                                        <Row >
                                            <Col md="auto" style={{ justifyContent: "center", padding: 0 }}>
                                                <div
                                                    style={{ padding: "6px 15px", border: "1px solid #ced4da", borderRadius: 4, marginLeft: 12 }}>
                                                    {index + 1}
                                                </div>
                                            </Col>
                                            <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                <input name="url1" aria-label="url1" placeholder="https://domain.name.com:8000"
                                                    type="text" id="url1" className="form-control" value="https://reqres.in/api/products/3"
                                                    onChange={this.onUrlChange}></input>
                                            </Col>

                                            <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                <input name="url2" aria-label="url2" placeholder="https://domain.name.com:8000"
                                                    type="text" id="url2" className="form-control" value="https://reqres.in/api/products/3"
                                                    onChange={this.onUrlChange}></input>
                                            </Col>

                                            {element.selectedColumn !== "" ?
                                                <Col style={{}}><div id={"delete-column"}
                                                    className="column-delete-container"
                                                    onClick={() =>
                                                        this.onDeleteClick(index)}>
                                                    <BsTrash size={36}
                                                        className="delete-button"
                                                        color="rgb(32, 32, 32)" />
                                                </div></Col> :
                                                null}  </Row>
                                        <Spacer height={10} />  </div>))

                                :
                                this.state.inputSection === 2 ?
                                    <textarea name="url2" style={{ resize: "none" }}

                                        aria-label="url2" placeholder="https://domain.name.com:8000"
                                        rows="8"
                                        type="textarea" id="url2" className="form-control" value="https://reqres.in/api/products/3"
                                        onChange={this.onUrlChange}></textarea>

                                    : this.state.inputSection === 3 ?
                                        this.state.headers.map((element, index) => (
                                            <div key={"table-column-" + index}>
                                                <Row >
                                                    <Col md="auto" style={{ justifyContent: "center", padding: 0 }}>
                                                        <div
                                                            style={{ padding: "6px 15px", border: "1px solid #ced4da", borderRadius: 4, marginLeft: 12 }}>
                                                            {index + 1}
                                                        </div>
                                                    </Col>
                                                    <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                        <input name="url1" aria-label="url1" placeholder="https://domain.name.com:8000"
                                                            type="text" id="url1" className="form-control" value="https://reqres.in/api/products/3"
                                                            onChange={this.onUrlChange}></input>
                                                    </Col>

                                                    <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                        <input name="url2" aria-label="url2" placeholder="https://domain.name.com:8000"
                                                            type="text" id="url2" className="form-control" value="https://reqres.in/api/products/3"
                                                            onChange={this.onUrlChange}></input>
                                                    </Col>

                                                    {element.selectedColumn !== "" ?
                                                        <Col style={{}}><div id={"delete-column"}
                                                            className="column-delete-container"
                                                            onClick={() =>
                                                                this.onDeleteClick(index)}>
                                                            <BsTrash size={36}
                                                                className="delete-button"
                                                                color="rgb(32, 32, 32)" />
                                                        </div></Col> :
                                                        null}  </Row>
                                                <Spacer height={10} />  </div>))

                                        : this.state.inputSection === 4 ?
                                            <div key={"table-column"}>
                                                <Row >
                                                    <Col md="auto" style={{ justifyContent: "center", padding: 0 }}>
                                                        <div
                                                            style={{ padding: "6px 15px", border: "1px solid #ced4da", borderRadius: 4, marginLeft: 12 }}>
                                                            {1}
                                                        </div>
                                                    </Col>
                                                    <Col md={{ span: 3 }} style={{ padding: 0 }}>
                                                        <div
                                                            style={{ padding: "6px 15px", border: "1px solid #ced4da", borderRadius: 4, marginLeft: 12 }}>
                                                            {"Bearer "}
                                                        </div>
                                                    </Col>

                                                    <Col md={{ span: 7 }} style={{ padding: 0 }}>
                                                        <input name="token" aria-label="Token" placeholder="Token"
                                                            type="text" id="token" className="form-control" value={this.state.token}
                                                            onChange={this.onUrlChange}></input>
                                                    </Col>


                                                    <Col style={{}}><div id={"delete-column"}
                                                        className="column-delete-container"
                                                        onClick={() => { }}>
                                                        <BsTrash size={36}
                                                            className="delete-button"
                                                            color="rgb(32, 32, 32)" />
                                                    </div></Col> </Row>
                                                <Spacer height={10} />   </div>

                                            : null
                            } </div>

                        <div >{"Response"} </div>
                        <div >{"status: 200 . Ok"}
                        </div>
                        <Row >
                            <Col xs="5" md="5" lg="5">
                                <pre style={{ maxHeight: 300 }}>
                                    {JSON.stringify(this.state.response.data, null, 2)}

                                </pre></Col>
                            <Col xs="5" md="5" lg="5" style={{ overflow: "auto", maxHeight: 300 }}>
                                <ReactJsonPrint dataObject={this.state.response.data} />
                            </Col>
                            <Col xs="5" md="5" lg="5" style={{ overflow: "auto", maxHeight: 300 }}>
                                <ReactJsonPrint dataObject={this.state.response.config} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="3" md="3" lg="3">
                        <div>{"history"}</div>
                    </Col>

                </Row>
            </>
        );
    }
}

export default withNavigation(TestAPI);

/*
  --accent-color: #3b82f6;
  --accent-light-color: #60a5fa;
  --accent-dark-color: #2563eb;
  --accent-contrast-color: #fff;
  --gradient-from-color: #bfdbfe;
  --gradient-via-color: #60a5fa;
  --gradient-to-color: #2563eb;

*/