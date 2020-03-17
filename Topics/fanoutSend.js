const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error0,connection)=>{
    if(error0){
        throw error0;
    }
    //Tries the connection with Rabbit, if it's successful then we have it in channel and we can use it
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }

        let exchange = 'logss';
        //Process lo que hace es recibir parámetros cuando se llama desde consola: ejemplo
        // node fanoutSend.js error => en este caso tendría el valor de error 
        let msg = process.argv.slice(2).join(' ') || 'Hello world!';

        channel.assertExchange(exchange, 'fanout',{
            durable: true
        });
        
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent %s",msg);
    });
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    },500);
});