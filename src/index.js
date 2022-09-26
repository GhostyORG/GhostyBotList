const app = require('express')()
const glob = require('glob')
const path = require('path')

glob('./src/routes/**/*.js', (err, files) => {
    files.forEach((file, index) => {
        const route = require(path.join(__dirname, file.split('./src')[1]))
        app.use('./v1', route)
        if (index === files.length-1) {
            app.use((req, res) => {
                res.status(404).json({
                    error: 'Not Found',
                    message: "The requested source could not be found."
                })
            })
            Listen(3000)
        }
    })
})

const Listen = (port = 3000) => {
    app.listen(port, () => {
        console.success(`Server started on port: ${port}`, 'GHOSTY')
    })
}