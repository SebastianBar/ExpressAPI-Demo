import Model from './model'

function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    Model.findById(id).then(entity => {
      res.json({error: false, data: entity})
    })
  } else {
    Model.findAll().then(entities => {
      res.json({error: false, data: entities})
    })
  }
}

function POST (req, res) {
  Model.create({
    name: req.body.name
  })
    .then(entity => {
      res.json({error: false, data: entity})
    })
}

function PUT (req, res) {
  Model.findById(req.params.id).then(entity => {
    entity.updateAttributes({
      name:            (typeof req.body.name === 'undefined') ? entity.name : req.body.name
    }).then(() => {
      res.json({error: false, data: entity})
    })
  })
}

function DELETE (req, res) {
  Model.findById(req.params.id).then(entity => {
    entity.destroy()
      .then(() => {
        res.json({error: false, data: 'Entity deleted'})
      })
  }).catch(() => {
    res.status(404).json({error: true, data: {message: 'Object not found'}})
  })
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
