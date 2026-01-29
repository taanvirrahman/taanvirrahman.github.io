const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, '../assets/photography');
const JSON_FILE = path.join(PHOTO_DIR, 'images.json');

// Supported extensions
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function syncPhotos() {
    console.log('🔍 Scanning photography folder...');

    // 1. Read existing JSON
    let existingPhotos = [];
    if (fs.existsSync(JSON_FILE)) {
        try {
            existingPhotos = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
        } catch (e) {
            console.warn('⚠️ Could not parse existing images.json, starting fresh.');
        }
    }

    // 2. Read folder
    const files = fs.readdirSync(PHOTO_DIR);
    const imageFiles = files.filter(f => EXTENSIONS.includes(path.extname(f).toLowerCase()));

    // 3. Merge data
    const newPhotos = imageFiles.map(filename => {
        const existing = existingPhotos.find(p => p.src.includes(filename));

        if (existing) return existing;

        // Create new entry
        return {
            id: filename.split('.')[0] + '-' + Date.now(),
            title: filename.split('.')[0].replace(/[_-]/g, ' '),
            category: "street", // default
            location: "📍 Unknown Location",
            src: `assets/photography/${filename}`,
            alt: `Photography - ${filename}`,
            size: "standard"
        };
    });

    // 4. Save results
    fs.writeFileSync(JSON_FILE, JSON.stringify(newPhotos, null, 2));
    console.log(`✅ Synced ${newPhotos.length} images to ${JSON_FILE}`);
    console.log('💡 Tip: You can now edit the categories and locations in images.json');
}

syncPhotos();
