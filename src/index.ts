import app from './app';

const main = () => {
  const port = app.get('port');
  app.listen(port);
  console.log('server on port ' + port);
};

main();
