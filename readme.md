# Introduction:


# Database structure:

Poll
- id: used in the url. PK
- title: Question/Prompt of the poll
- Choices: Choices[]
- Expiry date?


Choices: 
- id
- prompt: text describing the choice
- counts: number of people who chose 
- FKPoll: Poll 
- FKPollId: Poll's id



# How can socketio be used?
When a poll is created:
```js
//  the following code must happen after a "connection" is made.
app.post((req, res) => {
  // add it to the db

  // no need to make a room, in the client-side they will be
  // redirected to the new poll.
})

io.on("connect", (socket) => {
  // on join..
  socket.on("poll_join", 
    (pollId) => pollJoin(socket, pollId, io)
  )
  // on disconnect..
}


async function pollJoin(socket, pollId, io) {
  // join the room
  socket.join("poll:"+pollId)
}

// Posting choices
app.post(postingChoice)

async function postingChoice(req, res) {
  try {
    // update database on the update of views.

    // if successful: Emit to viewers
    if (result) {
      io.to("poll:"+req.body.pollId).emit({oldChoice: req.body.oldChoice, choice: req.body.choice})
      res.status(200).join(success: true, prompt: "New choice submitted!")
    } else {
      res.status(200).join(success: false, prompt: "Couldn't be submitted to the database!")
    }
  } catch (e) {
      res.status(200).join(success: false, prompt: e)
  }
}
```

Possible problems: 
- If a user is connected to multiple rooms (multiple tabs open) then your should also emit the pollId aswell.



Each poll has a room made for it:
```js
io.on("connectedPoll:"+pollId, (socket) => {
  socket.to().emit("connected");
});
setInterval(() => {
  // Clean-up
  // delete the io and unlisteners
}, timer)

```


# Order to implement:
1. Make sql based poll website: 
   1. Make frontend w/ react-router-dom: 
      1. Homepage
      2. Polling
      3. Create poll w/ form validation (Formik and Yup)
      4. Fetch poll data of current page
   2. Make backend:
      1. `poll/:id`
         1. get data
         2. post choice
      2. `poll`
         1. Has validation (Yup)
         2. create poll w/ expiry
         3. delete poll
2. Add IO and Socket
3. Make Log In system
   1. Login/Signup
   2. React doesn't use localStorage
   3. User model:
      1. Answer[]
      2. username
      3. password
      4. userId   (sessionId)?
4. Only admins can view the poll results
5. 