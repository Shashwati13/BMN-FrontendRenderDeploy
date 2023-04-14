import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './PaymentForm.css'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const email='shashwatidiware@gmail.com'
    const paymentDate = new Date().toISOString().substring(0, 10);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("https://bookmynest-backend.onrender.com/payment", {
                amount: 1000,
                id,
                email,
                paymentDate
                
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button style={{
  display: 'block',
  fontsize: '16px',
  height: '50px',
  width: "calc(100% - 200px)",
  maxWidth: '500px',
  margin: '40px auto 0',
  backgroundColor: '#7ED321', // set background color to light green
  boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #C1C1C1',
  borderRadius: '4px',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 100ms ease-in-out',
  willChange: 'transform, background-color, box-shadow',
  border: 'none'}}>Pay</button>

            {/* <button style={{display: 'block',
                    fontsize: '16px',
                    height: '50px',
                    width: "calc(100% - 200px)",
                    maxWidth: '500px',
                    margin: '40px 15px 0',
                    backgroundColor: '#f6a4eb',
                    boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6',
                    borderRadius: '4px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 100ms ease-in-out',
                    willChange: 'transform, background-color, box-shadow',
                    border: 'none'}}>Pay</button> */}
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </>
    )
}