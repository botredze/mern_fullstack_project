const express = require('express');
const config = require('config')
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const PORT = config.get('port') || 5000

app.use(bodyParser.json())
app.use('/api/auth', require('./routs/auth.routes'))
app.use('/api/link', require('./routs/link.routes'))
app.use('/t', require('./routs/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


async function start (){
    try {
        await mongoose.set("strictQuery", true);
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`'App started on port ... ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()


