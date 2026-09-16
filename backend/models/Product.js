import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Main product image URL is required'],
    },
    gallery: [{ type: String }],
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    fabric: {
      type: String,
      default: 'Pure Silk / Cotton Blend',
    },
    craft: {
      type: String,
      default: 'Handcrafted Handloom & Zari Embroidery',
    },
    occasion: {
      type: String,
      default: 'Festive & Celebration',
    },
    care: {
      type: String,
      default: 'Dry Clean Only',
    },
    dispatchTime: {
      type: String,
      default: 'Dispatches in 24-48 Hours',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 50,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    colors: [
      {
        name: { type: String, default: 'Default' },
        hex: { type: String, default: '#800020' },
      },
    ],
    tags: [{ type: String }],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for ID compatibility if frontend expects `id`
productSchema.virtual('id').get(function () {
  return this.customId || this._id.toHexString();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
