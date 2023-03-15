import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 6
  apiKey=process.env.REACT_APP_NEWS_API

  constructor(props) {
    super(props)
  
    this.state = {
       progress : 0
    }
  }

setProgress =(x) =>{
  this.setState({
    progress:x
  })
}

  render() {
    return (
      <>
       <Router>
       <NavBar/>
       <LoadingBar
       height = {3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'general'} key='/'/>} />
        <Route exact path="/category/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'general'} key='general'/>} />
        <Route exact path="/category/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'business'} key='business'/>} />
        <Route exact path="/category/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'entertainment'} key='entertainment'/>}/>
        <Route exact path="/category/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'health'} key='health'/> }/>
        <Route exact path="/category/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'science'} key='science'/>} />
        <Route exact path="/category/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'sports'} key='sports'/>} />
        <Route exact path="/category/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country={'in'} category={'technology'} key='technology'/>} />
      </Routes>
 </Router>
    
      </>
    )
  }
}

