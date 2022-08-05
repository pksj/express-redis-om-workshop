import { Router } from 'express'
import { personRepository } from '../om/person.js'

export const router = Router()

router.get('/all', async (req, res) => {
  const persons = await personRepository.search().return.all()
  res.send(persons)
})

router.get('/by-last-name/:lastName', async (req, res) => {
  const lastName = req.params.lastName
  const persons = await personRepository.search()
    .where('lastName').equals(lastName).return.all()
  res.send(persons)
})

router.get('/old-enough-to-drink-in-america', async (req, res) => {
  const persons = await personRepository.search()
    .where('age').gte(21).return.all()
  res.send(persons)
})

router.get('/non-verified', async (req, res) => {
  const persons = await personRepository.search()
    .where('verified').is.not.true().return.all()
  res.send(persons)
})

router.get('/verified-drinkers-with-last-name/:lastName', async (req, res) => {
  const lastName = req.params.lastName
  const persons = await personRepository.search()
    .where('verified').is.true()
      .and('age').gte(21)
      .and('lastName').equals(lastName).return.all()
  res.send(persons)
})

router.get('/with-statement-containing/:text', async (req, res) => {
  const text = req.params.text
  const persons = await personRepository.search()
    .where('personalStatement').matches(text)
      .return.all()
  res.send(persons)
})