module.exports = waitTime => {
  const queue = []
  return callback => {
    // Add the new callback.
    queue.push(async () => {
      await callback()
      await new Promise(resolve => setTimeout(resolve, waitTime))
      // Unqueue and call the next callback.
      if (queue.length >= 1) {
        queue.shift()
        if (queue.length) {
          queue[0]()
        }
      }
    })
    // Run the current callback directly if it's the only element in the queue.
    if (queue.length == 1) {
      queue[0]()
    }
  }
}
