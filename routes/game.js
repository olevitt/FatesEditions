/**
 * @description Game endpoint
 */
const express = require('express')
const Game = require('../models/GameModel')
const Book = require('../models/BookModel')
const User = require('../models/UserModel')

const router = express.Router()

/**
 * @method GET
 * @queryParam playerId
 * @return games array
 */
router.get('/', (req, res, next) => {
  const filter = {}
  if (req.query.playerId) {
    filter.playerId = req.query.playerId
  }
  Game.find(filter)
    .then(games => res.json(games), err => next(err))
})

/**
 * @method GET
 * @param gameId
 * @return game object
 */
router.get('/:gameId', (req, res, next) => {
  Game.findById(req.params.gameId)
    .then(game => res.json(game), err => next(err))
})

/**
 * @method POST
 * @return game object
 */
router.post('/', (req, res, next) => {
  if (req.body) {
    const game = new Game()
    User.findById(req.payload.user._id)
      .then(user => {
        game.book = req.body.book
        game.stats = req.body.stats
        game.playerId = user._id
        game.currentPageId = req.body.book.startingPageId
        game.bookStatus = 'up-to-date'
        game.path = {}
        game.save()
        .then(() => res.status(201).json(game), err => next(err))
      }, err => next(err))
  } else {
    res.status(400)
  }
})

/**
 * @method PUT
 * @bodyParam game
 * @return game object
 */
router.put('/:gameId', (req, res, next) => {
  if (req.body) {
    Game.findByIdAndUpdate(req.params.gameId, req.body, {new: true})
      .then(game => res.json(game), err => next(err))
  } else {
    res.sendStatus(400)
  }
})

/**
 * @method PATCH
 * @param gameId
 * @return game object
 */
router.patch('/:gameId', (req, res, next) => {
  Game.findById(req.params.gameId)
    .then((game) => {
      if (req.body.currentPageId) game.currentPageId = req.body.currentPageId
      if (req.body.stats) game.stats = req.body.stats
      game.save()
        .then(g => res.json(g), err => next(err))
    }, err => next(err))
})

/**
 * @method DELETE
 * @param gameId
 */
router.delete('/:gameId', (req, res, next) => {
  Game.findByIdAndRemove(req.params.gameId)
    .then(() => res.send('deleted'), err => next(err))
})

module.exports = router
