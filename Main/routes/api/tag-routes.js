const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model: Product, ProductTag}],
    });
    if (!tagData){
      res.status(404).json({message: 'No Tag data found with that ID!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
   res.status(400).json(err); 
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await tagData.update(req.body, {
      where: {
        id:req.params.id,
      },
    });
    if (!userData[0]) {
        res.status(404).json({ message: 'No Tag with this id!' });
        return;
        }
        res.status(200).json(userData);
    } catch (error) {
    res.status(500).json(err);
  }
});


// // UPDATE a user
// router.put('/:id', async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });






router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData){
      res.status(404).json({message: 'No Tag data found with that ID!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(err); 
  }
});

module.exports = router;
