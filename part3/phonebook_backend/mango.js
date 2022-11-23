const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.wvq5w0l.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

mongoose
  .connect(url)

  .then(() => {
    console.log('connected')
    if (name || number) {
      const phonebook = new Phonebook({
        name: name,
        number: number,
      })
      phonebook.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    } else {
      Phonebook.find({}).then(result => {
        result.forEach(phonebook => {
          console.log(phonebook)
        })
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))
