import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
class dateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color:new Date() };
    }


    getValue() {
        return { [this.props.column.key]: moment(this.state.color).format("DD/MM/YYYY, h:mm") };
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    onSelect = date => {

        return this.setState({ color: date }, () => this.props.onCommit());
    };
    // onChange = date => {
    //     return this.setState({ color: date }, () => this.props.onCommit());
    // };
    onChange = date => {
        console.log("changing")
        return this.setState({ color: date }, () => this.props.onCommit());
    };;
    render() {
        return <DatePicker selected={this.state.color}  onDateChange={this.onChange} showTimeSelect timeIntervals={1} />;
    }
}
export default dateTimePicker;