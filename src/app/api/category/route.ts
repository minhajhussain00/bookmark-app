import { ApiResponseUtil } from '@/lib/ApiResponse'
import { connectDB } from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connectDB()
  const { name } = await req.json()

  if (!name) return NextResponse.json({ error: 'Category name is required' }, { status: 400 })

  try {
    const category = await Category.create({ name })
    return NextResponse.json( ApiResponseUtil.success("Category created successfully", category), { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Category creation failed' }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()
 try {
     const categories = await Category.find()
     return NextResponse.json( ApiResponseUtil.success("Categories fetched successfully", categories), { status: 200 })
 } catch (error) {
     return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
    
 }

