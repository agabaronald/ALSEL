import React from 'react'
import Link from 'next/link'

export default function AccountHelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/help" className="text-gold-500 hover:underline">
          ← Back to Help Center
        </Link>
      </div>
      
      <h1 className="mb-6 text-3xl font-bold">Creating an Account</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Creating an account on ALSEL is quick and easy. Follow these simple steps to get started:</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Visit the Registration Page</h2>
        <p>Navigate to the <Link href="/register" className="text-gold-500 hover:underline">registration page</Link> by clicking on the "Register" link in the top-right corner of the homepage or by using the direct link.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Fill Out the Registration Form</h2>
        <p>Complete the registration form with the following information:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Full name</li>
          <li>Email address (must be valid for verification)</li>
          <li>Password (must be at least 8 characters)</li>
          <li>Phone number (optional but recommended for improved security)</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Verify Your Email</h2>
        <p>After submitting the registration form, you'll receive a verification email at the address you provided. Click on the verification link in the email to activate your account.</p>
        
        <div className="p-4 border rounded-md bg-gold-50 dark:bg-gold-900/20 my-8">
          <p className="font-medium">Tip: If you don't see the verification email in your inbox, check your spam or junk folder.</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Complete Your Profile</h2>
        <p>Once your email is verified, log in to your account and complete your profile by:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Adding a profile picture</li>
          <li>Setting your location</li>
          <li>Adding a brief bio (optional)</li>
          <li>Connecting your preferred payment method (for buying items)</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Start Using ALSEL</h2>
        <p>Congratulations! Your account is now fully set up, and you can start:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Browsing items for sale</li>
          <li>Creating your first listing</li>
          <li>Saving items to your wishlist</li>
          <li>Connecting with other users</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Account Security Tips</h2>
        <div className="bg-background border rounded-md p-6 my-8">
          <h3 className="text-xl font-semibold mb-4">Keeping Your Account Secure</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication for additional security</li>
            <li>Never share your login credentials with others</li>
            <li>Always log out when using shared computers</li>
            <li>Regularly review your account activity</li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Need Additional Help?</h2>
        <p>If you're experiencing issues with account creation or have any questions, please <Link href="/contact" className="text-gold-500 hover:underline">contact our support team</Link> for assistance.</p>
      </div>
    </div>
  )
}
