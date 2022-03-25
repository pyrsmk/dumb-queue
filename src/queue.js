module.exports = waitTime => {
  const queue = []
  return {
    add(callback) {
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
    },
    wait() {
      // Wait until the queue is empty.
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
  }
}
