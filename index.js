import { Server } from 'http'

const s = Server((req,res) => {
    //debugger
    res.end('OK44\n')
})
s.listen(4321)


//ver 1
//fs.readFile('package.js', (e,v) => console.log(e || String(v)));


// ver 2
/*
const s = Server()
s.addListener('request', (req,res) => {
    res.end('OK44\n')
})
s.listen(4321)
*/