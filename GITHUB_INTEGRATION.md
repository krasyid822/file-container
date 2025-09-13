# GitHub Integration untuk File Container

## 🌟 Fitur Baru

Aplikasi File Container sekarang telah diintegrasikan dengan GitHub API untuk memberikan penyimpanan file yang **REAL** dan **PERSISTENT** di repository GitHub, bukan hanya local storage.

## 🔧 Cara Setup

### 1. Buat GitHub Personal Access Token
1. Buka [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Klik "Generate new token (classic)"
3. Beri nama: `File Container Storage`
4. Pilih scope: **repo** (Full control of private repositories)
5. Klik "Generate token"
6. **PENTING**: Copy token dan simpan, karena tidak bisa dilihat lagi!

### 2. Konfigurasi di Aplikasi
1. Buka aplikasi File Container
2. Klik tombol "⚙️ GitHub Config" di header
3. Masukkan GitHub Personal Access Token
4. Klik "Test Connection" untuk memverifikasi
5. Pilih storage mode:
   - **GitHub**: Hanya repository storage
   - **Hybrid**: Repository + local fallback
   - **IndexedDB**: Hanya local storage

## 🚀 Mode Penyimpanan

### 1. GitHub Mode (Rekomendasi)
- ✅ File disimpan di repository GitHub
- ✅ Akses dari device manapun
- ✅ Backup otomatis
- ✅ Version control
- ❌ Butuh internet connection

### 2. Hybrid Mode  
- ✅ Primary: GitHub repository
- ✅ Fallback: Local IndexedDB
- ✅ Offline capability
- ✅ Auto sync when online

### 3. IndexedDB Mode
- ✅ Local browser storage
- ✅ Offline access
- ❌ Tidak persistent antar device
- ❌ Bisa hilang saat clear browser data

## 📁 Struktur Repository

File disimpan dalam struktur berikut di repository `krasyid822/file-container`:

```
docs/
└── storage/
    ├── files/           # Metadata file (.json)
    │   ├── file1.json
    │   └── file2.json
    └── chunks/          # File chunks (.txt) 
        ├── file1_chunk_0.txt
        ├── file1_chunk_1.txt
        └── file2_chunk_0.txt
```

## 🔥 Fitur Chunking

- File besar (>20MB) otomatis dipecah menjadi chunks
- Setiap chunk maksimal 20MB
- Metadata disimpan terpisah dari content
- Reconstruction otomatis saat download

## 🛠️ Technical Implementation

### GitHub API Functions
- `githubApiRequest()` - Base API caller
- `saveFileToGitHub()` - Upload file ke repository  
- `getFileFromGitHub()` - Download file dari repository
- `deleteFileFromGitHub()` - Hapus file dari repository
- `getGitHubFileList()` - List semua file metadata

### Hybrid Storage Functions  
- `saveFileWithGitHubChunking()` - Save dengan GitHub + local fallback
- `getFileFromGitHubChunks()` - Retrieve dengan fallback mechanism

## 💾 Data Persistence

Dengan GitHub integration:
1. **File TIDAK akan hilang** saat:
   - Clear browser data
   - Ganti device
   - Reinstall browser
   - Reset OS

2. **File bisa diakses** dari:
   - Device manapun dengan internet
   - Browser manapun  
   - Bahkan langsung dari GitHub repository

## 🔐 Security

- Personal Access Token disimpan di localStorage
- Token hanya punya akses ke repository yang dipilih
- File di-encode base64 sebelum disimpan
- Commit message menunjukkan operasi yang dilakukan

## 🎯 Keunggulan vs Local Storage

| Fitur | Local Storage | GitHub Storage |
|-------|---------------|----------------|
| Persistence | ❌ Bisa hilang | ✅ Permanent |
| Multi-device | ❌ Per browser | ✅ Universal |
| Backup | ❌ Manual | ✅ Otomatis |
| Version Control | ❌ Tidak ada | ✅ Git history |
| Offline Access | ✅ Ya | ⚠️ Perlu sync |
| Storage Limit | ⚠️ ~50MB | ✅ 1GB+ |

## 🚀 Getting Started

1. Deploy aplikasi ke GitHub Pages
2. Setup Personal Access Token
3. Pilih GitHub atau Hybrid mode
4. Upload file pertama
5. File otomatis tersimpan di repository!

## 📝 Notes

- Untuk GitHub Pages, gunakan repository `username.github.io` atau aktifkan Pages di repository project
- Token disimpan di browser localStorage - aman selama device tidak dibagi
- File besar otomatis ter-chunk untuk efisiensi
- Hybrid mode memberikan best of both worlds

Sekarang aplikasi Anda memiliki **REAL STORAGE** yang persistent dan dapat diakses dari mana saja! 🎉