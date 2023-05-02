import { IGlobalConfig } from './config.interfaces';

const configuration = (): IGlobalConfig => {
  const {
    PORT,
    NODE_ENV,
    API_HOST,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION,
    TYPEORM_PORT,
    TYPEORM_PASSWORD,
    TYPEORM_USERNAME,
    TYPEORM_DATABASE,
  } = process.env;

  const isDevelopment = NODE_ENV === 'development';

  return {
    port: parseInt(PORT, 10) || 8080,

    accessSecretKey: ACCESS_TOKEN_SECRET,
    accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,

    refreshSecretKey: REFRESH_TOKEN_SECRET,
    refreshTokenExpiration: REFRESH_TOKEN_EXPIRATION,

    typeOrmDatabase: {
      host: API_HOST,
      port: parseInt(TYPEORM_PORT, 10) || 5432,
      type: 'postgres',
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: isDevelopment,
    },
  };
};

export default configuration;
