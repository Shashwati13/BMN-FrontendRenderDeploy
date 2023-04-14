import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51MwcKeIwzH30Dc7oSSs7dEGPX5InYVbA0O9PshrYpKmYCJ9jegkDkweSvhhJLs1HjDAXpGIXnvf3xRrN1zTRlTws00vYqM72Tk"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}