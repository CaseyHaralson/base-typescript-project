process.on('SIGINT', () => {
  console.log(
    'Got SIGINT event. Starting graceful shutdown ',
    new Date().toISOString()
  );
  shutdown();
});

process.on('SIGTERM', () => {
  console.log(
    'Got SIGTERM event. Starting graceful shutdown ',
    new Date().toISOString()
  );
  shutdown();
});

function shutdown() {
  // probably want to wrap the server in npm project "stoppable"
  // so it will handle any server connections
  // then
  // call server.close() or server.stop()
  // and close any database connections
  // etc
  // Note: you might need to extend the host timeout if we aren't
  // getting the "Graceful shutdown" log message
  console.log('Graceful shutdown ', new Date().toISOString());
}
