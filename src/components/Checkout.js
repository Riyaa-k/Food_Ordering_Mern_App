import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({subTotal}) => {


    const tokenHandler=(token)=>{
        console.log(token);
    }

  return (
    
    <StripeCheckout
    amount={subTotal*100}
    shippingAddress
    token={tokenHandler}
    stripeKey='pk_test_51NgirNSIGJwUe6gBa9w6dZxDZNqj84VsLmYXVljtbkJMkLupn8noadXKxcHprCaMjd5noxQU6ev8GJkvTueEK46B00IxHX7gYt'
    currency='INR'
    
    
    >
        <button className='btn bg-success mt-5'>Pay Now</button>
    </StripeCheckout>
  )
}

export default Checkout
