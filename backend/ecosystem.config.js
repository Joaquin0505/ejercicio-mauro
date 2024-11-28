

module.exports={
    apps:[
        {
            name:"ejercicio-mauro",
            script:"npm",
            args:"run dev",
            env:{
                NODE_ENV:"develoment",
                ENV_VAR1:"enviroment-variable"
            }
        }
    ]
}