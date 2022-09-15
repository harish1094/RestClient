import axios from "axios";
import React from "react";
import { Col, Row } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import Spacer from "react-spacer";
import "./App.css";
import AnimatedLoader from "./components/AnimatedLoading";
import Button from "./components/Button";
import ConfirmationDialog from "./components/ConfirmationDialog";
import CustomDropDown from "./components/CustomDropDown";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
import './css/app.css';
import History from "./History";
import ResponseData from "./Response";
import { getFromLocalStorage, isValid, storeToLocalStorage } from "./utils/helpers";
/**
   * App
   *
   */
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            method: "GET",
            methodOption: [{ label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
            { label: "DELETE", value: "DELETE" }],
            params: [{ key: "", value: "" }],
            headers: [{ key: "", value: "" }],
            body: "",
            showAlert: false,
            url: "",
            response: "",
            errorMsg: {},
            inputSection: 1,
            token: "",
            invalid: false,
            loading: false,
            history: [],
            recallLoading: false
        };

        this.dialogRef = React.createRef();
        this.onMethodChange = this.onMethodChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onParamsKeyChange = this.onParamsKeyChange.bind(this);
        this.onParamsValueChange = this.onParamsValueChange.bind(this);
        this.onHeaderkeyChange = this.onHeaderkeyChange.bind(this);
        this.onHeaderValueChange = this.onHeaderValueChange.bind(this);
        this.onBodyTextChange = this.onBodyTextChange.bind(this);
        this.onTokenTextChange = this.onTokenTextChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onDeleteParam = this.onDeleteParam.bind(this);
        this.onDeleteHeader = this.onDeleteHeader.bind(this);
        this.onDeleteToken = this.onDeleteToken.bind(this);
        this.recallAPI = this.recallAPI.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
        this.deleteAllHistory = this.deleteAllHistory.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    }

    componentDidMount() {
        let tmp = getFromLocalStorage("history", true);
        console.log(tmp)
        if (isValid(tmp))
            this.setState({ history: tmp.reverse() });
    }

    onMethodChange(e) {
        this.setState({ method: e.value });
    }

    onUrlChange(e) {
        this.setState({ url: e.target.value, invalid: false });
    }

    onParamsKeyChange(e, index) {
        let params = this.state.params;
        if (index === (params.length - 1) && params[params.length - 1].key === "") {
            params.push({ key: "", value: "" });
        }
        params[index].key = e.target.value;
        this.setState({ params: params });

    }

    onParamsValueChange(e, index) {
        let params = this.state.params;
        params[index].value = e.target.value;
        this.setState({ params: params });
    }

    onDeleteParam(index) {
        let params = this.state.params;
        if (index !== (params.length - 1)) {
            params.splice(index, 1);
        }
        this.setState({ params: params });
    }

    onHeaderkeyChange(e, index) {
        let headers = this.state.headers;
        if (index === (headers.length - 1) && headers[headers.length - 1].key === "") {
            headers.push({ key: "", value: "" });
        }
        headers[index].key = e.target.value;
        this.setState({ headers: headers });
    }

    onHeaderValueChange(e, index) {
        let headers = this.state.headers;
        headers[index].value = e.target.value;
        this.setState({ headers: headers });
    }

    onDeleteHeader(index) {
        let headers = this.state.headers;
        if (index !== (headers.length - 1)) {
            headers.splice(index, 1);
        }
        this.setState({ headers: headers });
    }

    onBodyTextChange(e) {
        this.setState({ body: e.target.value });
    }

    onTokenTextChange(e) {
        this.setState({ token: e.target.value });
    }

    onDeleteToken() {
        this.setState({ token: "" });
    }

    recallAPI(config) {
        console.log(config)
        let headers = [];
        let params = [];
        let token = "";
        if (isValid(config.headers) && Object.keys(config.headers).length > 0) {
            Object.keys(config.headers).forEach(function (key) {
                let h = {}
                if (key.includes("Authorization")) {
                    token = config.headers[key].split(" ")[1];
                } else {
                    h.key = key;
                    h.value = config.headers[key];
                    headers.push(h);
                }
            });
        }

        headers.push({ key: "", value: "" });
        if (isValid(config.params) && Object.keys(config.params).length > 0) {
            Object.keys(config.params).forEach(function (key) {
                let p = {};
                p.key = key;
                p.value = config.params[key]
                params.push(p);
            });
        }
        params.push({ key: "", value: "" });
        this.setState({
            body: isValid(config.data) ? JSON.stringify(config.data) : "",
            token: token,
            url: config.url,
            method: config.method,
            headers: headers,
            params: params,
            loading: true,
            recallLoading: true
        });

        window.scrollTo(0, 0);
        setTimeout(() => {
            this.onSend("");
        }, 20);

    }

    onSend(e) {

        if (!isValid(this.state.url)) {
            this.setState({ invalid: true });
            return true;
        }

        this.setState({ loading: true, response: "" })
        let endPoint = encodeURI(this.state.url);
        let options = {
            method: this.state.method,
            url: endPoint
        }

        let params = this.state.params;
        if (params.length > 1) {
            let tmpParams = {};
            for (let i = 0; i < params.length; i++) {
                if (isValid(params[i]) && isValid(params[i].key) && isValid(params[i].value)) {
                    tmpParams[params[i].key] = params[i].value;
                }
            }
            options.params = tmpParams;
        }

        let headers = this.state.headers;

        let apiheaders = {};
        if (headers.length > 1) {
            for (let i = 0; i < headers.length; i++) {
                if (isValid(headers[i]) && isValid(headers[i].key) && isValid(headers[i].value)) {
                    apiheaders[headers[i].key] = headers[i].value;
                }
            }
        }

        if (isValid(this.state.token)) {
            apiheaders["Authorization"] = 'Bearer ' + this.state.token;
        }

        if (Object.keys(apiheaders).length > 0) {
            options.headers = apiheaders;
        }


        if (isValid(this.state.body)) {
            options.data = JSON.parse(this.state.body);
        }
        let history = [];
        let tmp = getFromLocalStorage("history", true);
        if (isValid(tmp)) {
            history = tmp;
        }

        axios(options).then((response) => {
            console.log(response)
            options.status = response.status;
            options.timeStamp = new Date().getTime();
            history.push(options);
            storeToLocalStorage("history", history, true);
            this.setState({
                history: history.reverse(),
                response: response, loading: false, recallLoading: false
            });
        })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    options.status = error.response.status;
                    options.timeStamp = new Date().getTime();
                    history.push(options);
                    storeToLocalStorage("history", history, true);
                    this.setState({
                        loading: false, recallLoading: false,
                        history: history.reverse(), response: error?.response
                    });
                } else {
                    options.status = 0;
                    options.timeStamp = new Date().getTime();
                    history.push(options);
                    storeToLocalStorage("history", history, true);
                    this.setState({
                        loading: false, recallLoading: false,
                        history: history.reverse(), response: { status: 0, statusText: "Unknown" }
                    });
                }
            });
    }

    deleteHistory(c_index, config) {
        let history = this.state.history;
        let index = history.findIndex((element) =>
            element.timeStamp === config.timeStamp);
        if (index > -1)
            history.splice(index, 1);
        this.setState({ history: history });
        let data = JSON.parse(JSON.stringify(history));
        storeToLocalStorage("history", data.reverse(), true);
    }

    onDeleteConfirm(value) {
        this.dialogRef.current.toggleDialog();
        this.deleteAll();
    }

    onDeleteCancel() {
        this.dialogRef.current.toggleDialog();
    }

    deleteAll() {
        storeToLocalStorage("history", [], true);
        this.setState({ history: [] });
    }

    deleteAllHistory() {
        this.dialogRef.current.toggleDialog("Delete History!",
            "Are you sure you want to delete all history?",
            {});
    }

    render() {
        return (
            <div className="full-screen">

                <Row >
                    <Col xs="8" md="8" lg="8">
                        <Row>
                            <Col xs="auto" md="auto" lg="auto" style={{ padding: 0 }}>
                                <CustomDropDown
                                    placeholder="GET"
                                    id={"select-method"}
                                    options={this.state.methodOption}
                                    isSearchable={true}
                                    value={{ value: this.state.method, label: this.state.method }}
                                    onChange={this.onMethodChange}
                                />
                            </Col>
                            <Col style={{ padding: 0 }}>
                                <TextInput
                                    name={"url"}
                                    placeholder={"URL"}
                                    type="text"
                                    id={"url"}
                                    className="form-control"
                                    value={this.state.url}
                                    onChange={this.onUrlChange}
                                    style={{ border: this.state.invalid ? "1px solid #dc3545" : "1px solid #cccccc" }} />
                            </Col>
                            <Col xs="auto" md="auto" lg="auto" style={{ padding: 0 }}>
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
                        <Spacer height={10} />
                        <hr></hr>
                        <Spacer height={10} />
                        <div style={{ backgroundColor: "#001e3ca6", padding: 10 }}>
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
                        <div className="inner-div">
                            {this.state.inputSection === 1 ?
                                this.state.params.map((element, index) => (
                                    <div key={"table-column-" + index}>
                                        <Row >
                                            <Col md="1" style={{ padding: 0, paddingLeft: 10, width: 50 }}>
                                                <TextInput
                                                    name={"params-label"}
                                                    placeholder={(index + 1).toString()}
                                                    type="text"
                                                    id={"params-label-" + index}
                                                    className="form-control"
                                                    value={(index + 1).toString()}
                                                    readOnly={true}
                                                    onChange={(e) => { }} />

                                            </Col>
                                            <Col md={{ span: 5 }} style={{ padding: 0 }}>

                                                <TextInput
                                                    name={"params-key"}
                                                    placeholder={"Parameter " + (index + 1)}
                                                    type="text"
                                                    id={"params-key-" + index}
                                                    className="form-control"
                                                    value={element.key}
                                                    onChange={(e) => this.onParamsKeyChange(e, index)} />
                                            </Col>

                                            <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                <TextInput
                                                    name={"params-value"}
                                                    placeholder={"value " + (index + 1)}
                                                    type="text"
                                                    id={"params-value-" + index}
                                                    className="form-control"
                                                    value={element.value}
                                                    onChange={(e) => this.onParamsValueChange(e, index)} />
                                            </Col>


                                            <Col style={{}}>
                                                <div id={"delete-column"}
                                                    className="column-delete-container"
                                                    onClick={() => this.onDeleteParam(index)}>
                                                    <BsTrash size={30}
                                                        className="delete-button"
                                                        color="white" />
                                                </div>
                                            </Col>

                                        </Row>
                                        <Spacer height={10} />  </div>))

                                :
                                this.state.inputSection === 2 ?
                                    <TextArea
                                        id="body"
                                        name="body" style={{ resize: "none" }}
                                        placeholder="Enter json data"
                                        rows="8"
                                        type="textarea"
                                        className="form-control"
                                        value={this.state.body}
                                        onChange={this.onBodyTextChange} />

                                    : this.state.inputSection === 3 ?
                                        this.state.headers.map((element, index) => (
                                            <div key={"headers-column-" + index}>
                                                <Row >
                                                    <Col md="1" style={{ padding: 0, paddingLeft: 10, width: 50 }}>
                                                        <TextInput
                                                            name={"headers-label"}
                                                            placeholder={(index + 1).toString()}
                                                            type="text"
                                                            id={"headers-label-" + index}
                                                            className="form-control"
                                                            value={(index + 1).toString()}
                                                            readOnly={true}
                                                            onChange={(e) => { }} />
                                                    </Col>
                                                    <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                        <TextInput
                                                            name={"header-key"}
                                                            placeholder={"Header " + (index + 1)}
                                                            type="text"
                                                            id={"header-key-" + index}
                                                            className="form-control"
                                                            value={element.key}
                                                            onChange={(e) => this.onHeaderkeyChange(e, index)} />

                                                    </Col>

                                                    <Col md={{ span: 5 }} style={{ padding: 0 }}>
                                                        <TextInput
                                                            name={"header-value"}
                                                            placeholder={"value " + (index + 1)}
                                                            type="text"
                                                            id={"header-value-" + index}
                                                            className="form-control"
                                                            value={element.value}
                                                            onChange={(e) => this.onHeaderValueChange(e, index)} />
                                                    </Col>


                                                    <Col style={{}}>
                                                        <div id={"delete-column"}
                                                            className="column-delete-container"
                                                            onClick={() =>
                                                                this.onDeleteHeader(index)}>
                                                            <BsTrash size={36}
                                                                className="delete-button"
                                                                color="white" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Spacer height={10} />  </div>))

                                        : this.state.inputSection === 4 ?
                                            <div key={"token-section"}>
                                                <Row >
                                                    <Col md="1" style={{ padding: 0, paddingLeft: 10, width: 50 }}>
                                                        <TextInput
                                                            name={"token-label"}
                                                            placeholder={""}
                                                            type="text"
                                                            id={"token-label-"}
                                                            className="form-control"
                                                            value={"1"}
                                                            readOnly={true}
                                                            onChange={(e) => { }} />

                                                    </Col>
                                                    <Col md={{ span: 3 }} style={{ padding: 0 }}>


                                                        <TextInput
                                                            name={"Bearer-label"}
                                                            placeholder={"Bearer"}
                                                            type="text"
                                                            id={"headers-label-"}
                                                            className="form-control"
                                                            value={"Bearer"}
                                                            readOnly={true}
                                                            onChange={(e) => { }} />
                                                    </Col>

                                                    <Col md={{ span: 7 }} style={{ padding: 0 }}>

                                                        <TextInput
                                                            name={"token"}
                                                            placeholder={"Token"}
                                                            type="text"
                                                            id={"token"}
                                                            className="form-control"
                                                            value={this.state.token}
                                                            onChange={this.onTokenTextChange} />
                                                    </Col>


                                                    <Col style={{}}>
                                                        <div id={"delete-token"}
                                                            className="column-delete-container"
                                                            onClick={this.onDeleteToken}>
                                                            <BsTrash size={36}
                                                                className="delete-button"
                                                                color="white" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Spacer height={10} />   </div>

                                            : null
                            } </div>
                        <Spacer height={10} />
                        <hr></hr>
                        <Spacer height={10} />
                        {this.state.response && <ResponseData response={this.state.response} />}
                    </Col>
                    <div style={{ width: "32%", marginLeft: 10, borderLeft: "1px solid #001e3c" }}>
                        <History history={this.state.history}
                            recallAPI={this.recallAPI}
                            deleteHistory={this.deleteHistory}
                            deleteAllHistory={this.deleteAllHistory} />
                    </div>
                </Row>

                <ConfirmationDialog
                    ref={this.dialogRef}
                    show={false}
                    cancelText="No"
                    confirmText="Yes"
                    handleClose={this.onDeleteCancel}
                    handleConfirm={this.onDeleteConfirm}
                />
                {this.state.recallLoading ? <AnimatedLoader /> : <></>}
            </div>
        );
    }
}

export default Home;
