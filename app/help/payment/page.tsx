import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PaymentHelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/help" className="text-gold-500 hover:underline">
          ← Back to Help Center
        </Link>
      </div>
      
      <h1 className="mb-6 text-3xl font-bold">Payment Methods</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>ALSEL offers several secure payment options to ensure smooth transactions between buyers and sellers. This guide explains the available payment methods and how to use them.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Available Payment Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=Card" 
                  alt="Credit/Debit Card Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Credit/Debit Cards</h3>
            </div>
            <p className="text-sm text-muted-foreground">We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover.</p>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=PayPal" 
                  alt="PayPal Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">PayPal</h3>
            </div>
            <p className="text-sm text-muted-foreground">Connect your PayPal account for fast, secure payments with buyer protection.</p>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=Bank" 
                  alt="Bank Transfer Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Bank Transfer</h3>
            </div>
            <p className="text-sm text-muted-foreground">Connect your bank account for direct transfers (ACH in the US, SEPA in Europe).</p>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=Wallet" 
                  alt="ALSEL Wallet Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">ALSEL Wallet</h3>
            </div>
            <p className="text-sm text-muted-foreground">Store funds in your ALSEL Wallet for quick payments and to receive seller earnings.</p>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=Cash" 
                  alt="Cash Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Cash (Local Pickup)</h3>
            </div>
            <p className="text-sm text-muted-foreground">For local transactions, cash payment is available when you meet in person.</p>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-3">
                <Image 
                  src="/placeholder.svg?height=40&width=40&text=Apple" 
                  alt="Apple Pay Icon" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Apple Pay</h3>
            </div>
            <p className="text-sm text-muted-foreground">Available on iOS devices for fast, secure checkout with Touch ID or Face ID.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Adding a Payment Method</h2>
        
        <p>To add a new payment method to your account:</p>
        <ol className="list-decimal pl-6 mt-4 space-y-3">
          <li>Go to <strong>Account Settings</strong> in the dropdown menu</li>
          <li>Select <strong>Payment Methods</strong></li>
          <li>Click <strong>Add Payment Method</strong></li>
          <li>Choose the type of payment method you want to add</li>
          <li>Follow the prompts to enter your information</li>
          <li>Complete any required verification steps</li>
        </ol>
        
        <div className="p-4 border rounded-md bg-gold-50 dark:bg-gold-900/20 my-8">
          <p className="font-medium">Security Note: ALSEL uses industry-standard encryption to protect your payment information. We never store complete credit card numbers on our servers.</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Transaction Fees</h2>
        
        <div className="overflow-x-auto my-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Payment Method</th>
                <th className="border px-4 py-2 text-left">Buyer Fee</th>
                <th className="border px-4 py-2 text-left">Seller Fee</th>
                <th className="border px-4 py-2 text-left">Processing Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Credit/Debit Cards</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">2.9% + $0.30</td>
                <td className="border px-4 py-2">Instant</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">PayPal</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">2.9% + $0.30</td>
                <td className="border px-4 py-2">Instant</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Bank Transfer</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">1.5% (min $0.25, max $15)</td>
                <td className="border px-4 py-2">2-3 business days</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">ALSEL Wallet</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">1.0%</td>
                <td className="border px-4 py-2">Instant</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Cash</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">Instant</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Apple Pay</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">2.9% + $0.30</td>
                <td className="border px-4 py-2">Instant</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">When Payments Are Processed</h2>
        
        <p>As a buyer, you'll be charged immediately when you purchase an item or when a seller accepts your offer.</p>
        
        <p>As a seller, payment processing works as follows:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>For Shipping Items:</strong> Funds are held until the buyer receives the item and confirms it matches the description or 3 days after delivery (whichever comes first).</li>
          <li><strong>For Local Pickup:</strong> Funds are released immediately after the buyer confirms they've received the item.</li>
          <li><strong>Withdraw to Bank:</strong> Withdrawals to your bank account typically take 1-3 business days to process.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Payment Protection</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-background border rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Buyer Protection</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pay securely through ALSEL's platform</li>
              <li>Receive a full refund if item isn't as described</li>
              <li>Open a dispute if there are issues with your purchase</li>
              <li>24/7 customer support for transaction issues</li>
            </ul>
          </div>
          
          <div className="bg-background border rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Seller Protection</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verified buyer information</li>
              <li>Protection against fraudulent chargebacks</li>
              <li>Dispute resolution support</li>
              <li>Ability to provide shipping proof</li>
            </ul>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6 my-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Is it safe to use my credit card on ALSEL?</h3>
            <p>Yes, ALSEL uses industry-standard encryption and security practices to protect your financial information. We are PCI DSS compliant and never store complete credit card details on our servers.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">What should I do if a transaction fails?</h3>
            <p>If a payment fails, first check that your payment details are correct and that you have sufficient funds. If problems persist, try another payment method or contact your payment provider. For ongoing issues, contact our support team.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I get a refund if something goes wrong with my purchase?</h3>
            <p>Yes, ALSEL offers buyer protection. If an item doesn't arrive or isn't as described, you can open a dispute through our platform within 7 days of delivery (or expected delivery date).</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Need More Help?</h2>
        <p>If you have specific questions about payments or are experiencing issues, please <Link href="/contact" className="text-gold-500 hover:underline">contact our support team</Link> for assistance.</p>
      </div>
    </div>
  )
}
