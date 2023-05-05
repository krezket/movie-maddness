const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include:[Product]
  }).then((tag)=>{res.json(tag)})
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id,{
    // be sure to include its associated Product data
    include:[Product]
  }).then(tag=>{
    if(!tag){
      return res.status(404).json({msg:"no tag with that id in database!"})
    }
    res.json(tag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.name
  }).then(tag=>{
    res.json(tag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name:req.body.name
  },
  {
    where:{
      id:req.params.id
    }
  }).then(editTag=>{
    if(!editTag[0]){
      return res.status(404).json({msg:"no tag with this id in database!"})
    }
    res.json(editTag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(tag=>{
    if(!tag){
      return res.status(404).json({msg:"no tag with this id in database!"})
    }
    res.json(tag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

module.exports = router;
