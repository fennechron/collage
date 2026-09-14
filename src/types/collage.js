// Layout Templates, Aesthetic Stock, Stickers, and Presets for InstaCollage Studio

export const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 Square', sub: 'IG Feed Post', width: 1080, height: 1080, icon: 'Square' },
  { id: '4:5', label: '4:5 Portrait', sub: 'IG Feed Portrait', width: 1080, height: 1350, icon: 'RectangleVertical' },
  { id: '9:16', label: '9:16 Story', sub: 'IG Story & Reels', width: 1080, height: 1920, icon: 'Smartphone' },
  { id: '16:9', label: '16:9 Landscape', sub: 'Banner / Landscape', width: 1920, height: 1080, icon: 'RectangleHorizontal' }
];

// Curated aesthetic Unsplash images with direct CDN URLs
export const CURATED_PHOTOS = [
  {
    id: 'p1',
    category: 'Aesthetic & Travel',
    title: 'Amalfi Coast Sunset',
    thumb: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p2',
    category: 'Aesthetic & Travel',
    title: 'Parisian Balcony',
    thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p3',
    category: 'Aesthetic & Travel',
    title: 'Santorini Blue Dome',
    thumb: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p4',
    category: 'Editorial & Fashion',
    title: 'Vintage Leather Jacket',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p5',
    category: 'Editorial & Fashion',
    title: 'Minimalist Portrait',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p6',
    category: 'Editorial & Fashion',
    title: 'Golden Hour Sunglasses',
    thumb: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p7',
    category: 'Coffee & Cafe Vibes',
    title: 'Artisan Latte & Croissant',
    thumb: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p8',
    category: 'Coffee & Cafe Vibes',
    title: 'Morning Books & Espresso',
    thumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p9',
    category: 'Cyberpunk & Night',
    title: 'Tokyo Neon Rain',
    thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p10',
    category: 'Cyberpunk & Night',
    title: 'Neon Signs Alley',
    thumb: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p11',
    category: 'Film & Retro',
    title: 'Vintage Red Sports Car',
    thumb: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p12',
    category: 'Film & Retro',
    title: '35mm Film Camera',
    thumb: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=85'
  }
];

