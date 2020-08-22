# React Cluster Marker - API

Projeto feito com Express e Supercluster que recebe uma massa de dados em JSON com coordenadas, essas são passadas para o supercluster que com um nível de zoom e coordenadas de limites agrupa as mesmas retornando para o frontend.

## Instruções

Instalar dependêcias:

`$ npm install`

`$ npm run dev` para rodar o projeto com nodemon.

`$ node src/index.js` para rodar o projeto sem o watcher.

## Request de exemplo

`http://localhost:3333/api/v1?zoom=10&nwlng=-47.05027807759575&selat=-23.79534927950087&selng=-46.0917209486895&nwlat=-22.833100269607016`

O parêmtro zoom é o único obrigatório, os demais são opcionais tendo valores default assumidos para o cálculo dos clusters.
