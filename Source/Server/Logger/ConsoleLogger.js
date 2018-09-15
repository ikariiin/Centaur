class ConsoleLogger {
  static log(message, level = 'log') {
    if(typeof message === 'object') {
      console.log(`\u001b[33m[${level}]\u001b[0m`, message);
    } else {
      console.log(`\u001b[33m[${level}]\u001b[0m ${message}`);
    }
  }
}

module.exports = ConsoleLogger;