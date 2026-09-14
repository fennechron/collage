// Design System Presets, Templates, and Photographic Assets for CollageLab Studio

export const ASPECT_RATIOS = [
  { id: '4:5', label: '4:5 Portrait', sub: 'IG Feed Post', width: 1080, height: 1350, icon: 'RectangleVertical' },
  { id: '1:1', label: '1:1 Square', sub: 'IG Feed Square', width: 1080, height: 1080, icon: 'Square' },
  { id: '9:16', label: '9:16 Story', sub: 'IG Stories & Reels', width: 1080, height: 1920, icon: 'Smartphone' },
  { id: '16:9', label: '16:9 Landscape', sub: 'Banner / Landscape', width: 1920, height: 1080, icon: 'RectangleHorizontal' }
];

// Curated high-aesthetic royalty-free imagery
export const CURATED_PHOTOS = [
  {
    id: 'p1',
    category: 'Travel & Architecture',
    title: 'Amalfi Coast Villa',
    thumb: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p2',
    category: 'Travel & Architecture',
    title: 'Parisian Balcony View',
    thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p3',
    category: 'Travel & Architecture',
    title: 'Santorini Sunset Vista',
    thumb: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p4',
    category: 'Editorial & Portrait',
    title: 'Editorial Studio Portrait',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p5',
    category: 'Editorial & Portrait',
    title: 'Golden Hour Silhouette',
    thumb: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p6',
    category: 'Editorial & Portrait',
    title: 'Minimalist Fashion Editorial',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p7',
    category: 'Lifestyle & Coffee',
    title: 'Artisan Latte & Pastry',
    thumb: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p8',
    category: 'Lifestyle & Coffee',
    title: 'Morning Journals & Table',
    thumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p9',
    category: '35mm Film & Vintage',
    title: '35mm Analog Rangefinder',
    thumb: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p10',
    category: '35mm Film & Vintage',
    title: 'Classic Sports Car',
    thumb: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p11',
    category: 'Night & Cinematic',
    title: 'Tokyo Neon Atmosphere',
    thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=85'
  },
  {
    id: 'p12',
    category: 'Night & Cinematic',
    title: 'Shinjuku Alley Lights',
    thumb: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=80',
    full: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=85'
  }
];

