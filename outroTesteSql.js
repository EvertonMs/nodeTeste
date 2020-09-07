const sql = require('mssql')

async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('mssql://dbteste:dbteste@localhost/dbteste')
        const result = await sql.query`select * from [user]]`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}