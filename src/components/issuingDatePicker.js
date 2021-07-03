import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
class issuingDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color: new Date() };
    }

    getValue() {
        return { Issuing_state_of_identity_document: moment(this.state.color).format("MM/DD/YYYY") };
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    onChange = date => {
        return this.setState({ color: date }, () => this.props.onCommit());
    };
    render() {
        return <DatePicker selected={this.state.color} onChange={this.onChange} />;
    }
}
export default issuingDatePicker;