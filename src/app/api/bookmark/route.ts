import { ApiResponseUtil } from '@/lib/ApiResponse'
import { connectDB } from '@/lib/db'
import Bookmark from '@/models/Bookmark'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await connectDB()
  try {
    const { title, url, categoryId, tags, note } = await req.json()
  
    if (!title || !url) {
      return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 })
    }
  
    const bookmark = await Bookmark.create({ title, url, categoryId, tags, note })
    return NextResponse.json(ApiResponseUtil.success('Bookmark created successfully', bookmark), { status: 201 })
  } catch (error) {
    return NextResponse.json(ApiResponseUtil.error('Error creating bookmark', error), { status: 500 })
    
  }
}

export async function GET() {
  await connectDB()
 try {
     const bookmarks = await Bookmark.find().populate('categoryId')
     return NextResponse.json(bookmarks)
 } catch (error) {
     return NextResponse.json(ApiResponseUtil.error('Error fetching bookmarks', error), { status: 500 })
    
 }
}
