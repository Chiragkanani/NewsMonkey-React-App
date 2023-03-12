import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  pageSize = 6
  render() {
    return (
      <>
       <Router>
       <NavBar/>
      <Routes>
        <Route exact path="/" element={<News pageSize={this.pageSize} country={'in'} category={'general'} key='/'/>} />
        <Route exact path="/category/general" element={<News pageSize={this.pageSize} country={'in'} category={'general'} key='general'/>} />
        <Route exact path="/category/business" element={<News pageSize={this.pageSize} country={'in'} category={'business'} key='business'/>} />
        <Route exact path="/category/entertainment" element={<News pageSize={this.pageSize} country={'in'} category={'entertainment'} key='entertainment'/>}/>
        <Route exact path="/category/health" element={<News pageSize={this.pageSize} country={'in'} category={'health'} key='health'/> }/>
        <Route exact path="/category/science" element={<News pageSize={this.pageSize} country={'in'} category={'science'} key='science'/>} />
        <Route exact path="/category/sports" element={<News pageSize={this.pageSize} country={'in'} category={'sports'} key='sports'/>} />
        <Route exact path="/category/technology" element={<News pageSize={this.pageSize} country={'in'} category={'technology'} key='technology'/>} />
      </Routes>
 </Router>
    
      </>
    )
  }
}

