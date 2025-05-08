import React from 'react'
import Link from 'next/link'

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Help Center</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Getting Started</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/help/account" className="text-gold-500 hover:underline">
                Creating an Account
              </Link>
            </li>
            <li>
              <Link href="/help/profile" className="text-gold-500 hover:underline">
                Setting Up Your Profile
              </Link>
            </li>
            <li>
              <Link href="/help/verification" className="text-gold-500 hover:underline">
                Account Verification
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Buying</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/help/search" className="text-gold-500 hover:underline">
                Searching for Items
              </Link>
            </li>
            <li>
              <Link href="/help/payment" className="text-gold-500 hover:underline">
                Payment Methods
              </Link>
            </li>
            <li>
              <Link href="/help/delivery" className="text-gold-500 hover:underline">
                Delivery Options
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Selling</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/help/listing" className="text-gold-500 hover:underline">
                Creating a Listing
              </Link>
            </li>
            <li>
              <Link href="/help/photos" className="text-gold-500 hover:underline">
                Taking Good Photos
              </Link>
            </li>
            <li>
              <Link href="/help/pricing" className="text-gold-500 hover:underline">
                Pricing Strategies
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Safety & Security</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/help/secure" className="text-gold-500 hover:underline">
                Secure Trading
              </Link>
            </li>
            <li>
              <Link href="/help/privacy" className="text-gold-500 hover:underline">
                Privacy Protection
              </Link>
            </li>
            <li>
              <Link href="/help/reporting" className="text-gold-500 hover:underline">
                Reporting Issues
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Account Management</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/help/settings" className="text-gold-500 hover:underline">
                Account Settings
              </Link>
            </li>
            <li>
              <Link href="/help/notifications" className="text-gold-500 hover:underline">
                Notification Preferences
              </Link>
            </li>
            <li>
              <Link href="/help/deactivate" className="text-gold-500 hover:underline">
                Deactivating Your Account
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
          <p className="mb-4 text-muted-foreground">
            Need more help? Our support team is available to assist you.
          </p>
          <Link href="/contact" className="inline-block rounded bg-gold-500 px-4 py-2 font-medium text-black">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
