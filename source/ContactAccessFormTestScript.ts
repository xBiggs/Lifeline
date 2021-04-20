import addContactToUser from "./Forms/ContactAccessForm";
import { ContactDetails } from "./interfaces/ContactDetails"

const tId = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
// test with no lastname
const contact: ContactDetails = {
    firstName: "testScript no LASTNAME",
    lastName: "",
    digits: "4056982368",
    id: tId()
}

// test with no firstname
// const contact: ContactDetails = {
//     firstName: "",
//     lastName: "testScript no FIRSTNAME",
//     digits: "4056982388",
//      id: tId()
// }

// test with no digits
// const contact: ContactDetails = {
//     firstName: "test",
//     lastName: "with no PHONENUMBER",
//     digits: "",
//     id: tId()
// }

// test with no id
// const contact: ContactDetails = {
//     firstName: "test",
//     lastName: "with no ID",
//     digits: "5556982388",
// }

// test with an existing contact/phone number
// const contact: ContactDetails = {
//     firstName: "test",
//     lastName: "with no existing contact",
//     digits: "5556982388",
//     id: tId()
// }
addContactToUser(contact);
