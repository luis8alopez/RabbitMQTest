const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error0,connection)=>{
    if(error0){
        throw error0;
    }

    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        let queue = 'test1';
        let msg = 'Hello world';

        channel.assertQueue(queue,{
            
            // messageTtl:9000,
            // maxLength:20,
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log("[x] Sent %s",msg);

    });

    setTimeout(()=>{
        connection.close();
        process.exit(0)
    },500);

});



