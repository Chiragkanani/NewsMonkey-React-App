import React from 'react'


export default function NewsItem (props) {



  
    let { title, description, imageUrl, newsUrl, date, author, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={imageUrl ? imageUrl : "https://gumlet.assettype.com/swarajya%2F2023-03%2F56003ec8-44a7-47ec-8bbc-6d688b030df7%2F2023_DW_asteroid.png?w=1200&auto=format%2Ccompress&ogImage=true"} className="card-img-top" alt="Not available..." />
          <div className="card-body">
            <h5 className="card-title">{title}  <span style={{ left: '90%', zIndex: "1" }} className="position-absolute top-0  translate-middle badge rounded-pill bg-success">
              {source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className=" text-danger">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}
