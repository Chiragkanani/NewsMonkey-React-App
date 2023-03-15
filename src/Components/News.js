import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`
  }

  async updatePage() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // console.log(url)
    this.props.setProgress(30)
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)

  }

  async componentDidMount() {
    // console.log('did mount' + this.state.page)
    this.updatePage()


  }

  nextpage = async () => {

    await this.setState({
      page: this.state.page + 1
    })
    // console.log(this.state.page)
    this.updatePage()
  }

  previouspage = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf39a2e1536b4f32a6b280657451aafd&page=${this.state.page-1}&pageSize=${this.props.pageSize}` 
    // // console.log(url)
    // this.setState({loading : true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({
    //   articles: parsedData.articles,
    //   page : this.state.page - 1,
    //   loading : false

    // })
    // console.log(this.state.page)
    await this.setState({
      page: this.state.page - 1
    })
    this.updatePage()
  }

  fetchMoreData = async() => {
  this.setState({page : this.state.page + 1})
    
    
     await setTimeout(async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      // console.log(url)
     
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      })
      }, 1500);
  };

  render() {
    console.log('render')
    return (
      <>
        <h1 className='text-center my-3'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner /></h4>}
        >
            <div className="container"> 
        <div className="row">
          {this.state.articles.map((element) => {
            return (<div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description ? element.description.slice(0, 125) : ''} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
            </div>)
          })}
        </div>
        </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previouspage}>&lt; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextpage}>Next &gt;</button>
        </div> */}
      </>
    )
  }




}
