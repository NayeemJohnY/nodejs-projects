const axios = require('axios').default;


async function getFile() {
    // let data = ""
    // const options = {
    //     host: 'cs15sepstor.blob.core.windows.net',
    //     port: 443,
    //     path: '/container2data/on_demand_cd.json?sp=r&st=2022-09-15T09:45:05Z&se=2022-09-15T17:45:05Z&spr=https&sv=2021-06-08&sr=b&sig=z9wxGnjm%2FnkB0TE6BaDd2BwMyV5wk%2FP2TfHeFqX5Ccg%3D',
    //     method: 'GET'
    // }
    
    // req = https.request(options, res => {
    //     console.log(`statusCode: ${res.statusCode}`);
    //     res.on('data', d => {
    //         data += d
    //     })
    //     res.on("end", () => {
    //         console.log(data)
    //     })
    // })
    // req.end()
    data = await axios.get("https://cs15sepstor.blob.core.windows.net/container2data/on_demand_cd.json?sp=r&st=2022-09-15T09:45:05Z&se=2022-09-15T17:45:05Z&spr=https&sv=2021-06-08&sr=b&sig=z9wxGnjm%2FnkB0TE6BaDd2BwMyV5wk%2FP2TfHeFqX5Ccg%3D")
    console.log(data.data)
}


getFile()