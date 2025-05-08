import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ListingHelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/help" className="text-gold-500 hover:underline">
          ← Back to Help Center
        </Link>
      </div>
      
      <h1 className="mb-6 text-3xl font-bold">Creating a Listing</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Creating an effective listing is key to selling your items quickly and at the best price. Follow this guide to create listings that stand out.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Start a New Listing</h2>
        <p>Click on the "Sell" button in the top navigation bar or the "+" button in the mobile app to start creating a new listing.</p>
        
        <div className="my-8 flex justify-center">
          <div className="relative h-[200px] w-[350px] rounded-lg border overflow-hidden">
            <Image 
              src="/placeholder.svg?height=200&width=350&text=Sell+Button+Screenshot" 
              alt="Screenshot showing how to start a new listing" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Add Photos</h2>
        <p>High-quality photos are essential for a successful listing. You can add up to 10 photos per listing.</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Take photos in good lighting</li>
          <li>Show the item from multiple angles</li>
          <li>Include photos of any defects or wear</li>
          <li>Use a clean, uncluttered background</li>
          <li>Avoid using stock photos - buyers want to see the actual item</li>
        </ul>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-background border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-green-500">Good Example</h3>
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=200&width=300&text=Good+Photo+Example" 
                alt="Example of a good product photo" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm">Clear lighting, neutral background, shows the entire item</p>
          </div>
          
          <div className="bg-background border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-red-500">Poor Example</h3>
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden">
              <Image 
                src="/placeholder.svg?height=200&width=300&text=Poor+Photo+Example" 
                alt="Example of a poor product photo" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm">Poor lighting, cluttered background, item partially visible</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Write a Detailed Title and Description</h2>
        <p><strong>Title:</strong> Create a clear, descriptive title (max 80 characters) that includes:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Brand name</li>
          <li>Item type</li>
          <li>Size, color, or model number (if applicable)</li>
          <li>Condition (New, Like New, Good, etc.)</li>
        </ul>
        
        <p className="mt-4"><strong>Description:</strong> Write a comprehensive description that covers:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Detailed features and specifications</li>
          <li>Dimensions or measurements</li>
          <li>Age of the item and how long you've owned it</li>
          <li>Any flaws, damage, or signs of wear</li>
          <li>Reason for selling (optional)</li>
          <li>Whether accessories or original packaging are included</li>
        </ul>
        
        <div className="p-4 border rounded-md bg-gold-50 dark:bg-gold-900/20 my-8">
          <p className="font-medium">Tip: Be honest about the condition of your item. Transparency builds trust with buyers and reduces the likelihood of returns or disputes.</p>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Select the Right Category</h2>
        <p>Choose the most appropriate category and subcategory for your item. This helps potential buyers find your listing when they browse or search.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Set a Competitive Price</h2>
        <p>Research similar items on ALSEL to get an idea of market value. You can:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Set a fixed price</li>
          <li>Enable the "Offers" option to allow buyers to make offers</li>
          <li>Consider bundle pricing if selling multiple items</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 6: Specify Shipping Options</h2>
        <p>Decide how you want to handle delivery:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Local pickup (meet in person)</li>
          <li>Standard shipping (you ship the item)</li>
          <li>Free shipping (you cover shipping costs)</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Step 7: Review and Publish</h2>
        <p>Before publishing, review all information for accuracy. Once you're satisfied, click "Publish Listing" to make your item available to millions of potential buyers.</p>
        
        <div className="bg-background border rounded-md p-6 my-8">
          <h3 className="text-xl font-semibold mb-4">Listing Best Practices</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep your listing up to date - edit if details change</li>
            <li>Respond promptly to buyer questions</li>
            <li>Consider seasonal timing for certain items</li>
            <li>Refresh your listing periodically to maintain visibility</li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Need More Help?</h2>
        <p>If you're having trouble creating a listing or have specific questions, please <Link href="/contact" className="text-gold-500 hover:underline">contact our support team</Link>.</p>
      </div>
    </div>
  )
}
