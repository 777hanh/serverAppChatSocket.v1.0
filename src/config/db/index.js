// require('dotenv').config({path:__dirname+'/../../.env'})
const mongoose = require('mongoose')
async function connect(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.u00e1.mongodb.net/appChat?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongoose Connection is successfully!!!`)
    } catch (error) {
        console.log(`Mongoose Connection is failure!!!`)
        process.exit(1)
    }
}
module.exports = {connect} 