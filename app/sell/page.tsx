"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock categories
const categories = [
  { id: "electronics", name: "Electronics", subcategories: ["Phones", "Computers", "Audio", "Cameras"] },
  { id: "fashion", name: "Fashion", subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"] },
  { id: "home", name: "Home & Living", subcategories: ["Furniture", "Kitchenware", "Decor", "Appliances"] },
  { id: "toys", name: "Toys & Games", subcategories: ["Board Games", "Video Games", "Toys", "Collectibles"] },
]

// Mock conditions
const conditions = ["New", "Like New", "Good", "Fair", "Poor"]

export default function SellPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    const selected = categories.find((cat) => cat.id === value) || null
    setSelectedCategory(selected)
    setSubcategory("")
  }

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For this demo, we'll just add placeholder images
    if (images.length < 10) {
      const newImage = `/placeholder.svg?height=300&width=300&text=Image+${images.length + 1}`
      setImages([...images, newImage])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setIsSuccess(false)

    if (!user) {
      setError("You must be logged in to create a listing")
      setIsLoading(false)
      return
    }

    if (images.length === 0) {
      setError("Please add at least one image")
      setIsLoading(false)
      return
    }

    try {
      const productData = {
        title,
        description,
        price: Number.parseFloat(price),
        category,
        subcategory,
        condition,
        location,
        sellerId: user.id,
        images,
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create listing")
        return
      }

      setIsSuccess(true)

      // Reset form
      setTitle("")
      setDescription("")
      setPrice("")
      setCategory("")
      setSubcategory("")
      setCondition("")
      setLocation("")
      setImages([])
      setSelectedCategory(null)

      // Redirect to product page after a short delay
      setTimeout(() => {
        router.push(`/product/${data.product.id}`)
      }, 2000)
    } catch (err) {
      console.error("Error creating listing:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sell an Item</h1>
            <p className="mt-2 text-muted-foreground">Fill in the details below to create your listing</p>
          </div>
          <ThemeToggle />
        </div>

        {isSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
            <AlertDescription>
              Your listing has been created successfully! Redirecting to your product page...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>
                    Add up to 10 photos. The first image will be your listing's cover photo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md border bg-white dark:bg-gray-800">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 10 && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="flex aspect-square items-center justify-center rounded-md border border-dashed bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <Plus className="h-6 w-6" />
                          <span className="text-xs">Add Photo</span>
                        </div>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Basic Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                  <CardDescription>Provide the essential information about your item</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., iPhone 13 Pro Max - 256GB - Pacific Blue"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail, including condition, features, and reason for selling"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={handleCategoryChange} required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Select value={subcategory} onValueChange={setSubcategory} disabled={!selectedCategory} required>
                        <SelectTrigger id="subcategory">
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory?.subcategories.map((subcat) => (
                            <SelectItem key={subcat} value={subcat}>
                              {subcat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={condition} onValueChange={setCondition} required>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((cond) => (
                            <SelectItem key={cond} value={cond}>
                              {cond}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (SGD)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Orchard, Singapore"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-black" disabled={isLoading}>
                    {isLoading ? "Creating Listing..." : "List Item"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Add clear, well-lit photos from multiple angles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Write detailed descriptions including any flaws or defects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Set a competitive price by checking similar listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Respond quickly to buyer inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Be honest about the condition of your item</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prohibited Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm">The following items are not allowed on ALSEL:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Counterfeit or replica items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Weapons, firearms, and ammunition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Illegal drugs and drug paraphernalia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-gold-500">•</span>
                    <span>Adult content and services</span>
                  </li>
                </ul>
                <Link href="/prohibited-items" className="mt-4 block text-sm font-medium text-gold-500 hover:underline">
                  View full prohibited items list
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  If you have any questions or need assistance with your listing, our support team is here to help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

