import React from 'react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">About ALSEL</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>ALSEL is a leading online marketplace for buying and selling preloved items, connecting millions of users worldwide since 2020.</p>
        
        <p>Our mission is to create a sustainable and community-driven platform where people can find quality secondhand items while reducing waste and environmental impact.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
        <p>Founded by a group of entrepreneurs passionate about sustainability and the circular economy, ALSEL has grown from a small local platform to a global marketplace serving communities in over 50 countries.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
        <p>We envision a world where buying secondhand is the first choice for consumers, creating a more sustainable future for generations to come.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Sustainability:</strong> Reducing waste by extending the lifecycle of products</li>
          <li><strong>Community:</strong> Building connections between buyers and sellers</li>
          <li><strong>Trust:</strong> Creating a safe and reliable platform</li>
          <li><strong>Innovation:</strong> Constantly improving user experience</li>
        </ul>
      </div>
    </div>
  )
}
