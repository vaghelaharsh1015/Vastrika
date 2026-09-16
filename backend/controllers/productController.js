import Product from '../models/Product.js';

// @desc    Fetch all products with filtering, search & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 50;
    const page = Number(req.query.page) || 1;

    const query = {};

    // 1. Keyword search (Name, Description, Tags, Fabric)
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
        { tags: { $regex: req.query.keyword, $options: 'i' } },
        { fabric: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // 2. Category filter
    if (req.query.category && req.query.category.toLowerCase() !== 'all') {
      const catRegex = new RegExp(`^${req.query.category.trim()}$`, 'i');
      query.$or = [
        { category: catRegex },
        { subCategory: catRegex },
      ];
    }

    // 3. Price filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // 4. Badges / Flags (featured, new, trending, bestseller)
    if (req.query.isFeatured === 'true') query.isFeatured = true;
    if (req.query.isNewArrival === 'true') query.isNewArrival = true;
    if (req.query.isBestSeller === 'true') query.isBestSeller = true;
    if (req.query.isTrending === 'true') query.isTrending = true;

    // 5. In stock filter
    if (req.query.inStock === 'true') query.inStock = true;

    // 6. Sorting
    let sortOption = { createdAt: -1 };
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case 'price-asc':
        case 'low-to-high':
          sortOption = { price: 1 };
          break;
        case 'price-desc':
        case 'high-to-low':
          sortOption = { price: -1 };
          break;
        case 'rating':
        case 'highest-rated':
          sortOption = { rating: -1 };
          break;
        case 'discount':
        case 'highest-discount':
          sortOption = { discount: -1 };
          break;
        case 'bestseller':
          sortOption = { isBestSeller: -1, rating: -1 };
          break;
        case 'newest':
        default:
          sortOption = { createdAt: -1 };
          break;
      }
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching products',
    });
  }
};

// @desc    Fetch single product by ID or customId
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    // Check if valid ObjectId or query customId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ customId: id });
    }

    if (product) {
      res.json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get product categories summary
// @route   GET /api/products/categories/summary
// @access  Public
export const getCategoriesSummary = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          image: { $first: '$image' },
        },
      },
      {
        $project: {
          name: '$_id',
          count: 1,
          minPrice: 1,
          image: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Invalid product payload',
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ customId: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found to update',
      });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ customId: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found to delete',
      });
    }

    await Product.deleteOne({ _id: product._id });
    res.json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new review for a product
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, name } = req.body;
    const { id } = req.params;

    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ customId: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const review = {
      name: name || (req.user ? req.user.name : 'Vastrika Patron'),
      rating: Number(rating) || 5,
      comment,
      user: req.user ? req.user._id : undefined,
    };

    product.reviews.push(review);
    product.reviewCount = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
