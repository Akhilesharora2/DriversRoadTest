const subscriptions = require('../models/subscriptions');
const { subscribe } = require('../routes/P1Route');

const Subscription = async (req,res,next) =>{
    var check = req.body.subscriber;
    const subscriber = await subscriptions.findOne({'email':check});

        if(subscriber){
            res.status(400).send('Already a Subscriber');
        }else{
            const subscriber2 = new subscriptions({
                email: check
            })
            const check2 = await subscriber2.save();
            console.log("subscriber is3");
            res.status(200).send('You have successfully registered.');
        }
        next()
}

module.exports = Subscription;