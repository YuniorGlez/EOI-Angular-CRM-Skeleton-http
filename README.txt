Hola ! Este es el repositorio de lo que podría ser una API RESTFULL con su correspondiente front, pero eso no es parte de este curso :P

Lo que tenemos que saber es que una vez descarguemos el repositorio, abrimos una terminal y vamos a ejecutar lo siguiente :
 node server.js

 Si tenemos NodeJS instalado en nuestro pc y todo ha salido bien nos saldrá un mensaje en la consola diciendo que nuestro server está inicializado y listo en el puerto 3000

 A partir de ahora, tenemos un servidor escuchando en 'http://localhost:3000/' el cual podemos usar para guardar los customers de nuestro CRM

 Por lo tanto existirán los siguientes endpoints :
        GET : 'http://localhost:3000/api/customers'
        GET : 'http://localhost:3000/api/customers/:idCustomer
        POST : 'http://localhost:3000/api/customers'
        DELETE : 'http://localhost:3000/api/customers/:idCustomer'
        PUT : 'http://localhost:3000/api/customers/:idCustomer'

Esto es una api simplona, en el futuro y en apis de terceros habrá que autentificarse antes de usar la api, mandarse un token de autentificación en cada request, las queries grandes vendrán paginadas etc etc.
