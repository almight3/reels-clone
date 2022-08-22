import React from 'react'
import ReactDOM from 'react-dom'
import "./Feeds.css"

function Videos({postUrl,id}) {
    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    const handleScroll = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if(next){
            next.scrollIntoView()
            e.target.muted = true
        }
    }
  return (
    <video src={postUrl} onEnded={handleScroll}  onClick={handleClick} muted="muted"  id={id}></video>
  )
}

export default Videos