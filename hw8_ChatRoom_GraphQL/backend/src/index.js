import server from './server'
import mongo from './mongo'

mongo.connect();
const port = process.env.PORT || 5000;
server.listen({port}, () => {
    console.log(`HW8 listening on http://localhost:${port}`);
});