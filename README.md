# File Container 🗂️

Web aplikasi untuk upload, download, dan mengelola file dengan sistem folder yang aman.

Tersedia dalam **2 versi**:
- 🖥️ **Server Version** - Node.js + Express (untuk hosting sendiri)
- 🌐 **GitHub Pages Version** - Pure HTML/CSS/JS dengan localStorage

## ✨ Fitur

- 📁 **Buat Folder Baru** dengan password keamanan
- 📤 **Upload File** ke folder yang dipilih (multiple files)
- 📥 **Download File** kapan saja
- 🗑️ **Hapus File/Folder** dengan autentikasi password
- 🔒 **Keamanan Folder** - hanya yang tahu password yang bisa menghapus
- 📱 **Responsive Design** - bekerja di desktop dan mobile
- 🎯 **Drag & Drop** support untuk upload file
- 💾 **JSON Storage** untuk metadata file
- 📤 **Export/Import Data** (GitHub Pages version)
- 🌐 **Deploy ke GitHub Pages** (static version)

## 🚀 Cara Menjalankan

### 🌐 GitHub Pages Version (Direkomendasikan)

**Live Demo**: [Demo GitHub Pages](https://yourusername.github.io/file-container/)

1. **Fork repository ini**
2. **Enable GitHub Pages**:
   - Buka Settings → Pages
   - Source: Deploy from a branch
   - Branch: main/master
   - Folder: /docs
   - Save
3. **Akses di**: `https://yourusername.github.io/file-container/`

### 🖥️ Server Version (Local Development)

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Jalankan Server
```bash
npm start
```

Atau untuk development mode:
```bash
npm run dev
```

#### 3. Buka Browser
Buka browser dan kunjungi: `http://localhost:3000`

## 📁 Struktur Folder

```
file-container/
├── index.html          # Server version frontend
├── server.js           # Backend server (Node.js)
├── package.json        # Dependencies
├── uploads/            # Folder untuk menyimpan file upload (server version)
├── data/               # Folder untuk menyimpan metadata JSON (server version)
│   ├── folders.json    # Data folder dan password
│   └── files.json      # Metadata file yang diupload
├── docs/               # GitHub Pages version
│   ├── index.html      # GitHub Pages main file
│   └── README.md       # GitHub Pages documentation
├── .nojekyll          # GitHub Pages config
└── README.md          # Dokumentasi utama
```

## 🌐 GitHub Pages vs Server Version

| Fitur | GitHub Pages | Server Version |
|-------|-------------|----------------|
| **Hosting** | ✅ Free (GitHub) | ❌ Perlu server sendiri |
| **Setup** | ✅ Mudah | ⚠️ Perlu install Node.js |
| **Storage** | ⚠️ Browser only (~5-10MB) | ✅ Server disk |
| **File Size** | ⚠️ Max ~2MB per file | ✅ Max 100MB per file |
| **Persistence** | ⚠️ Per browser | ✅ Permanent |
| **Multi-User** | ❌ Local only | ✅ Multiple users |
| **Backup** | ✅ Export/Import | ✅ Server backup |
| **Performance** | ✅ Fast (client-side) | ⚠️ Depends on server |

## 🎯 Cara Penggunaan

### 1. Membuat Folder Baru
- Masukkan nama folder
- Buat password keamanan yang kuat
- Klik "📁 Buat Folder"

### 2. Upload File
- Pilih folder tujuan dari dropdown
- Klik area upload atau drag & drop file
- Pilih file yang ingin diupload (bisa multiple)
- Klik "📤 Upload File"

### 3. Download File
- Browse ke folder yang diinginkan
- Klik tombol "📥 Download" pada file yang diinginkan

### 4. Menghapus File/Folder
- Klik tombol "🗑️ Hapus" pada file atau folder
- Masukkan password keamanan folder
- Konfirmasi penghapusan

## 🔐 Sistem Keamanan

- **Upload**: Bebas untuk siapa saja, tapi harus memilih folder yang sudah ada
- **Download**: Bebas untuk siapa saja
- **Delete**: Hanya dengan password yang benar dari pembuat folder
- **Password**: Di-hash menggunakan bcrypt untuk keamanan
- **Folder Protection**: Tidak bisa upload file di luar folder yang sudah dibuat

## ⚙️ Konfigurasi

### Environment Variables
- `PORT`: Port server (default: 3000)

### Limits
- **File Size**: Maksimal 100MB per file
- **Multiple Upload**: Tidak ada limit jumlah file

### Storage
- **File Storage**: Disimpan di folder `uploads/`
- **Metadata**: Disimpan dalam file JSON di folder `data/`

## 🛠️ Dependencies

- **express**: Web framework
- **multer**: File upload handling
- **bcrypt**: Password hashing
- **fs-extra**: Enhanced file system operations
- **path**: File path utilities

## 📝 API Endpoints

- `GET /` - Halaman utama
- `GET /api/folders` - Daftar folder
- `POST /api/folder` - Buat folder baru
- `POST /api/upload` - Upload file
- `GET /api/files` - Daftar file dan folder
- `GET /api/download` - Download file
- `DELETE /api/delete` - Hapus file/folder

## �️ Deployment

### 🌐 Deploy ke GitHub Pages

1. **Fork/Clone repository**
2. **Push ke GitHub repository Anda**
3. **Enable GitHub Pages**:
   ```
   Settings → Pages → Source: Deploy from a branch
   Branch: main/master → Folder: /docs → Save
   ```
4. **Akses aplikasi** di: `https://username.github.io/repository-name/`

### 🖥️ Deploy Server Version

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login dan deploy
heroku login
heroku create your-app-name
git push heroku main
```

#### VPS/Server
```bash
# Clone repository
git clone your-repo-url
cd file-container

# Install dependencies
npm install

# Start dengan PM2
npm install -g pm2
pm2 start server.js --name "file-container"
```

## �🔧 Development

Untuk development, gunakan:
```bash
npm run dev
```

Ini akan menggunakan nodemon untuk auto-restart server saat file berubah.

## 📱 Responsive Design

Interface sudah dioptimasi untuk:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🎨 Features Highlights

- **Modern UI**: Gradient design dengan animasi smooth
- **Drag & Drop**: Upload file dengan drag and drop
- **Real-time Feedback**: Alert untuk setiap aksi
- **File Type Support**: Mendukung semua jenis file
- **Secure Folders**: Password protection untuk setiap folder
- **Breadcrumb Navigation**: Navigasi yang mudah
- **File Information**: Menampilkan ukuran file dan tanggal upload

## 🚨 Keamanan & Limitasi

- File disimpan secara fisik di server
- Password folder di-hash dengan bcrypt
- Tidak ada akses langsung ke file melalui URL
- Validasi nama folder dan file
- Rate limiting bisa ditambahkan jika diperlukan

## 📄 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

---

**Happy File Managing! 🎉**
