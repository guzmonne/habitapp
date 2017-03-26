import React, {PropTypes as T} from 'react'

const Click = ({onClick, onChange, message, clicks}) => (
  <div className="Click">
    <input type="text" value={message} onChange={onChange} />
    <button onClick={onClick}>Click Me!</button>
    <p>Number of Clicks: {clicks && clicks.length}</p>
    <ul>{clicks.map(click => (
      <li key={click._id}>
        <strong>{click._id}</strong> - <i>{click.timestamp}</i>
        {click.message && <br/>}
        {click.message}
      </li>
    ))}</ul>
  </div>
)

Click.propTypes = {
  onClick: T.func,
  onChange: T.func,
  message: T.string,
  clicks: T.arrayOf(T.shape({
    _id: T.string,
    timestamp: T.number,
    message: T.string,
  })),
}

Click.defaultProps = {
  onClick: () => {},
  clicks: [],
}

export default Click
