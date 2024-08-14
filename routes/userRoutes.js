const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let passwordconfirm = req.body.passwordconfirm;
  if (!name) {
    return res.status(422).json({ msg: "Nome Necessário" });
  }
  if (!email) {
    return res.status(422).json({ msg: "Email Necessário" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha Necessária" });
  }
  if (password != passwordconfirm) {
    return res.status(422).json({ msg: "As senhas não conferem" });
  }
  const existingUser = await User.findOne({ $or: [{ name }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Usuário já existente" });
  }
  const hashPassword = bcrypt.hashSync(password, 10);

  let newUser = new User({
    name: name,
    email: email,
    password: hashPassword,
  });
  newUser
    .save()
    .then((result) => {
      res.json({
        sucess: true,
        msg: "Usuário criado com sucesso",
        result: {
          _id: result._id,
          name: result.name,
          password: result.password,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
});

router.get('/profile/:id', async(req,res) =>{
  const {id} = req.params.id

  const user = await User.findOne(id, '-password')

  if(!user){
    return res.status(404).json({msg: "Usuario inexistente"})
  }

  res.status(200).json({user})
})

router.get("/", async (req, res) => {
  try {
    const people = await User.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:name", async (req, res) => {
  const { name, password } = req.params;

  try {
    const people = await User.find({ name: name });
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  try {
    const user = await User.findOne({ name: name });
    const userPassword = user.password;
    const match = await bcrypt.compare(password, userPassword);
    if (match == false) {
      return res.status(401).json({ messagem: "Senha incorreta" });
    }
    if (!user) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res.status(200).json({status: 200 , message: "Conectado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dado da requisição, pela url =  req.params
  const id = req.params.id;
  try {
    const User = await User.findOne({ _id: id });

    if (!User) {
      res.status(422).json({ message: "usuario nao encontrado" });
      return;
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Updates - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const User = {
    name,
    password,
  };
  try {
    const updatedUser = await User.updateOne({ _id: id }, User);
    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: "usuario nao encontrado" });
      return;
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete - deleter dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const User = await User.findOne({ _id: id });

  if (!User) {
    res.status(422).json({ message: "usuario nao encontrado" });
    return;
  }

  try {
    await User.deleteOne({ _id: id });
    res
      .status(200)
      .json({ data: User, message: "pessoa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
