const bcrypt =  require('bcrypt');

// bcrypt.genSalt(10,function(err,salt){
//     bcrypt
// })
const hash = bcrypt.hashSync("rafael",10);
// // const comparisson = bcrypt.hashSync("rafael",10);'
// let senha = "rafael" 

// console.log(compara)
let password = "aaa"

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password,salt, function(err, hash){
        //console.log(hash)
    })
})

    bcrypt.compare(password, "$2b$10$eir/iVFSAsV1Yv9Q18l7X.i2/r4D4unVf11B2edOsdNFM/4l0EKGe").then(function(result){
        console.log(result)
    })
  console.log(password)
  console.log(hash)