// Grid layout templates categorized by number of cells
export const GRID_TEMPLATES = [
  // 2 Photos
  {
    id: 'grid-2-vert',
    name: '2-Split Vertical',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 50, h: 100 },
      { x: 50, y: 0, w: 50, h: 100 }
    ]
  },
  {
    id: 'grid-2-horiz',
    name: '2-Split Horizontal',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 100, h: 50 },
      { x: 0, y: 50, w: 100, h: 50 }
    ]
  },
  {
    id: 'grid-2-skewed',
    name: 'Hero & Sidekick (65/35)',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 65, h: 100 },
      { x: 65, y: 0, w: 35, h: 100 }
    ]
  },

  // 3 Photos
  {
    id: 'grid-3-triptych',
    name: 'Triptych (3 Columns)',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 33.333, h: 100 },
      { x: 33.333, y: 0, w: 33.333, h: 100 },
      { x: 66.666, y: 0, w: 33.334, h: 100 }
    ]
  },
  {
    id: 'grid-3-hero-left',
    name: 'Hero Left + 2 Right',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 55, h: 100 },
      { x: 55, y: 0, w: 45, h: 50 },
      { x: 55, y: 50, w: 45, h: 50 }
    ]
  },
  {
    id: 'grid-3-hero-top',
    name: 'Hero Top + 2 Bottom',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 100, h: 58 },
      { x: 0, y: 58, w: 50, h: 42 },
      { x: 50, y: 58, w: 50, h: 42 }
    ]
  },
  {
    id: 'grid-3-photobooth',
    name: 'Photobooth Strip 3x',
    photosCount: 3,
    category: 'Photobooth',
    cells: [
      { x: 0, y: 0, w: 100, h: 33.333 },
      { x: 0, y: 33.333, w: 100, h: 33.333 },
      { x: 0, y: 66.666, w: 100, h: 33.334 }
    ]
  },

  // 4 Photos
  {
    id: 'grid-4-classic',
    name: 'Classic 2x2 Grid',
    photosCount: 4,
    category: '4 Photos',
    cells: [
      { x: 0, y: 0, w: 50, h: 50 },
      { x: 50, y: 0, w: 50, h: 50 },
      { x: 0, y: 50, w: 50, h: 50 },
      { x: 50, y: 50, w: 50, h: 50 }
    ]
  },
  {
    id: 'grid-4-editorial',
    name: 'Editorial 1 Large + 3 Small',
    photosCount: 4,
    category: '4 Photos',
    cells: [
      { x: 0, y: 0, w: 62, h: 100 },
      { x: 62, y: 0, w: 38, h: 33.333 },
      { x: 62, y: 33.333, w: 38, h: 33.333 },
      { x: 62, y: 66.666, w: 38, h: 33.334 }
    ]
  },
  {
    id: 'grid-4-photobooth-strip',
    name: 'Retro Photobooth 4-Shot',
    photosCount: 4,
    category: 'Photobooth',
    cells: [
      { x: 0, y: 0, w: 100, h: 25 },
      { x: 0, y: 25, w: 100, h: 25 },
      { x: 0, y: 50, w: 100, h: 25 },
      { x: 0, y: 75, w: 100, h: 25 }
    ]
  },
  {
    id: 'grid-4-asymm',
    name: 'Mosaic Alternating',
    photosCount: 4,
    category: '4 Photos',
    cells: [
      { x: 0, y: 0, w: 40, h: 55 },
      { x: 40, y: 0, w: 60, h: 45 },
      { x: 0, y: 55, w: 60, h: 45 },
      { x: 60, y: 45, w: 40, h: 55 }
    ]
  },

  // 5 Photos
  {
    id: 'grid-5-magazine',
    name: 'Magazine Cover Spread',
    photosCount: 5,
    category: '5+ Photos',
    cells: [
      { x: 0, y: 0, w: 50, h: 65 },
      { x: 50, y: 0, w: 50, h: 35 },
      { x: 50, y: 35, w: 50, h: 30 },
      { x: 0, y: 65, w: 50, h: 35 },
      { x: 50, y: 65, w: 50, h: 35 }
    ]
  },
  {
    id: 'grid-5-centerpiece',
    name: 'Center Hero + 4 Corners',
    photosCount: 5,
    category: '5+ Photos',
    cells: [
      { x: 0, y: 0, w: 32, h: 50 },
      { x: 68, y: 0, w: 32, h: 50 },
      { x: 32, y: 15, w: 36, h: 70 },
      { x: 0, y: 50, w: 32, h: 50 },
      { x: 68, y: 50, w: 32, h: 50 }
    ]
  },

  // 6 Photos
  {
    id: 'grid-6-moodboard',
    name: 'Aesthetic Moodboard 6x',
    photosCount: 6,
    category: '5+ Photos',
    cells: [
      { x: 0, y: 0, w: 33.333, h: 50 },
      { x: 33.333, y: 0, w: 33.333, h: 50 },
      { x: 66.666, y: 0, w: 33.334, h: 50 },
      { x: 0, y: 50, w: 33.333, h: 50 },
      { x: 33.333, y: 50, w: 33.333, h: 50 },
      { x: 66.666, y: 50, w: 33.334, h: 50 }
    ]
  },
  {
    id: 'grid-6-feature-hero',
    name: '1 Hero Top + 5 Bottom Gallery',
    photosCount: 6,
    category: '5+ Photos',
    cells: [
      { x: 0, y: 0, w: 100, h: 55 },
      { x: 0, y: 55, w: 20, h: 45 },
      { x: 20, y: 55, w: 20, h: 45 },
      { x: 40, y: 55, w: 20, h: 45 },
      { x: 60, y: 55, w: 20, h: 45 },
      { x: 80, y: 55, w: 20, h: 45 }
    ]
  },

  // 9 Photos
  {
    id: 'grid-9-feed',
    name: 'Instagram Profile 9-Grid (3x3)',
    photosCount: 9,
    category: '5+ Photos',
    cells: [
      { x: 0, y: 0, w: 33.333, h: 33.333 },
      { x: 33.333, y: 0, w: 33.333, h: 33.333 },
      { x: 66.666, y: 0, w: 33.334, h: 33.333 },
      { x: 0, y: 33.333, w: 33.333, h: 33.333 },
      { x: 33.333, y: 33.333, w: 33.333, h: 33.333 },
      { x: 66.666, y: 33.333, w: 33.334, h: 33.333 },
      { x: 0, y: 66.666, w: 33.333, h: 33.334 },
      { x: 33.333, y: 66.666, w: 33.333, h: 33.334 },
      { x: 66.666, y: 66.666, w: 33.334, h: 33.334 }
    ]
  }
];

