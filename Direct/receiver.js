const amqp = require('amqplib/callback_api');

//Connection String
amqp.connect('amqp://localhost',(error0,connection)=>{
    if(error0){
        throw error0;
    }

    //Creates Connection to Rabbit
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }

        let queue = 'test1';

        //Does the Queue exists?
        channel.assertQueue(queue, {
            durable: true
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        //Returns the message from the specific queue
        channel.consume(queue,(msg)=>{
            console.log("[x] Received message %s", msg.content.toString());
        },{
            noAck: true
        });
    });
});