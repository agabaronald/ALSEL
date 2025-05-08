import React from 'react'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: May 1, 2025</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to ALSEL ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the ALSEL website, mobile application, and services (collectively, the "Services").</p>
        <p>By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Using Our Services</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Account Registration</h3>
        <p>To use certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Account Security</h3>
        <p>You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">3. Buying and Selling</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Listings</h3>
        <p>As a seller, you are responsible for the accuracy of your listings, including descriptions, prices, and images. You must have the legal right to sell the items you list.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Transactions</h3>
        <p>ALSEL is a platform that facilitates transactions between buyers and sellers. We do not guarantee the quality, safety, or legality of items sold, the truth or accuracy of listings, or the ability of sellers to sell items or buyers to pay for them.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Prohibited Activities</h2>
        <p>You agree not to engage in any of the following activities:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Violating any laws or regulations</li>
          <li>Posting illegal or prohibited content</li>
          <li>Impersonating others or providing false information</li>
          <li>Interfering with or disrupting our Services</li>
          <li>Attempting to gain unauthorized access to our Services</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to Terms</h2>
        <p>We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our Services and updating the "Last updated" date. Your continued use of our Services after the changes take effect constitutes your acceptance of the modified Terms.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to our Services at any time for any reason, including violation of these Terms, without notice.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: terms@alsel.com</p>
        <p>Address: 123 Market Street, San Francisco, CA 94105, USA</p>
      </div>
    </div>
  )
}