// Aesthetic Gradient Backgrounds
export const BACKGROUND_PRESETS = [
  {
    id: 'ig-signature',
    name: 'Instagram Signature',
    type: 'gradient',
    css: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    stops: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    type: 'gradient',
    css: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    stops: ['#ff7e5f', '#feb47b']
  },
  {
    id: 'tokyo-cyber',
    name: 'Cyberpunk Neon',
    type: 'gradient',
    css: 'linear-gradient(135deg, #050518 0%, #1f0535 50%, #fc00ff 100%)',
    stops: ['#050518', '#1f0535', '#fc00ff']
  },
  {
    id: 'cotton-candy',
    name: 'Pastel Sorbet',
    type: 'gradient',
    css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    stops: ['#ff9a9e', '#fecfef']
  },
  {
    id: 'midnight-luxury',
    name: 'Onyx Velvet',
    type: 'gradient',
    css: 'linear-gradient(135deg, #0b0c10 0%, #1f2833 100%)',
    stops: ['#0b0c10', '#1f2833']
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    type: 'gradient',
    css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    stops: ['#f6d365', '#fda085']
  },
  {
    id: 'pure-white',
    name: 'Clean White',
    type: 'solid',
    css: '#ffffff',
    stops: ['#ffffff']
  },
  {
    id: 'dark-obsidian',
    name: 'Dark Studio',
    type: 'solid',
    css: '#121417',
    stops: ['#121417']
  },
  {
    id: 'soft-sand',
    name: 'Warm Paper',
    type: 'solid',
    css: '#f5efe6',
    stops: ['#f5efe6']
  },
  {
    id: 'ambient-blur',
    name: 'Ambient Photo Blur',
    type: 'blur',
    css: 'blur-bg',
    stops: []
  }
];

// Visual Filters applied to photos
export const FILTER_PRESETS = [
  { id: 'normal', name: 'Original', css: 'none', filter: {} },
  { id: 'vintage-film', name: '35mm Film', css: 'sepia(0.28) contrast(1.15) brightness(1.05) saturate(1.15)', filter: { sepia: 28, contrast: 115, brightness: 105, saturate: 115 } },
  { id: 'golden-glow', name: 'Golden Glow', css: 'sepia(0.35) saturate(1.4) brightness(1.08) hue-rotate(-10deg)', filter: { sepia: 35, saturate: 140, brightness: 108, hueRotate: -10 } },
  { id: 'tokyo-neon', name: 'Tokyo Neon', css: 'contrast(1.25) saturate(1.5) hue-rotate(15deg) brightness(1.02)', filter: { contrast: 125, saturate: 150, hueRotate: 15, brightness: 102 } },
  { id: 'noir-bw', name: 'Noir B&W', css: 'grayscale(1) contrast(1.3) brightness(0.95)', filter: { grayscale: 100, contrast: 130, brightness: 95 } },
  { id: 'pastel-dream', name: 'Pastel Dream', css: 'brightness(1.12) contrast(0.92) saturate(1.25) hue-rotate(-5deg)', filter: { brightness: 112, contrast: 92, saturate: 125, hueRotate: -5 } },
  { id: 'vivid-pop', name: 'Vivid Pop', css: 'contrast(1.18) saturate(1.6) brightness(1.04)', filter: { contrast: 118, saturate: 160, brightness: 104 } },
  { id: 'retro-fade', name: 'Faded Memories', css: 'contrast(0.9) brightness(1.06) sepia(0.18) saturate(0.85)', filter: { contrast: 90, brightness: 106, sepia: 18, saturate: 85 } }
];

// Stickers & Decorative Overlays
export const STICKER_PRESETS = [
  {
    id: 'st-verified',
    type: 'badge',
    title: 'Instagram Verified Badge',
    badgeType: 'verified'
  },
  {
    id: 'st-music',
    type: 'music',
    title: 'Now Playing Track',
    trackName: 'Golden Hour',
    artist: 'JVKE',
    duration: '2:45'
  },
  {
    id: 'st-location-paris',
    type: 'location',
    title: 'Location Tag',
    text: '📍 Paris, France'
  },
  {
    id: 'st-location-tokyo',
    type: 'location',
    title: 'Location Tag',
    text: '📍 Tokyo, Japan'
  },
  {
    id: 'st-date-vintage',
    type: 'timestamp',
    title: 'Vintage Film Date Stamp',
    text: '’98 08 24'
  },
  {
    id: 'st-rec-vhs',
    type: 'rec',
    title: 'VHS REC Stamp',
    text: '● REC 00:14:28'
  },
  {
    id: 'st-tape',
    type: 'washi_tape',
    title: 'Washi Tape Corner',
    color: '#ffeaa7'
  },
  {
    id: 'st-barcode',
    type: 'barcode',
    title: 'Aesthetic Barcode',
    code: 'INSTA-90210-COL'
  },
  {
    id: 'st-heart',
    type: 'emoji',
    title: 'Sparkling Heart',
    emoji: '💖'
  },
  {
    id: 'st-sparkle',
    type: 'emoji',
    title: 'Sparkles',
    emoji: '✨'
  },
  {
    id: 'st-flame',
    type: 'emoji',
    title: 'Fire',
    emoji: '🔥'
  },
  {
    id: 'st-film-frame',
    type: 'film_sprocket',
    title: 'Kodak Film Sprocket Label',
    text: 'KODAK PORTRA 400 • 35MM'
  }
];

