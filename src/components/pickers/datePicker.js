import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
class datePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color:new Date() };
    }


    getValue() {
        return { [this.props.column.key]: moment(this.state.color).format("DD/MM/YYYY") };
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

        console.log("")
        if (moment(date,"DD/MM/YYYY").isValid()){
            return this.setState({ color: date }, () => this.props.onCommit());
        }



    };;
    render() {
        return <DatePicker selected={this.state.color} onSelect={this.onSelect} onChange={this.onChange} />;
    }
}
export default datePicker;