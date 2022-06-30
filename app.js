const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const usersRouter = require('./routes/users')
const timeReportRouter = require('./routes/timeReport')
const productionOrdersRouter = require('./routes/p40ProductionOrders')
const lopRouter = require('./routes/lop')
const processesRouter = require('./routes/processes')
const XMLRouter = require('./routes/p51Xml')
const visitsRouter = require('./routes/p54Visits')

app.use('/users', usersRouter)
app.use('/lop', lopRouter)
app.use('/processes', processesRouter)
app.use('/time-report', timeReportRouter)
app.use('/production-orders', productionOrdersRouter)
app.use('/xml', XMLRouter)
app.use('/visits', visitsRouter)

// risposta del server http://localhost:3002
app.listen( 3002, () => console.log('server started on 3002'))

app.use('/', (req,res) => {
  res.send('HOME API')
})