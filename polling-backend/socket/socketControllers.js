const redisClient = require("../redis")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



module.exports.initializeUser = async socket => {
  socket.user = { ...socket.request.session.user };
};




module.exports.join_room = async (id, socket) => {
  console.log(socket.user)
  socket.join("poll_room:"+id)
}

module.exports.leave_room = async (id, socket) => {
  socket.leave("poll_room:"+id)
}


module.exports.vote_room = async (vote_data, socket, io) => {
  // is logged in
  if (!(socket.user && socket.user.username)) {
    // emit not logged in
    return
  }
  
  // the vote is new
  if (vote_data.old !== vote_data.new) {
    try {
      // Check if first time voting
      //  ... check w/ Answer (model) using user.id and correct poll.id
      
      // check server-side, what has the user voted on.
      const answer = await prisma.answer.findFirst({
        where: {
          userId: socket.user.userId,
          pollId: Number(vote_data.pollId)
        }
      })
      // *DOES IT MATCH WITH LOCAL SIDE?*
      console.log("ANSWER: ", answer)
      // if there is an old answer convert it into the new one
      if (answer) {
        await prisma.answer.update({
          where: {
            id: answer.id,
            userId: socket.user.userId,
            pollId: Number(vote_data.pollId)
          },
          data: {
            choiceId: Number(vote_data.new)
          }
        })
      } else {
        // else add a new answer
        await prisma.answer.create({
           data: {
            userId: socket.user.userId,
            pollId: Number(vote_data.pollId),
            choiceId: Number(vote_data.new)
          }
        })
      }

      // Emit to others
      socket.to("poll_room:"+vote_data.pollId).emit("vote:"+vote_data.pollId, vote_data)

      // also emit to self, your vote count will update based on this..
      socket.emit("poll_room:"+vote_data.pollId, vote_data)

    } catch (e) {
      // Emit no update when failed

      console.log("E: ", e)
    }
  }
}



module.exports.vote_room_lcl = async (vote_data, socket, io) => {
  // the vote is new
  if (vote_data.old !== vote_data.new) {
    try {
      // if not the first time voting
      if (vote_data.old) {
        // Update on the count sql
        await prisma.choice.update({
          where: {
            id: vote_data.old
          },
          data: {
            count: {
              decrement: 1
            }
          }
        })
      }
      
      // Update on the sql
      await prisma.choice.update({
        where: {
          id: vote_data.new
        },
        data: {
          count: {
            increment: 1
          }
        }
      })

      // Emit to others
      socket.to("poll_room:"+vote_data.pollId).emit("vote:"+vote_data.pollId, vote_data)
    } catch (e) {
      console.log("E: ", e)
    }
  }
}