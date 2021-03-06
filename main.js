// Dependencies injection
// =============================================================================
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import okta from './app/middlewares/okta'

// Initialize app
// =============================================================================
const app = express()

// Public and Private paths
// =============================================================================
import publicRoutes from './app/routes.public'
import privateRoutes from './app/routes.private'

// Middlewares
// =============================================================================
app.use(cors())
app.use(bodyParser.json())

// Inject routes - Public and Private
// =============================================================================
publicRoutes.map (p => app.use('/', p) )
privateRoutes.map(p => app.use('/private', okta, p) )

// Run the app
// =============================================================================
app.listen(config.apiPort, () => { console.log(`API running over http://localhost:${config.apiPort}`) }) // eslint-disable-line no-console

export default app
