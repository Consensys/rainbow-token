import React from 'react';

/* Material ui components */
import Tooltip from '@material-ui/core/Tooltip';

/* Images */
import rainbowToken from '../../static/svg/CircleTokenRainbow.svg';

const MyToken = ({ color, size, boxShadowSize, borderSize, score }) => {
  const parenthesisString = `(${color.r}, ${color.g}, ${color.b})`;
  const tokenWrapperStyle = {
    position: 'relative',
  };
  const tokenStyle = {
    backgroundImage: `url(${rainbowToken})`,
    backgroundColor: `rgb${parenthesisString}`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    marginLeft: '3px',
    marginTop: '3px'
  }
  const scoreBorderStyle = {
    position: 'absolute',
    top: 0,
    width: `${Number(size) + 3}px`,
    height: `${Number(size) + 3}px`,
    transform: 'rotate(-90deg)',
  };
  const strokeDashoffset = score * 166.50441064 / 100;
  const circleStyle = {
    r: 26.5,
    strokeDasharray: 166.50441064, // 26.5 * 2 * pi
    cx: 28,
    cy: 28,
    // stroke: 'rgb(55, 55, 55)',
    strokeWidth: '3px',
    strokeDashoffset
  };
  // const gradient = (
  //   <defs>
  //     <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //       <stop offset="0%" stopColor="rgb(255, 0, 0)" />
  //       <stop offset="100%" stopColor="rgb(0, 255, 0)" />
  //     </linearGradient>
  //   </defs>
  // )
  return (
    <Tooltip
      disableFocusListener
      disableTouchListener
      title={`RGB${parenthesisString}`}
      placement="right"
    >
      <div id='tokenWrapper' style={tokenWrapperStyle}>
        <div
          className='token'
          style={tokenStyle}
        >
        </div>
        <svg id="scoreBorder" style={scoreBorderStyle} >
          <circle
            id="bar"
            fill="none"
            style={circleStyle}
          >
          </circle>
        </svg>
      </div >
    </Tooltip>
  )
}

export default MyToken
