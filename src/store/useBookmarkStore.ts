import { create } from 'zustand'
import axios from 'axios'
interface Bookmark {
  _id: string
  title: string
  url: string
  categoryId: { _id: string; name: string }
  tags: string[]
  note?: string
}

interface BookmarkStore {
  bookmarks: Bookmark[]
  fetchBookmarks: () => Promise<void>
  addBookmark: (data: Omit<Bookmark, '_id' | 'categoryId'> & { categoryId: string }) => Promise<void>
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
   bookmarks: [],
    fetchBookmarks: async () => {
        try {
        const response = await axios.get('/api/bookmarks')
        set({ bookmarks: response.data })
        } catch (error) {
        console.error('Error fetching bookmarks:', error)
        }
    },
    addBookmark: async (data) => {
        try {
        const response = await axios.post('/api/bookmarks', data)
        set((state) => ({ bookmarks: [...state.bookmarks, response.data] }))
        } catch (error) {
        console.error('Error adding bookmark:', error)
        }
    },
}))