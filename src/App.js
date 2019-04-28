import React, { Component } from 'react';
// import uuid from 'uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import About from './components/pages/About';
import Header from './components/layout/Header';

import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

import './App.css';

class App extends Component {
	// state = {
	// 	todo: [
	// 		{
	// 			id: uuid.v4(),
	// 			title: 'Take out the trash',
	// 			completed: false
	// 		},
	// 		{
	// 			id: uuid.v4(),
	// 			title: 'Dinner with wife',
	// 			completed: false
	// 		},
	// 		{
	// 			id: uuid.v4(),
	// 			title: 'Meeting with boss',
	// 			completed: false
	// 		}
	// 	]
	// }

  state = {
    todo: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todo: res.data }));
  }

	// Toggle Complete
	markComplete = (id) => {
		this.setState({ todo: this.state.todo.map(todo => {
			if(todo.id === id) {
				console.log(todo.completed);
				todo.completed = !todo.completed
			}
			return todo;
		})})
	}

  // Delete Todo
	delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todo: [...this.state.todo.filter(todo => todo.id !== id)]}));
		// this.setState({ todo: [...this.state.todo.filter(todo => todo.id !== id)]});
	}

  // Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todo: [...this.state.todo, res.data] }));
    // this.setState({ todo: [...this.state.todo, newTodo] });
  }

	render() {
		return (
      <Router>
  	    <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todo todo={this.state.todo} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
  	    </div>
      </Router>
  	);
	}
}

export default App;
