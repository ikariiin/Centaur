class ConsoleLogger {
  static log(message, level = 'log') {
    if(typeof message === 'object') {
      console.log(`\u001b[33m[${level}]\u001b[0m`, message, '\n -----------------------------------------');
    } else {
      console.log(`\u001b[33m[${level}]\u001b[0m ${message} \n -----------------------------------------`);
    }
  }
}

module.exports = ConsoleLogger;