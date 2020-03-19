const amqp = require('amqplib/callback_api');

amqp.connect('amqp://cvnbngqr:nB5YMOuYT3pHYg-kDaaaRV2YRbvceqVE@turkey.rmq.cloudamqp.com/cvnbngqr', (error0,connection)=>{
    if(error0){
        throw error0;
    }
    connection.createChannel((error1,channel)=>{
        if(error1){
            throw error1;
        }
        let exchange = 'topic-logs';
        let args = process.argv.slice(2);
        let key = (args.length>0) ? args[0] : 'anonymous.info';
        let msg = args.slice(1).join(' ') || 'Hello world!!!';

        channel.assertExchange(exchange,'topic',{
            durable: true
        });
        channel.publish(exchange,key,Buffer.from(msg));
        console.log("[x] Sent %s: '%s'",key,msg);
    });
    setTimeout(() => {
        connection.close();
        process.exit(0);
    },500);
});