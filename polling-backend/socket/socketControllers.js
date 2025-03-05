const redisClient = require("../redis")



module.exports.join_room = async (id, socket) => {
  socket.join("poll_room:"+id)

}