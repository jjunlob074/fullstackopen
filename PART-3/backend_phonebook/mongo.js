const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jdbasketman:${password}@fullstackopen.xi5z5.mongodb.net/?retryWrites=true&w=majority&appName=fullstackopen`

  mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv[3]){
    const person = new Person({
    name: process.argv[3].toString(),
    number: process.argv[4].toString(),
    })

    person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    })

} else { 
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}