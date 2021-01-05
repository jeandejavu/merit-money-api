import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Merit Money - Distribuição de pontos por merecimento',
    description:
      'Essa é a documentação da API feita para distribuir os pontos para pessoas que fazem a diferença !',
    version: '1.0.0',
    contact: {
      name: 'Jean Melo',
      email: 'jeanr.dejavu@gmail.com',
      url: 'https://www.linkedin.com/in/jean-melo-00a8088a',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Login',
      description: 'APIs relacionadas a Login',
    },
  ],
  paths,
  components,
  schemas,
};
