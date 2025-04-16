import axios from 'axios'
import { create } from 'zustand'
axios
interface Category {
  _id: string
  name: string
}

interface CategoryStore {
  categories: Category[]
  fetchCategories: () => Promise<void>
  addCategory: (name: string) => Promise<void>
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    fetchCategories: async () => {
        try {
            const response = await axios.get('/api/categories')
            set({ categories: response.data })
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    },
    addCategory: async (name) => {
        try {
            const response = await axios.post('/api/categories', { name })
            set((state) => ({ categories: [...state.categories, response.data] }))
        } catch (error) {
            console.error('Error adding category:', error)
        }
    },
}))