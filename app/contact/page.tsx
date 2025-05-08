import React from 'react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-lg">We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us using one of the methods below or by filling out the contact form.</p>
          
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Customer Support</h3>
                <p>Email: support@alsel.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-medium">Business Inquiries</h3>
                <p>Email: business@alsel.com</p>
              </div>
              
              <div>
                <h3 className="font-medium">Headquarters</h3>
                <p>123 Market Street</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Hours of Operation</h2>
            <p>Customer Support is available:</p>
            <p>Monday to Friday: 9:00 AM - 8:00 PM EST</p>
            <p>Saturday: 10:00 AM - 6:00 PM EST</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h2 className="mb-6 text-2xl font-semibold">Send Us a Message</h2>
          
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="mb-1 block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label htmlFor="lastname" className="mb-1 block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                Subject
              </label>
              <select
                id="subject"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="account">Account Issues</option>
                <option value="billing">Billing Questions</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="rounded-md bg-gold-500 px-4 py-2 font-medium text-black hover:bg-gold-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
