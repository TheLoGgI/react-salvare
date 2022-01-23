import axios, { AxiosRequestConfig } from "axios"
import express from "express"
// import cors from 'cors'

const app = express()
const port = 3000

const data = JSON.stringify({
    collection: "artical",
    database: "DUST2",
    dataSource: "Cluster0",
    projection: {
        _id: 1,
    },
})

const config: AxiosRequestConfig<string> = {
    method: "post",
    url: "https://data.mongodb-api.com/app/data-izqvp/endpoint/data/beta/action/find",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": "61ddb772b98782d8be9db7d2",
    },
    data: data,
}

axios(config)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })

// app.get("/", function (req, res) {
//     res.status(200).send("Root")
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
