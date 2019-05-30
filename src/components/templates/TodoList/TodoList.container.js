import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import get from "lodash.get"

import TodoList from "./TodoList"

import toJS from "hoc/toJS"

import * as todoActions from "store/reducers/todo"

class TodoListContainer extends React.Component {
	render() {
		console.log("container render", this.props)
		return (
			<TodoList {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	console.log("map ", state.getIn(["todo", "todos"]))
	return {
		//todos: get(state, ["todo", "todos"])
		todos: state.getIn(["todo", "todos"])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		TodoActions: bindActionCreators(todoActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(toJS(TodoListContainer))