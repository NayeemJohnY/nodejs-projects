const { MongoClient, ObjectID } = require('mongodb')
const uri = process.env.MONGOOSEURL
const dbname = "task-manager"


MongoClient.connect(uri, (error, client) => {
    if (error) {
        return console.log("Error while connecting to Mongo ", error);
    }
    console.log("Connected to Mongo ", client);
    const db = client.db(dbname);
    // db.collection('tasks').insertOne({
    //     name: 'Reading books',
    //     completed: true
    // }).then((result) => {
    //     console.log("Result of insert operation ", result);
    // }).catch((error) => {
    //     console.log("Error while inserting data ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').insertMany([{
    //         name: "Writing Blogs",
    //         completed: false
    //     },
    //     {
    //         name: "Reading Mails",
    //         completed: true
    //     }, {

    //         name: "Watering Garden",
    //         completed: false
    //     }
    // ]).then((result) => {
    //     console.log("Result of insert Many operation ", result);
    // }).catch((error) => {
    //     console.log("Error while inserting data ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').findOne({
    //     _id: new ObjectID('61d010d996eb4b3d1de0be03')
    // }).then((result) => {
    //     console.log("Result of Read operation ", result);
    // }).catch((error) => {
    //     console.log("Error while Reading data ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // const cursor = db.collection('tasks').find({
    //     completed: false
    // }).toArray();
    // cursor.then(result => {
    //     console.log("Read Many Results", result);
    // }).catch((error) => {
    //     console.log("Error while Reading results ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').updateOne({
    //     name: "Reading books"
    // }, {
    //     $currentDate: { lastUpdated: true },
    //     $set: { completed: false }
    // }).then(result => {
    //     console.log("Update One Results", result);
    // }).catch((error) => {
    //     console.log("Error while Updating docs ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $currentDate: { lastUpdated: true },
    //     $set: { completed: true }
    // }).then(result => {
    //     console.log("Update One Results", result);
    // }).catch((error) => {
    //     console.log("Error while Updating docs ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').updateOne({
    //     lastUpdated: new Date('2022-01-01T08:47:02.968+00:00')
    // }, {
    //     $inc: { updatedCount: 1 },
    // }).then(result => {
    //     console.log("Update One Results", result);
    // }).catch((error) => {
    //     console.log("Error while Updating docs ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').deleteOne({
    //     lastUpdated: { $exists: false }
    // }).then(result => {
    //     console.log("Delete One Results", result);
    // }).catch((error) => {
    //     console.log("Error while Deleting docs ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection('tasks').deleteMany().then(result => {
    //     console.log("Delete One Results", result);
    // }).catch((error) => {
    //     console.log("Error while Deleting docs ", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })

    // db.collection("tasks").drop().then(result => {
    //     console.log("Deleted the collection", result);
    // }).catch((error) => {
    //     console.log("Error while deleting the collection", error);
    // }).finally(() => {
    //     client.close();
    //     console.log("closed the connection");
    // })
})