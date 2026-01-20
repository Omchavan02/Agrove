const cropsData = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497012/49417_Wheat_harvest_372_m6pawk.jpg",
    title: "Wheat",
    description: "Major rabi crop grown in winter season",
    type: "Rabi",
    category: "Food Crops",
    path: "/wheat-advisory"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767496708/Rice-Parts_gzzjjl.jpg",
    title: "Rice",
    description: "Staple food crop grown in monsoon",
    type: "Kharif",
    category: "Food Crops",
    path: "/rice-advisory"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497245/download_izigtv.jpg",
    title: "Maize",
    description: "Used for food and fodder",
    type: "Kharif",
    category: "Food Crops",
    path: "/maize-advisory"
  },
  {
    id: 4,
    image: "/images/barley.jpg",
    title: "Barley",
    description: "Hardy cereal crop",
    type: "Rabi",
    category: "Food Crops",
    path: "/barley-advisory"
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497579/download_1_qmmvvb.jpg",
    title: "Cotton",
    description: "Major fiber crop of India",
    type: "Kharif",
    category: "Fibre Crops",
    path: "/cotton-advisory"
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_2_xsac7g.jpg",
    title: "Sugarcane",
    description: "Cash crop used for sugar production",
    type: "Zaid",
    category: "Cash Crops",
    path: "/sugarcane-advisory"
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497595/images_2_yeyoa0.jpg",
    title: "Soybean",
    description: "Important oilseed crop",
    type: "Kharif",
    category: "Cash Crops",
    path: "/soybean-advisory"
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_3_uyctz8.jpg",
    title: "Gram",
    description: "Protein-rich pulse crop",
    type: "Rabi",
    category: "Food Crops",
    path: "/gram-advisory"
  },
  {
    id: 9,
    image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_4_wgkb7r.jpg",
    title: "Mustard",
    description: "Oilseed crop grown in winter",
    type: "Rabi",
    category: "Cash Crops",
    path: "/mustard-advisory"
  },
  {
    id: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pearl_millet_head.jpg/1200px-Pearl_millet_head.jpg",
    title: "Bajra",
    description: "Drought resistant pearl millet",
    type: "Kharif",
    category: "Food Crops",
    path: "/bajra-advisory"
  },
  {
    id: 11,
    image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418359/download_uylgz4.jpg",
    title: "Groundnut",
    description: "Oilseed crop, rich in protein",
    type: "Kharif",
    category: "Cash Crops",
    path: "/groundnut-advisory"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200",
    title: "Coffee",
    description: "Important plantation crop",
    type: "Plantation",
    category: "Plantation Crops",
    path: "/coffee-advisory"
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1576082869504-20d0f4d38072?auto=format&fit=crop&q=80&w=1200",
    title: "Tea",
    description: "Famous plantation crop",
    type: "Plantation",
    category: "Plantation Crops",
    path: "/tea-advisory"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1596726883204-633857c66cb5?auto=format&fit=crop&q=80&w=1200",
    title: "Rubber",
    description: "Major industrial crop",
    type: "Plantation",
    category: "Plantation Crops",
    path: "/rubber-advisory"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1544253327-0cfd687b1c4b?q=80&w=1200",
    title: "Coconut",
    description: "Multi-purpose palm crop",
    type: "Plantation",
    category: "Plantation Crops",
    path: "/coconut-advisory"
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1629814596133-724bc247c7c1?q=80&w=1200",
    title: "Arecanut",
    description: "Commercial plantation crop",
    type: "Plantation",
    category: "Plantation Crops",
    path: "/arecanut-advisory"
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1518977676605-dc562fdea738?q=80&w=1200",
    title: "Potato",
    description: "Major horticultural tuber crop",
    type: "Horticulture",
    category: "Horticultural Crops",
    path: "/potato-advisory"
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1200",
    title: "Tomato",
    description: "Wideley cultivated vegetable",
    type: "Horticulture",
    category: "Horticultural Crops",
    path: "/tomato-advisory"
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa829?q=80&w=1200",
    title: "Onion",
    description: "Important bulb vegetable",
    type: "Horticulture",
    category: "Horticultural Crops",
    path: "/onion-advisory"
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1200",
    title: "Banana",
    description: "Globally important fruit crop",
    type: "Horticulture",
    category: "Horticultural Crops",
    path: "/banana-advisory"
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200",
    title: "Mango",
    description: "The King of Fruits",
    type: "Horticulture",
    category: "Horticultural Crops",
    path: "/mango-advisory"
  }
];



export default cropsData;