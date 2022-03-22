const router = require("express").Router();
const Person = require("../models/Person");

//create - criação de dados
router.post("/", async (req, res) => {
  // req.body

  // {name: Pedro, salary: 5000, aproved}
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatorio" });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    //criando dados
    await Person.create(person);

    res
      .status(201)
      .json({ message: "Pessoa inserida no sistema com sucesso uga" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dados da requisição, pela url = req.params

  const id = req.params.id;

  if (!person) {
    res.status(422).json({ message: "Usuario invalido" });
    return;
  }

  try {
    const person = await Person.findOne({ _id: id });

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - atualização de dados (PUT, PATCH)

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "O Usuario não foi encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//DELETE - deletar dados

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.deleteOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "O Usuario não foi encontrado" });
    return;
  }

  try {
    res.status(200).json({ message: "Usuario removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
