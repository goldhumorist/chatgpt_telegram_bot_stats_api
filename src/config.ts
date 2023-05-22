import nodeConfig from 'config';

interface IConfig {
  nodeEnv: string;
  SERVER: {
    PORT: number | string;
    HOST: string;
  };
  ELASTIC_SEARCH: {
    URL: string;
    API_KEY: string;
    USERNAME: string;
    PASSWORD: string;
  };
}

export const config: IConfig = {
  nodeEnv: nodeConfig.get('nodeEnv'),
  SERVER: nodeConfig.get('SERVER'),
  ELASTIC_SEARCH: nodeConfig.get('ELASTIC_SEARCH'),
};
