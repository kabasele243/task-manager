const app = require('./app')
require("dotenv").config();
const port = process.env.PORT;

console.log(process.env.JWT_SECRET)
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
