import bcrypt from 'bcrypt';

const userData = [
    {
       name: 'Hasan',
       email: 'Hasan@gmail.com',
       password: bcrypt.hashSync('123456789', 10),
       isAdmin: true
    },
    {
       name: 'Mahmudul',
       email: 'Mahmudul@gmail.com',
       password: bcrypt.hashSync('12345678b', 10),
       isAdmin: false
    },
]

export default userData
