# Next.js OpenJira App
Para correr localmente, se necesita la BDD
```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Llenar la BD  de datos con informacion de pruebas

llamara> 
```
    http://localhost:3000/api/seed
```