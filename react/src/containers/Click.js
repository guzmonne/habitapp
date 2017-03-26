import React from 'react'
import {gql, graphql} from 'react-apollo'
import update from 'immutability-helper'
import Click from '../components/Click.js'

class ClickContainer extends React.Component {
  state = {
    message: '',
  }

  onChange = (e) => (
    this.setState({message: e.target.value})
  )

  render() {
    const {data: {clicks}, addClick} = this.props
    const {message} = this.state

    return (
      <Click onChange={this.onChange}
             message={message}
             clicks={clicks && clicks}
             onClick={() => addClick(message)}
      />
    )
  }
}

const query = gql`
query Clicks {
  clicks {
    _id
    timestamp
    message
  }
}
`

const mutation = gql`
mutation Click ($message: String){
  addClick(message: $message){
    _id
    timestamp
    message
  }
}
`

const ClickContainerWithData = graphql(query)(ClickContainer)

const ClickContainerWithDataAndMutation = (
  graphql(mutation, {
    props: ({mutate}) => ({
      addClick: message => mutate({
        variables: {message},
        updateQueries: {
          Clicks:(prev, {mutationResult}) => {
            console.log(mutationResult)
            return update(prev, {
              clicks: {$push: [mutationResult.data.addClick]}
            })
          }
        }
      })
    })
  })(ClickContainerWithData)
)

export default ClickContainerWithDataAndMutation
