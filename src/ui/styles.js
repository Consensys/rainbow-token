export const playerCellStyle = theme => ({
  pseudo: {
    textTransform: 'capitalize'
  },
  playerProgress: {
    width: '50%',
    marginLeft: '1em'
  }
})

export const homepageVisitorStyle = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    textShadow: '1.5px 1.5px 2px rgb(10, 10, 10)',
  },
  anchorTag: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  rightPanel: {
    flex: '1 1 25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  leftPanel: {
    flex: '1 1 25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    transform: 'scaleX(-1)'
  },
  imgSidePanel: {
    maxWidth: '100%',
    height: 'auto',
    transform: 'scale(1.5)'
  },
  mainPanel: {
    flex: '2 2 50%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    marginTop: '3em',
    fontSize: '2em',
    textTransform: 'uppercase',
    animation: 'text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '-1.5em'
  },
  footerElement: {
    marginBottom: '1em'
  },
  btn: {
    marginTop: '1.5em'
  }
});

export const playerTableStyle = theme => ({
  paper: {
    width: '80%',
    margin: '3em auto'
  },
  cell: {
    fontSize: '1.15em'
  }
});

export const headerUserStyle = theme => ({
  global: {
    color: 'white',
    textShadow: '0px 0px 4px rgb(10, 10, 10)',
    margin: 'auto',
    width: '100%',
    height: '30%',
  },
  halfHeader: {
    marginTop: '1em',
    marginBottom: '1em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  pseudo: {
    fontSize: '1.3em',
    textTransform: 'capitalize'
  },
  address: {
    marginTop: '0.5em'
  },
  consensysRightEl: {
    fontSize: '1.3em',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center'
  },
  flexColumnCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  defaultTokenTitle: {
    marginBottom: '1em',
    fontSize: '1.2em'
  },
  defaultTokenBtn: {
    fontSize: '0.7em',
    height: '30px',
    marginTop: '1em'
  },
  currentTokenTitle: {
    marginBottom: '1em',
    fontSize: '1.3em'
  },
  currentTokenProgress: {
    width: '100%',
    fontSize: '0.6em',
    marginTop: '1em',
  },
  currentTokenBar: {
    marginLeft: '1em',
    width: '60%'
  },
  priceTitle: {
    fontSize: '1em'
  },
  priceText: {
    fontSize: '1.5em',
    marginTop: '1em'
  },
  priceBtn: {
    height: '30px',
    marginTop: '1.8em',
    fontSize: '0.8em'
  }
});
