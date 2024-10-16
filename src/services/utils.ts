const ms = 500

const putCallToSleep = () => new Promise(resolve => setTimeout(resolve, ms))

export { putCallToSleep }
