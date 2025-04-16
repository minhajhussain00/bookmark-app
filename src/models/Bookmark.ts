import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
    title:{type:String,required:true},
    url:{type:String,required:true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    note:{type:String,required:true},
    tags:{type:[String],required:true},
},{timestamps:true})


export default mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema)