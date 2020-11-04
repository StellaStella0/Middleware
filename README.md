# Router and Middleware
The purpose of the project was to create a router with a middleware from scratch to learn about logic of how things work under the hood.
Other thing you can find inside is the collection class resembling a database behaviour. In the index file you can see that few routes are defined already as an example,
so feel free to test them first.


# Setup
All you need is node installed and you can start the main file like:

```
  node index.js
```


# Route example
```js
function findRocket(id, next){
    const result = RocketCollection.find(id);
    console.log(result);

    next();
}

r.use('findRocket', findRocket);

// Data is an optional variable
r.handleRequest('addRocket', data);
```
