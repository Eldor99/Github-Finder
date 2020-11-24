import React, { Component } from 'react';

class Search extends Component {
	state = {
		text : ''
	}

	onSubmit = (e) =>{
		e.preventDefault();
		if(this.state.text === ''){
			this.props.setAlert('Please Enter Something', 'light');
		}else{
			this.props.searchUsers(this.state.text);
			this.setState({text: ''});
		}

	}

	onChange = (e) => {
		this.setState({text: e.target.value});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form'>
				  <input type='text' name='text' placerholder='Search Users ...' value={this.state.text} onChange={this.onChange} />
				  <input type='submit' value='Search' className='btn btn-dark btn-block' />
				</form>
				{this.props.showClear && <button className='btn btn-light btn-block' onClick={this.props.clearUsers}>Clear</button>}
				
			</div>
		);
	}
}

export default Search;