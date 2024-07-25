import { Express, Response, Request } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

//NOTE: we must use require instead of import here
//other wise tsc  will create a src/ inside the dist/ and break our code structure
const { version } = require("../../package.json")

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Microland Rest Api',
            version
        }
    },
    /* for auth type shit
    components: {
        SecuritySchemes:
    },
        */
    apis: ['./serverLand/routes/*.ts', './serverLand/models/*.ts'],

};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: number) => {
    // swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use('/akka', (req, res) => {
        console.log('akka');
        res.send('akka');
    })

    // Docs in json
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-type', 'Application/json')
        res.send(swaggerSpec);

    })
    console.log(`Docs in : http://localhost:${port}/docs`);
}

export default swaggerDocs;





