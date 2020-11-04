const Router = require('./Router/router');
const rocketData = require('./Data/rocketData');
const RocketCollection = require('./Collection/rocket');

const r = new Router;

function addRocket({data}, next){
    try {
        RocketCollection.create(data);
    } catch (err) { 
        console.log(err);
    }

    next();
}

function findRocket({id}, next){
    const result = RocketCollection.find(id);
    console.log(result);

    next();
}

// Add routes
r.use('addRocket', addRocket);
r.use('addRocket', findRocket);
r.use('findRocket', findRocket);

r.handleRequest('addRocket', { data: rocketData[0] });