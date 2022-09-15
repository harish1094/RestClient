import React from "react";
import {
    BsSearch
} from "react-icons/bs";

import { MdClose, MdOutlineDeleteSweep } from "react-icons/md";
import Spacer from "react-spacer";
import "./App.css";
import './css/app.css';
import './css/table-search-button.css';
import { isValid, timeSince } from "./utils/helpers";

/**
   * History Component
   *
   */

export default class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        };

        this.onSearch = this.onSearch.bind(this);
        this.textInput = null;
    }


    onSearch(e) {
        this.setState({ searchText: e.target.value });
    }

    render() {
        return (

            <div className="history-div">

                <div className="history-title">
                    {"History"}
                    <div style={{ display: "flex" }}>
                        <div id={'search-container'} className="input-container"
                            onClick={(e) => { e.stopPropagation(); this.textInput.focus(); }
                            }>
                            <input
                                ref={(search) => this.textInput = search}
                                id="search-input"
                                className="input-search"
                                value={this.state.searchText}
                                onChange={this.onSearch}
                                placeholder={`Search`}
                            />
                            <BsSearch id="search-icon" size={18} className="search-icon" />


                        </div>
                        <MdOutlineDeleteSweep id="delete-all"
                            size={28}
                            onClick={this.props.deleteAllHistory}
                            style={{ marginLeft: 10, marginRight: 15 }} />
                    </div>
                </div>
                <Spacer height={5} />
                {this.props.history.map((config, index) => (
                    <React.Fragment key={"history-" + index}>
                        {isValid(this.state.searchText) &&
                            !config.url.toLowerCase().includes(this.state.searchText.toLowerCase()) ? <></>
                            :
                            <div style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginBottom: 5,
                                borderRadius: 5,
                                width: "100%",
                                backgroundColor: config.method === "GET" ? "#61b0fe46" : config.method === "POST" ? "#49cc913d" :
                                    config.method === "DELETE" ? "#f93e3e62" : "#fca03049"
                            }}>
                                <div onClick={(e) => { this.props.recallAPI(config) }}
                                    style={{
                                        display: "flex",
                                    }}>
                                    <div style={{
                                        height: 60, width: 60, border:
                                            "5px solid " +
                                            (config.status === 0 ? "white" : [200, 201].includes(config.status) ? "green" : "red")
                                        ,
                                        borderRadius: 60,
                                        justifyContent: "center",
                                        backgroundColor: "white",
                                        alignItems: "center",
                                        display: "flex",
                                        margin: 10,
                                    }}>
                                        <label style={{ fontWeight: "bolder", fontSize: 20 }}>{config.status}</label>
                                    </div>
                                    <div style={{ width: "80%" }} >
                                        <label style={{ fontWeight: "bold", fontSize: 18 }}>{config.method}</label>
                                        <Spacer />
                                        <label>{config.url}</label>
                                        <Spacer />
                                        <label style={{ fontStyle: 'italic' }}>{timeSince(config.timeStamp)}</label>
                                    </div>
                                    <div>
                                        <MdClose id="delet"
                                            size={28}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.props.deleteHistory(index, config)
                                            }}
                                            style={{ marginLeft: 10, marginRight: 15 }} />
                                    </div>
                                </div>
                            </div>}
                    </React.Fragment>
                ))}


            </div>
        );
    }
}