// Curated Google Fonts
export const FONT_PRESETS = [
  { id: 'Plus Jakarta Sans', name: 'Modern Sans', style: 'sans-serif' },
  { id: 'Playfair Display', name: 'Editorial Serif', style: 'serif' },
  { id: 'Caveat', name: 'Handwritten Script', style: 'cursive' },
  { id: 'Space Grotesk', name: 'Y2K Cyber Tech', style: 'monospace' },
  { id: 'Georgia', name: 'Classic Magazine', style: 'serif' },
  { id: 'Courier New', name: 'Typewriter Vintage', style: 'monospace' }
];

// Initial starter projects for instant inspiration
export const SAMPLE_PROJECTS = [
  {
    id: 'proj-summer-amalfi',
    name: 'Amalfi Coast Summer',
    mode: 'grid',
    templateId: 'grid-3-hero-left',
    aspectRatio: '4:5',
    background: 'golden-hour',
    gap: 8,
    padding: 12,
    radius: 16,
    filter: 'golden-glow',
    photos: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=85'
    ],
    texts: [
      { id: 't1', text: 'AMALFI MEMORIES', font: 'Playfair Display', size: 24, color: '#ffffff', bgPill: true, x: 50, y: 92, align: 'center' }
    ],
    stickers: [
      { id: 's1', type: 'location', text: '📍 Positano, Italy', x: 25, y: 10, rot: -3 },
      { id: 's2', type: 'emoji', emoji: '✨', x: 88, y: 8, rot: 12 }
    ]
  },
  {
    id: 'proj-y2k-film',
    name: 'Retro Film Scrapbook',
    mode: 'freeform',
    templateId: 'grid-4-classic',
    aspectRatio: '1:1',
    background: 'sunset-glow',
    gap: 12,
    padding: 16,
    radius: 8,
    filter: 'vintage-film',
    freeformItems: [
      {
        id: 'f1',
        type: 'polaroid',
        url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=85',
        caption: 'vintage 35mm',
        x: 18,
        y: 18,
        w: 48,
        h: 58,
        rot: -6,
        zIndex: 1
      },
      {
        id: 'f2',
        type: 'polaroid',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85',
        caption: 'golden hour glow',
        x: 46,
        y: 38,
        w: 48,
        h: 58,
        rot: 7,
        zIndex: 2
      },
      {
        id: 'f3',
        type: 'sticker',
        stickerType: 'timestamp',
        text: '’98 08 24',
        x: 75,
        y: 20,
        w: 22,
        rot: -4,
        zIndex: 3
      },
      {
        id: 'f4',
        type: 'sticker',
        stickerType: 'washi_tape',
        color: '#ffeaa7',
        x: 38,
        y: 12,
        w: 18,
        rot: -12,
        zIndex: 4
      }
    ],
    texts: [
      { id: 't1', text: 'SUNDAY DUMP', font: 'Space Grotesk', size: 28, color: '#ffffff', bgPill: true, x: 50, y: 92, align: 'center' }
    ]
  },
  {
    id: 'proj-tokyo-cyber',
    name: 'Tokyo Cyberpunk Grid',
    mode: 'grid',
    templateId: 'grid-4-classic',
    aspectRatio: '1:1',
    background: 'tokyo-cyber',
    gap: 10,
    padding: 14,
    radius: 12,
    filter: 'tokyo-neon',
    photos: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&auto=format&fit=crop&q=85'
    ],
    texts: [
      { id: 't1', text: 'TOKYO AFTER DARK', font: 'Space Grotesk', size: 22, color: '#00f2fe', bgPill: true, x: 50, y: 50, align: 'center' }
    ],
    stickers: [
      { id: 's1', type: 'rec', text: '● REC 00:23:49', x: 80, y: 8, rot: 0 }
    ]
  }
];
