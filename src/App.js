import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = this.state;

    fetch('/api/form', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, message
      })
    })
    this.resetForm();
  }

  resetForm = () => this.setState({ name: '', email: '', message: '' })

  render() {
    return (
      <div className="App">
        <h1 className='form__title'>Email Form</h1>
        <form onSubmit={(e) => this.handleSubmit(e)} className='form'>
          <label className='form__label'>Please fill in the fields...</label>
          <input type='text' placeholder='Name...' name='name' className='form__input' value={this.state.name} onChange={(e) => this.handleChange(e)} />
          <input type='email' placeholder='Email...' name='email' className='form__input' value={this.state.email} onChange={(e) => this.handleChange(e)} />
          <textarea type='text' placeholder='Message...' name='message' className='form__input' value={this.state.message} onChange={(e) => this.handleChange(e)} />
          <button type='submit' className='form__btn'>Send a message</button>
        </form>
      </div>
    );
  }
}

export default App;