// Layout templates with visual preview schema
export const GRID_TEMPLATES = [
  // 2-Photo Layouts
  {
    id: 'grid-2-vert',
    name: 'Dual Split Vertical',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 50, h: 100 },
      { x: 50, y: 0, w: 50, h: 100 }
    ]
  },
  {
    id: 'grid-2-horiz',
    name: 'Dual Split Horizontal',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 100, h: 50 },
      { x: 0, y: 50, w: 100, h: 50 }
    ]
  },
  {
    id: 'grid-2-skewed',
    name: 'Editorial Focus (65/35)',
    photosCount: 2,
    category: '2 Photos',
    cells: [
      { x: 0, y: 0, w: 64, h: 100 },
      { x: 64, y: 0, w: 36, h: 100 }
    ]
  },

  // 3-Photo Layouts
  {
    id: 'grid-3-hero-left',
    name: 'Hero Left + 2 Stacked',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 56, h: 100 },
      { x: 56, y: 0, w: 44, h: 50 },
      { x: 56, y: 50, w: 44, h: 50 }
    ]
  },
  {
    id: 'grid-3-triptych',
    name: 'Minimalist Triptych',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 33.333, h: 100 },
      { x: 33.333, y: 0, w: 33.333, h: 100 },
      { x: 66.666, y: 0, w: 33.334, h: 100 }
    ]
  },
  {
    id: 'grid-3-hero-top',
    name: 'Hero Header + 2 Below',
    photosCount: 3,
    category: '3 Photos',
    cells: [
      { x: 0, y: 0, w: 100, h: 60 },
      { x: 0, y: 60, w: 50, h: 40 },
      { x: 50, y: 60, w: 50, h: 40 }
    ]
  },

  // 4-Photo Layouts
  {
    id: 'grid-4-classic',
    name: 'Balanced 2×2 Grid',
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
    name: 'Magazine Hero + 3 Column',
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
    id: 'grid-4-asymm',
    name: 'Dynamic Mosaic',
    photosCount: 4,
    category: '4 Photos',
    cells: [
      { x: 0, y: 0, w: 42, h: 56 },
      { x: 42, y: 0, w: 58, h: 44 },
      { x: 0, y: 56, w: 58, h: 44 },
      { x: 58, y: 44, w: 42, h: 56 }
    ]
  },

  // Photobooth Film Strips
  {
    id: 'grid-3-photobooth',
    name: 'Photobooth Strip (3-Shot)',
    photosCount: 3,
    category: 'Filmstrip',
    cells: [
      { x: 0, y: 0, w: 100, h: 33.333 },
      { x: 0, y: 33.333, w: 100, h: 33.333 },
      { x: 0, y: 66.666, w: 100, h: 33.334 }
    ]
  },
  {
    id: 'grid-4-photobooth',
    name: 'Photobooth Strip (4-Shot)',
    photosCount: 4,
    category: 'Filmstrip',
    cells: [
      { x: 0, y: 0, w: 100, h: 25 },
      { x: 0, y: 25, w: 100, h: 25 },
      { x: 0, y: 50, w: 100, h: 25 },
      { x: 0, y: 75, w: 100, h: 25 }
    ]
  },

  // 5 & 6-Photo Moodboards
  {
    id: 'grid-5-magazine',
    name: 'Bento Spread (5 Photos)',
    photosCount: 5,
    category: 'Moodboard',
    cells: [
      { x: 0, y: 0, w: 50, h: 65 },
      { x: 50, y: 0, w: 50, h: 35 },
      { x: 50, y: 35, w: 50, h: 30 },
      { x: 0, y: 65, w: 50, h: 35 },
      { x: 50, y: 65, w: 50, h: 35 }
    ]
  },
  {
    id: 'grid-6-moodboard',
    name: 'Aesthetic Moodboard (6 Photos)',
    photosCount: 6,
    category: 'Moodboard',
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
    id: 'grid-9-feed',
    name: 'Profile 9-Grid (3×3)',
    photosCount: 9,
    category: 'Moodboard',
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

// Refined, high-end Studio Backgrounds
export const BACKGROUND_PRESETS = [
  {
    id: 'studio-charcoal',
    name: 'Studio Charcoal',
    type: 'solid',
    css: '#121418',
    stops: ['#121418']
  },
  {
    id: 'warm-sand',
    name: 'Editorial Cream',
    type: 'solid',
    css: '#f6f4ee',
    stops: ['#f6f4ee']
  },
  {
    id: 'pure-white',
    name: 'Gallery White',
    type: 'solid',
    css: '#ffffff',
    stops: ['#ffffff']
  },
  {
    id: 'obsidian-black',
    name: 'Pure Obsidian',
    type: 'solid',
    css: '#090a0d',
    stops: ['#090a0d']
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    type: 'gradient',
    css: 'linear-gradient(135deg, #f7d794 0%, #f3a683 100%)',
    stops: ['#f7d794', '#f3a683']
  },
  {
    id: 'sunset-glow',
    name: 'Warm Sunset',
    type: 'gradient',
    css: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    stops: ['#ff7e5f', '#feb47b']
  },
  {
    id: 'ig-signature',
    name: 'Instagram Sunset',
    type: 'gradient',
    css: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    stops: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']
  },
  {
    id: 'cinematic-twilight',
    name: 'Nordic Slate',
    type: 'gradient',
    css: 'linear-gradient(135deg, #1e272e 0%, #485460 100%)',
    stops: ['#1e272e', '#485460']
  }
];

// Professional Photographic Color Grades (inspired by real analog film stocks)
export const FILTER_PRESETS = [
  { id: 'normal', name: 'Standard (Clean)', css: 'none' },
  { id: 'portra-400', name: 'Portra 400', css: 'sepia(0.18) contrast(1.08) brightness(1.04) saturate(1.1)' },
  { id: 'kodak-gold', name: 'Kodak Gold', css: 'sepia(0.28) contrast(1.12) brightness(1.06) saturate(1.22)' },
  { id: 'cinestill', name: 'CineStill 800T', css: 'contrast(1.22) saturate(1.28) hue-rotate(8deg) brightness(1.02)' },
  { id: 'ilford-bw', name: 'Ilford HP5 (B&W)', css: 'grayscale(1) contrast(1.28) brightness(0.98)' },
  { id: 'minimal-editorial', name: 'Minimal Editorial', css: 'contrast(1.05) brightness(1.02) saturate(0.92)' },
  { id: 'soft-bloom', name: 'Soft Bloom', css: 'brightness(1.08) contrast(0.96) saturate(1.15)' },
  { id: 'nordic-fade', name: 'Nordic Fade', css: 'contrast(0.92) brightness(1.05) sepia(0.1) saturate(0.85)' }
];

// High-end minimalist badges, stamps, and overlays
export const STICKER_PRESETS = [
  {
    id: 'st-verified',
    type: 'badge',
    title: 'Verified Badge',
    badgeType: 'verified'
  },
  {
    id: 'st-music',
    type: 'music',
    title: 'Audio Tag (Golden Hour)',
    trackName: 'Golden Hour',
    artist: 'JVKE',
    duration: '2:45'
  },
  {
    id: 'st-location-amalfi',
    type: 'location',
    title: 'Location Tag (Amalfi Coast)',
    text: 'Amalfi Coast, Italy'
  },
  {
    id: 'st-location-paris',
    type: 'location',
    title: 'Location Tag (Paris)',
    text: 'Paris, France'
  },
  {
    id: 'st-location-tokyo',
    type: 'location',
    title: 'Location Tag (Tokyo)',
    text: 'Tokyo, Japan'
  },
  {
    id: 'st-date-vintage',
    type: 'timestamp',
    title: 'Film Date Stamp',
    text: "'98 08 24"
  },
  {
    id: 'st-rec-vhs',
    type: 'rec',
    title: 'Cinematic REC Stamp',
    text: 'REC 00:14:28'
  },
  {
    id: 'st-tape',
    type: 'washi_tape',
    title: 'Matte Washi Tape',
    color: 'rgba(255, 238, 186, 0.75)'
  },
  {
    id: 'st-barcode',
    type: 'barcode',
    title: 'Editorial Barcode',
    code: 'LAB-90210-ED'
  },
  {
    id: 'st-film-frame',
    type: 'film_sprocket',
    title: 'Kodak Film Indicator',
    text: 'PORTRA 400 • 35MM'
  }
];

export const FONT_PRESETS = [
  { id: 'Plus Jakarta Sans', name: 'Modern Sans', style: 'sans-serif' },
  { id: 'Playfair Display', name: 'Editorial Serif', style: 'serif' },
  { id: 'Caveat', name: 'Handwritten Script', style: 'cursive' },
  { id: 'Space Grotesk', name: 'Technical Mono', style: 'monospace' }
];

// Curated aesthetic projects
export const SAMPLE_PROJECTS = [
  {
    id: 'proj-amalfi',
    name: 'Amalfi Coast Editorial',
    mode: 'grid',
    templateId: 'grid-3-hero-left',
    aspectRatio: '4:5',
    background: 'warm-sand',
    gap: 10,
    padding: 14,
    radius: 12,
    filter: 'portra-400',
    photos: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=85'
    ],
    texts: [
      { id: 't1', text: 'POSITANO MEMORIES', font: 'Playfair Display', size: 22, color: '#1a1a1a', bgPill: false, x: 50, y: 94, align: 'center' }
    ],
    stickers: [
      { id: 's1', type: 'location', text: 'Amalfi Coast, Italy', x: 24, y: 8, rot: 0 }
    ]
  },
  {
    id: 'proj-polaroid-scrapbook',
    name: 'Analog Polaroid Scrapbook',
    mode: 'freeform',
    templateId: 'grid-4-classic',
    aspectRatio: '1:1',
    background: 'studio-charcoal',
    gap: 12,
    padding: 16,
    radius: 8,
    filter: 'kodak-gold',
    freeformItems: [
      {
        id: 'f1',
        type: 'polaroid',
        url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=85',
        caption: 'analog 35mm capture',
        x: 14,
        y: 14,
        w: 50,
        h: 60,
        rot: -5,
        zIndex: 1
      },
      {
        id: 'f2',
        type: 'polaroid',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85',
        caption: 'studio golden glow',
        x: 42,
        y: 32,
        w: 50,
        h: 60,
        rot: 6,
        zIndex: 2
      },
      {
        id: 'f3',
        type: 'sticker',
        stickerType: 'timestamp',
        text: "'98 08 24",
        x: 74,
        y: 18,
        w: 20,
        rot: -3,
        zIndex: 3
      },
      {
        id: 'f4',
        type: 'sticker',
        stickerType: 'washi_tape',
        color: 'rgba(255, 238, 186, 0.8)',
        x: 34,
        y: 10,
        w: 22,
        rot: -10,
        zIndex: 4
      }
    ],
    texts: [
      { id: 't1', text: 'SUNDAY PHOTO DUMP', font: 'Space Grotesk', size: 20, color: '#ffffff', bgPill: true, pillColor: 'rgba(18, 20, 24, 0.85)', x: 50, y: 92, align: 'center' }
    ],
    stickers: []
  },
  {
    id: 'proj-photobooth',
    name: 'Retro Photobooth Strip',
    mode: 'grid',
    templateId: 'grid-3-photobooth',
    aspectRatio: '9:16',
    background: 'pure-white',
    gap: 8,
    padding: 24,
    radius: 4,
    filter: 'ilford-bw',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&auto=format&fit=crop&q=85'
    ],
    texts: [
      { id: 't1', text: 'PHOTOBOOTH • STUDIO 14', font: 'Space Grotesk', size: 14, color: '#111111', bgPill: false, x: 50, y: 96, align: 'center' }
    ],
    stickers: []
  }
];
