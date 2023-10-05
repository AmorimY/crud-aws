const router = require('express').Router();

const Note =  require("../models/Note");

//create
router.post("/", async (req,res) =>{
    const {content} = req.body;

    if(!content){
        res.status(422).json({error: "Necessario conteúdo"})
    };

    const note = {
        content,
    };

    try {
        await Note.create(note);

        res.status(201).json(
            {data: note ,message: "nota inserida com sucesso"}
            );
    } catch (error) {
        res.status(500).json({error:error});
    }
});
//find
router.get('/', async(req,res) =>{
    try {
        const note = await Note.find()
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//update 
router.get('/:id', async(req,res) =>{

    //extrair o dado da requisição, pela url =  req.params
    const id = req.params.id
    try{

        const note = await Note.findOne({_id: id})

        if(!note){
          res.status(422).json({message: "nota nao encontrada"})
          return
        }
        res.status(200).json(note)

    }catch(error){
        res.status(500).json({error: error})
    }

})

//delete
router.delete("/:id", async(req,res) =>{
    const id = req.params.id
    const nota = await Note.findOne({_id: id})
  
    if(!nota){
      res.status(422).json({message: "nota nao encontrada"})
      return
    } 
  
    try {
      await Note.deleteOne({_id:id})
      res.status(200).json({data: nota ,message : "Nota " + " removida"})
    } catch (error) {
      res.status(500).json({error: error})
    }
  })
module.exports = router ;
