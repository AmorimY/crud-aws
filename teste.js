const bcrypt =  require('bcrypt');

bcrypt.genSalt(10,function(err,salt){
    bcrypt
})

const hash = bcrypt.hashSync("rafael",10);
// const comparisson = bcrypt.hashSync("rafael",10);'
let senha = "rafael" 

let compara = bcrypt.compareSync(senha, hash)
console.log(compara)
