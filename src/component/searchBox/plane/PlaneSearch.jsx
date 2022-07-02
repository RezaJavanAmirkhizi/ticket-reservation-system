import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import searchResult from "../../../data/actions/ticket/searchResult";
import CounterInput from "../CounterInput";

function PlaneSearch(props) {
	//Create this state to control inputs and request to API
	const [states, setStates] = useState({
		departure: "",
		destination: "",
		start_time: "",
		type: 2,
	});

	//Create this state to control number of passengers
	const [numOfPassengers, setNumOfPassengers] = useState(1);

	const history = useNavigate();

	const searchTicket = (e) => {
		e.preventDefault();
		props.searchResult(states);
		history(
			`/result?dep=${states.departure}&des=${states.destination}&start_time=${states.start_time}&et=${states.end_time}&type=${states.type}`
		);
	};

	//Create this function to control counter input
	const inputFunction = (count) => {
		setNumOfPassengers(count);
	};

	return (
		<div className="slot-container">
			<div className="source-and-destination">
				<input
					type="text"
					placeholder="مبدا(شهر)"
					value={states.departure}
					onChange={(e) => {
						setStates({
							...states,
							departure: e.target.value,
						});
					}}
				/>
				<input
					type="text"
					placeholder="مقصد(شهر)"
					value={states.destination}
					onChange={(e) => {
						setStates({
							...states,
							destination: e.target.value,
						});
					}}
				/>
			</div>
			<div className="round-trip-time">
				<input
					type="text"
					placeholder="تاریخ رفت"
					onFocus={(e) => (e.target.type = "date")}
					onBlur={(e) => (e.target.type = "text")}
					value={states.depatureDate}
					onChange={(e) => {
						setStates({
							...states,
							start_time: e.target.value,
						});
					}}
				/>
				<input
					type="text"
					placeholder="تاریخ برگشت"
					onFocus={(e) => (e.target.type = "date")}
					onBlur={(e) => (e.target.type = "text")}
					value={states.returnDate}
					onChange={(e) => {
						setStates({
							...states,
							end_time: e.target.value,
						});
					}}
					disabled
				/>
			</div>
			<div className="num-of-passengers">
				<CounterInput inputF={inputFunction} />
			</div>
			<div className="search-button">
				<button onClick={(e) => searchTicket(e)}>جستجو</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		ticket: state.ticket,
	};
};

export default connect(mapStateToProps, { searchResult })(PlaneSearch);
