const amqp = require('amqplib/callback_api');

let args = process.argv.slice(2);

if(args.length == 0){
    console.log("Usage: receiverDirectTopic.js <facility>.<severity>");
    process.exit(1);
}

amqp.connect('amqp://cvnbngqr:nB5YMOuYT3pHYg-kDaaaRV2YRbvceqVE@turkey.rmq.cloudamqp.com/cvnbngqr',(error0,connection)=>{
    if(error0){
        throw error0;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        let exchange = 'topic-logs';

        channel.assertExchange(exchange,'topic',{
            durable:true
        });

        channel.assertQueue('',{
            exclusive: true
        },(error2,q)=>{
            if(error2){
                throw error2;
            }
            console.log('[*] Waiting for logs. to exit press CTRL+C');

            args.forEach((key)=>{
                channel.bindQueue(q.queue,exchange,key);
            });

            channel.consume(q.queue,(msg)=>{
                console.log(" [x] %s: '%s'", msg.fields.routingKey,msg.content.toString());
            },{
                noAck: true
            });       
        });
    });
});