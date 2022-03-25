module.exports = waitTime => {
  const queue = []
  const obj = callback => {
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
  // Add a method to wait until the queue is empty.
  obj.wait = () => {
    return new Promise(resolve => {
      const interval = setInterval(
        () => {
          if (queue.length == 0) {
            clearInterval(interval)
            resolve()
          }
        },
        1
      )
    })
  }
  return obj
}
