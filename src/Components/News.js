import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)

  document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`


  const updatePage = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    // console.log(url)
    props.setProgress(30)
    setLoading(true)
    let data = await fetch(url)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)

  }

  useEffect(() => {

    updatePage()


  }, [])


  // const  componentDidMount = async () => {
  //   // console.log('did mount' + page)

  //  updatePage()
  // }

  // nextpage = async () => {

  //   await setState({
  //     page: page + 1
  //   })
  //   // console.log(page)
  //   updatePage()
  // }

  // previouspage = async () => {
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bf39a2e1536b4f32a6b280657451aafd&page=${page-1}&pageSize=${props.pageSize}` 
  // // console.log(url)
  // setState({loading : true})
  // let data = await fetch(url)
  // let parsedData = await data.json()
  // setState({
  //   articles: parsedData.articles,
  //   page : page - 1,
  //   loading : false

  // })
  // console.log(page)
  //   await setState({
  //     page: page - 1
  //   })
  //   updatePage()
  // }

  const fetchMoreData = async () => {


    await setTimeout(async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      // console.log(url)
    setPage(page + 1)
      let data = await fetch(url)
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    }, 1500);
  };


  console.log('render')
  return (
    <>
      <h1 className='text-center my-3'>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4><Spinner /></h4>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (<div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 125) : ''} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
              </div>)
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={previouspage}>&lt; Previous</button>
          <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={nextpage}>Next &gt;</button>
        </div> */}
    </>
  )

}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}