//Routing en Node
const http = require("http"); 
const cursos = require("./cursos");

const servidor = http.createServer((req, res)=>{ //Creamos el servidor
    const { method } = req; //Usamos destructuring //Para los request hacemos destructuring
    switch (method) {
        case "GET":
            return manejarSolicitudGET(req, res); //Con esta fn manejamos la solicitud
        case "POST":
            return manejarSolicitudPOST(req, res);
        case "PUT":
            return manejarSolicitudPUT(req, res);
        case "DELETE":
            return manejarSolicitudDELETE(req, res);
        default:
            res.statusCode = 501;
            res.end("El metodo usado no puede ser manejado por el sv");
    }

});

const PUERTO = 3000;

function manejarSolicitudGET(req,res) {
    const path = req.url;

    console.log(res.statusCode); //200 ok
    //Siempre será 200 por defecto
    //Para hacer otros status hay que configurar cosas

    if(path === "/"){
        res.writeHead(200, {"Content-type": "application/JSON"});
        //Podemos de esta manera modificar los valores de los headers que se envían
        return res.end("Bienvenidos a mi primer servidor y API creados con Node.js")
    } else if (path=== "/cursos") {
        return res.end(JSON.stringify(cursos.infoCursos));
    }else if (path=== "/cursos/programacion") {
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    } else {
        res.statusCode = 404;
        return res.end("El recurso solicitado no existe");
    }
}

function manejarSolicitudPOST(req,res) {
    const path = req.url;
    console.log(res.statusCode);
    if(path === "/cursos/programacion"){ //Vamos a hacer que el usuario agregue un curso de programación

        //Para definir el cuerpo del POST en dado caso
        let cuerpo = "";

        req.on("data", contenido =>{
            cuerpo += contenido.toString();
        });

        req.on("end", ()=>{
            console.log(cuerpo);
            console.log(typeof cuerpo);
            cuerpo = JSON.parse(cuerpo);
            console.log(typeof cuerpo);
            console.log(cuerpo.titulo);
            return res.end("El servidor recibio una solicitud POST para /cursos/programacion")
        });

    } else {
        res.statusCode = 404;
        return res.end("El recurso solicitado no existe");
    }
}

function manejarSolicitudPUT(req, res) {
    const path = req.url;
    console.log(res.statusCode);
    if(path === "/"){
        return res.end("El servidor recibio una solicitud PUT")
    }
}

function manejarSolicitudDELETE(req, res) {
    const path = req.url;
    console.log(res.statusCode);
    if(path === "/"){
        return res.end("El servidor recibio una solicitud DELETE")
    }
}

servidor.listen(PUERTO, ()=>{
    console.log(`El servidor está escuchando en el puerto: ${PUERTO}`);
});
