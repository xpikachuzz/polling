const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const createPollPOST =  async (req, res) => {
  // Body 
  const {title, choices, duration} = req.body

  // Create
  const result = await prisma.poll.create({
    data: {
      title,
      duration,
      choices: {
        create:
          choices.map(choice => ({
            prompt: choice,
          }))
      }
    }
  })

  if (result) {
    res.status(200).json({
      ok: true,
      message: 'Poll created',
      id: result.id
    })
  } else {
    res.status(200).json({
      ok: false,
      message: 'Try again later!',
    })
  }
}


async function pollGET (req, res) {
  const { pollId } = req.params
  // fetch data
  const data = await prisma.poll.findFirst({
    where: {
      id: Number(pollId)
    },
    include: {
      choices: true
    }
  })


  res.status(200).json(data)
}


module.exports = {createPollPOST, pollGET};
