const {ipcRenderer: ipc} = require('electron')

function removeClass(el, className) {
  el.classList
  ? el.classList.remove(className)
  : el.className = el.className.replace(new RegExp('(ˆ|\\b)'))
}

function addClass(el, className) {
  el.classList 
  ? el.classList.add(className)
  : el.className += ' ' + className
}

function openGraphqlWindow() {
  console.log('open:graphql_window')
  ipc.send('open:graphql_window')
}

function quitApp() {
  console.log('open:graphql_window')
  ipc.send('close:app')
}

function init() {
  const graphiql = document.getElementsByClassName('graphql')[0]
  const graphiqlLoading = document.getElementsByClassName('graphql')[1]
  const close = document.getElementsByClassName('close')[0]

  graphiql.addEventListener('click', openGraphqlWindow)
  close.addEventListener('click', quitApp)
  
  ipc.on('open:graphql_window:done', (event) => {
    console.log('open:graphql_window:done')
    addClass(graphiql, 'hidden')
    removeClass(graphiqlLoading, 'hidden')
  })

  ipc.on('close:graphql_window', (event) => {
    console.log('close:graphql_window')
    addClass(graphiqlLoading, 'hidden')
    removeClass(graphiql, 'hidden')
  })
}

init()


