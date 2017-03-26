Queries
===

Click mutation
---

```graphql
mutation click($timestamp: String) {
  click {
    add (timestamp: $timestamp) {
    	_id
      timestamp
    }
  }
}
```

```graphql
mutation Something ($msg: String){
  addClick(message: $msg){
    _id
    timestamp
    message
  }
}
```