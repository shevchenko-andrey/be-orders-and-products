import { User } from '../auth/user.entity';

const configuration = () => {
  const {
    PORT,
    NODE_ENV,
    API_HOST,
    TYPEORM_PORT,
    TYPEORM_PASSWORD,
    TYPEORM_USERNAME,
    TYPEORM_DATABASE,
  } = process.env;

  const isDevelopment = NODE_ENV === 'development';

  return {
    port: parseInt(PORT, 10) || 8080,
    typeOrmDatabase: {
      host: API_HOST,
      port: parseInt(TYPEORM_PORT, 10) || 5432,
      type: 'postgres',
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [User],
      synchronize: isDevelopment,
      dropSchema: isDevelopment,
    },
  };
};

export default configuration;
