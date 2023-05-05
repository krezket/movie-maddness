const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
    Category.findAll({
      // be sure to include its associated Products
      include:[Product]
    })
    .then((cat)=>{
      res.json(cat)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id,{
    // be sure to include its associated Products
    include:[Product]
  }).then(category=>{
    if(!category){
      return res.status(404).json({msg:"no category with that id in database!"})
    }
    res.json(category)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.name
  }).then(newCtgry=>{
    res.json(newCtgry)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.name
  },
  {
    where:{
      id:req.params.id
    }
  }).then(editCtgry=>{
    if(!editCtgry[0]){
      return res.status(404).json({msg:"no category with this id in database!"})
    }
    res.json(editCtgry)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCtgry=>{
    if(!delCtgry){
      return res.status(404).json({msg:"no category with this id in database!"})
    }
    res.json(delCtgry)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

module.exports = router;
