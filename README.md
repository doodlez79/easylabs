`Build application via Docker(for example on port 3333):`\
    - docker build -t easy-labs-port-3333 --build-arg BACKEND_PORT=3333 .\
    - docker run -p 3333:3333 -d easy-labs-port-3333

Without Docker

`First step:`\
    - From root folder run: `lerna bootstrap`

`Build designer separately:`\
    - cd ./apps/designer\
    - yarn build\
    - After this commands artefacts will be in `build` folder

`Build report separately:`\
    - cd ./apps/report\
    - yarn build\
    - After this commands artefacts will be in `build` folder

`Build backend separately:`\
    - cd ./apps/backend\
    - yarn build\
    - After this commands artefacts will be in `dist` folder

`Attention!!!`:
```
    Applications should be placed near of each other:
    designer/
        -/build
    report/
        -/build
    backend/
        -/dist
```

`Run backend (from backend folder):`
```
    NODE_ENV=production API_PORT=<BACKEND_PORT> node dist/main.js
```

`Short list of commands:`
```
- yarn lerna bootstrap
- cd ./apps/designer && yarn build
- cd ./apps/report && yarn build
- cd ./apps/backend && yarn build
- cd ./apps/backend
- NODE_ENV=production API_PORT=<BACKEND_PORT> node dist/main.js
```