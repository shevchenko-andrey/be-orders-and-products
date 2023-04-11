export interface IGlobalConfig {
  port: number;
  accessSecretKey: string;
  accessTokenExpiration: string;
  refreshSecretKey: string;
  refreshTokenExpiration: string;
  typeOrmDatabase: ITypeOrmOptions;
}

export interface ITypeOrmOptions {
  host: string;
  port: number;
  type: 'postgres';
  username: string;
  password: string;
  database: string;
  entities: unknown[];
  synchronize: boolean;
}
