exports.schema = [`
# A click object stores the timestamp when it was pressed.
type Click {
  # Identifier
  _id: ID
  timestamp: Float
  message: String
}
`]

exports.resolvers = {}
