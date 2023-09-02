const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    
    },
});
// creating model inside the Database ("Contact") but in code it is "contactList"
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;