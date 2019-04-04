import React, { Component } from "react";
import { connect } from "react-redux";
// import Scroll from "../components/Scroll";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
// import ErrorBoundary from "../components/ErrorBoundary";
// import { robots } from './robots'; //commented out because using fetch to get real data instead of hardcoded
import "./App.css";

import { setSearchField } from "../actions";

const mapStateToProps = state => {
  return {
    // from reducer

    // this below line gives error because we are using only one reducer in this example. Explanation given below:
    // searchField: state.searchRobots.searchField (use this in case of multiple reducers)
    searchField: state.searchField

    // Finally found a solution, thanks to the response at discord from noirFatale,
    // I've found correctly what was creating the problem, hope it solves the matter:
    // "That's because you have only ONE reducer  existing in createStore() .
    // So that store directly refers to only one reducer (searchRobots) which returns
    //  the state searchField.  When you have multiple reducers you COMBINE them into
    // one rootReducer and this rootReducer returns multiple reducers, if you want to
    // refer to the state of one of them you have to grab them by reducers name...

    // So to sum it up: if you refer in createStore() directly to the one reducer,
    // you grab it's state throug state.stateName (in your case state.searchField) , but
    // if you refer in createStore() to one rootReducer, which contains multiple combined
    // reducers and returns them(not their state),
    // you grab each state like this:  state.reducerName.stateName (in your case, when you
    // will add more reducers and combine them in one root reducer,
    // it will be state.searchRobots.searchField). Hope that helped"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // event is going to dispatch the action setSearchField
    // since setSearchField recieves text as parameter in action, its argument is set to e.target.value
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  // Adding state
  constructor() {
    super();
    this.state = {
      // robots: robots, //commented out because using fetch
      robots: []
      // searchField: ""
      // commented out because Redux now replaces the state in app
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        this.setState({ robots: users });
      })
      .catch(err => console.log(err));
  }

  // onSearchChange = event => {
  //   this.setState({ searchField: event.target.value });
  // };

  // commented out because we are getting it as props in mapDispatchToProps

  render() {
    // , searchField
    // commented out searchField from this.state because its coming down as props so made a new const below for that

    let { searchField, onSearchChange } = this.props;

    let { robots } = this.state;
    // console.log(this.state);
    // console.log(searchField);

    // added onSearchChange as it is now coming from props and isnt a part of App.js component

    if (robots.length < 1) {
      return <h2>LOADING...</h2>;
    } else {
      let filteredRobots = robots.filter(robot =>
        robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
      );

      return (
        <div className="tc">
          <div>
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
          </div>
          <CardList robots={filteredRobots} />
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
