import React, {Component,Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users';
import Search from './components/Search';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {
  state = {
    users : [],
    loading: false
  }
  async componentDidMount(){

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_API_CLIENT_SECRET}`)

    this.setState({ users: res.data, loading: false});
  }

// Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_API_CLIENT_SECRET}`)

    this.setState({ users: res.data.items, loading: false});
  }

  // Clear users from State
  clearUsers = () => {
    this.setState({users: [], loading: false});
  }


    render() {
      const {users, loading} = this.state;
        return (
          <Router>
            <div className = "App" >
            <Navbar title='Github Finder' icon="fab fa-github" />
            <div className='container' >
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
              <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
              showClear={users.length > 0 ? true : false} />
              <Users loading={loading} users={users} /> 
              </Fragment>
              )} />
              <Route exact path='/about' component={About} />
            </Switch>
            </div>
            </div>
            </Router>
        );
    }
}

export default App;