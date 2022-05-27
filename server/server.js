const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi:"3.0.1",
    info: {
      version: "1.0.0",
      title: "Customer API",
    },
    servers: [
      {
        url: "http://localhost:8080/"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat:"JWT",
        }
      }
    }
    ,
    security: [{
      bearerAuth: []
    }],
  },
  apis: ["./server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


require('dotenv').config()

const PORT=8080;
const cors = require('cors');
const {a}= require('./example/1.js');
const {a2}= require('./example/2.js');
const {a3}= require('./example/3.js');
const {a4} = require('./example/4.js');

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /data/1:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/data/1',authenticateToken,(req, res) => {
    res.status(200).json(a);
})
/**
 * @swagger
 * /data/2:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/data/2',authenticateToken,(req, res) => {
    res.status(200).json(a2);
})
/**
 * @swagger
 * /data/3:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/data/3',authenticateToken,(req, res) => {
    res.status(200).json(a3);
})
/**
 * @swagger
 * /data/4:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/data/4',authenticateToken,(req, res) => {
    res.status(200).json(a4);
})

app.get('/token',(req,res)=>{

  const token=jwt.sign("req",process.env.ACCESS_TOKEN);
  res.status(200).json(token);
})
function authenticateToken(req, res, next) {
  console.log(req.headers);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify("req",process.env.ACCESS_TOKEN, (err, user) => {
      next()
    })
  }
app.listen(PORT);