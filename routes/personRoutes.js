const router = require('express').Router()

const Person = require("../models/Person");

// Create-Criacao de dados
router.post("/", (req, res) => {
    //req.body
   
    //{name:"Rafael, salary: 5000, approved: false"}
   // const { name, salary, approved} = req.body;
    let newPerson = new Person({
      name: req.body.name,
      salary: req.body.salary,
      approved: req.body.approved
    })
    // if(!name){
    //   res.status(422).json({error:"o nome é obrigatorio"})
    //   return
    // }
  
    // const person = {
    //   name,
    //   salary,
    //   approved,
    // };
  
    //create
      //Criando dados

      newPerson.save()
      .then((result) => {
        res.json({
          sucess: true,
          msg:"Pessoa adicionada",
          result:{
            _id: result._id,
            name: result.name
          }
        })
      })
    }
  );

  //Read - leitura de dados
router.get('/', async(req,res) =>{
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async(req,res) =>{

    //extrair o dado da requisição, pela url =  req.params
    const id = req.params.id
    try{

        const person = await Person.findOne({_id: id})

        if(!person){
          res.status(422).json({message: "usuario nao encontrado"})
          return
        }
        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }

})


//Updates - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req,res) =>{
  const id = req.params.id

  const { name, salary, approved } = req.body;

  const person = {
    name,salary,approved,
  }
  try{

    const updatedPerson = await Person.updateOne({_id : id}, person)
    if(updatedPerson.matchedCount === 0){
      res.status(422).json({message: "usuario nao encontrado"})
      return
    }
    res.status(200).json(person)

  }catch(error){

    res.status(500).json({error:error})
  }

})

//Delete - deleter dados
router.delete("/:id", async(req,res) =>{
  const id = req.params.id
  const person = await Person.findOne({_id: id})

  if(!person){
    res.status(422).json({message: "usuario nao encontrado"})
    return
  }

  try {
    await Person.deleteOne({_id:id})
    res.status(200).json({data : person, message : "pessoa deletada com sucesso" })
  } catch (error) {
    res.status(500).json({error: error})
  }
})


  module.exports = router