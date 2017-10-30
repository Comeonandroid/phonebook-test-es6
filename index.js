import { validateEmail, validatePhone } from './validation.js'

class PhoneBook {
  
  constructor() {
    this.people = []
  }

  add(contactInfo) {
    let errors = this.validateContactInfo(contactInfo)
    if(errors.length == 0) {
      this.people.push(contactInfo)
      return { success: true, data: this.people }
    } else {
      return { success: false, data: errors }
    }    
  }

  remove(index) {
    return this.people.splice(index, 1)
  }

  search(query) {    
    return this.people.filter((el) => {
      return el.name.includes(query) || el.phone.includes(query)
    }).sort(this.comparePeople())
  }

  list(contactsPerPage = 2, page = 1) {
    --page    
    return this.people
      .sort(this.comparePeople())
      .slice(page * contactsPerPage, (page + 1) * contactsPerPage)
  }
  
  comparePeople() {
    return function(a, b) {
      return a.name.localeCompare(b.name)
   }
  }

  validateContactInfo(contactInfo) {
    let errors = []
    if(typeof contactInfo !== 'object') { errors.push("Not a valid object") }       
    if(!validateEmail(contactInfo.email)) { errors.push("Not a valid email") }
    if(!validatePhone(contactInfo.phone)) { errors.push("Not a valid phone") }
    return errors
  }

}

let myPhoneBook = new PhoneBook()

console.log('######### ADD 3 CONTACTS #########')
myPhoneBook.add({
  name: 'John Smith',
  phone: '02-234-9182',
  email: 'j.smith@mail.com'
})

myPhoneBook.add({
  name: 'Adam Smith',
  phone: '02-234-9182',
  email: 'j.smith@mail.com'
})

myPhoneBook.add({
  name: 'Quentin Smith',
  phone: '02-234-9182',
  email: 'j.smith@mail.com'
})

console.log('######### myPhoneBook.list(2, 1) #########')
console.log(myPhoneBook.list(2, 1))

console.log('######### myPhoneBook.remove(1) #########')
console.log(myPhoneBook.remove(1))

console.log('######### myPhoneBook.list() #########')
console.log(myPhoneBook.list())

console.log('######### myPhoneBook.search(\'02-234\') #########')
console.log(myPhoneBook.search('02-234'))