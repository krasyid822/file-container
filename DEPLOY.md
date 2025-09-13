# 🚀 Panduan Deploy File Container ke GitHub Pages

## 📋 Prerequisites

- Akun GitHub
- Repository GitHub (public/private## 📊 JSON File Storage Technology

### 🔧 Revolutionary Storage System

File Container v3.0 menggunakan **JSON File Storage System**:

- **Repository-based**: Data tersimpan sebagai file JSON di GitHub repository
- **Auto-splitting**: File JSON otomatis dipecah ketika mencapai 20MB  
- **Unlimited Capacity**: Tidak terbatas oleh browser storage limits
- **Cross-device Sync**: Data tersedia di semua perangkat
- **Version Control**: Semua perubahan ter-track oleh Git
- **Global CDN**: Fast access melalui GitHub Pages worldwide

### 💾 Storage Architecture

```
docs/data/
├── index.json           # Master index of all data files
├── files-001.json       # First data file (≤20MB)
├── files-002.json       # Second data file (auto-created)
├── files-003.json       # Third data file (auto-created)
└── files-XXX.json       # Additional files as needed
```

### 🎯 Major Advantages

- ✅ **Unlimited Storage** - No browser storage limits (was ~25MB)
- ✅ **Auto-Scaling** - Creates new JSON files automatically  
- ✅ **Global Access** - Available worldwide via GitHub CDN
- ✅ **Version History** - Git tracks all data changes
- ✅ **Collaborative** - Multiple users can access same data
- ✅ **Free Forever** - GitHub Pages hosting is completely free
- ✅ **Cross-Platform** - Works on any device with browser

### ⚠️ Demo Mode Notice

**Important**: Karena GitHub Pages adalah read-only, write operations saat ini dalam demo mode:

- ✅ **Read Operations** - Load semua data dari JSON files
- ✅ **UI Updates** - Perubahan tampil real-time di browser
- ⚠️ **Write Operations** - Hanya simulasi (tidak persisten)
- 💡 **Production Solution** - Butuh backend service atau GitHub API integration

## 📞 Supportikasi sudah di-push ke repository

## 🛠️ Langkah-langkah Deploy

### 1. Persiapan Repository

```bash
# Clone repository (jika belum ada)
git clone https://github.com/username/file-container.git
cd file-container

# Atau jika sudah ada, pastikan up-to-date
git pull origin main
```

### 2. Push ke GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add GitHub Pages version"

# Push to GitHub
git push origin main
```

### 3. Enable GitHub Pages

1. **Buka repository** di GitHub
2. **Klik Settings** (tab di atas)
3. **Scroll ke bagian Pages** (di sidebar kiri)
4. **Konfigurasi**:
   - **Source**: Deploy from a branch
   - **Branch**: main (atau master)
   - **Folder**: /docs
   - **Klik Save**

### 4. Tunggu Deploy

- GitHub akan otomatis build dan deploy
- Proses biasanya 1-5 menit
- Cek status di tab "Actions"

### 5. Akses Aplikasi

Aplikasi akan tersedia di:
```
https://username.github.io/repository-name/
```

## 🔧 Konfigurasi Lanjutan

### Custom Domain (Opsional)

1. **Buat file CNAME** di folder docs:
   ```
   echo "yourdomain.com" > docs/CNAME
   ```

2. **Konfigurasi DNS** di provider domain:
   ```
   Type: CNAME
   Name: www (atau @)
   Value: username.github.io
   ```

3. **Update GitHub Pages settings**:
   - Custom domain: yourdomain.com
   - Enforce HTTPS: ✅

### Automated Deployment

File `.github/workflows/deploy.yml` sudah disediakan untuk:
- ✅ Auto-deploy saat push ke main branch
- ✅ Build verification
- ✅ Error handling

## 🎯 Tips Deployment

### ✅ Do's
- Test lokal sebelum push
- Gunakan commit message yang jelas
- Check GitHub Actions untuk error
- Backup data sebelum update major

### ❌ Don'ts
- Jangan push file sensitive
- Jangan edit langsung di GitHub (gunakan PR)
- Jangan force push ke main branch
- Jangan deploy tanpa testing

## 🐛 Troubleshooting

### Problem: 404 Not Found
**Solution**:
```bash
# Pastikan file ada di folder docs
ls docs/index.html

# Pastikan branch dan folder settings benar
Settings → Pages → Source: /docs folder
```

### Problem: Aplikasi tidak load
**Solution**:
```bash
# Check browser console untuk error
# Pastikan path relative, bukan absolute
# Check GitHub Actions untuk build error
```

### Problem: File tidak ter-upload
**Solution**:
```bash
# Check file size (max ~2MB untuk localStorage)
# Check browser storage limit
# Clear browser cache dan try again
```

### Problem: Custom domain tidak work
**Solution**:
```bash
# Verify CNAME file content
cat docs/CNAME

# Check DNS propagation
nslookup yourdomain.com

# Wait 24-48 hours for DNS propagation
```

## 📊 Monitoring

### GitHub Actions
- Cek tab "Actions" untuk deployment status
- Red ❌ = failed, Green ✅ = success
- Click detail untuk error log

### Usage Analytics
GitHub Pages menyediakan basic analytics:
- Settings → Pages → View traffic
- Visitor count dan referrers

### Performance
Test performance dengan:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🔄 Update Aplikasi

```bash
# Pull latest changes
git pull origin main

# Make your changes
# Edit files in docs/ folder

# Commit and push
git add .
git commit -m "Update application"
git push origin main

# GitHub akan otomatis re-deploy
```

## 🚨 Security Notes

### GitHub Pages Limitations
- ❌ Tidak ada server-side processing
- ❌ Tidak ada database
- ❌ Public repository = public code
- ⚠️ Data tersimpan di browser user

### Best Practices
- ✅ Jangan hardcode API keys
- ✅ Use HTTPS (default di GitHub Pages)
- ✅ Validate user input
- ✅ Regular security updates

## � Teknologi Storage

### 🔧 JSON Chunked Storage System

File Container menggunakan sistem storage canggih:

- **Auto-splitting**: File JSON otomatis dipecah ketika mencapai 20MB
- **Multi-chunk support**: Mendukung hingga 25MB total storage
- **Backward compatibility**: Migrasi otomatis dari sistem lama
- **Optimized performance**: Load only needed chunks
- **Data integrity**: Checksums untuk validasi data

### 💾 Storage Architecture

```
localStorage:
├── fileContainer_folders     # Metadata folder
├── fileContainer_meta        # Chunk metadata
├── fileContainer_chunk_0     # File chunk 1 (max 20MB)
├── fileContainer_chunk_1     # File chunk 2 (max 20MB)
└── fileContainer_chunk_n     # File chunk n+1
```

### 🎯 Benefits

- ✅ **25MB+ capacity** vs 5-10MB sebelumnya
- ✅ **Auto-optimization** menghapus duplikat
- ✅ **Chunked export/import** untuk file besar
- ✅ **Real-time monitoring** dengan chunk info
- ✅ **Progressive loading** untuk performa optimal

Jika mengalami masalah:

1. **Check dokumentasi**: README.md
2. **Search issues**: GitHub repository issues
3. **Create issue**: Jika tidak ada solusi
4. **Community**: Stack Overflow dengan tag "github-pages"

---

**Happy Deploying! 🎉**

**Live Demo**: [File Container Demo](https://yourusername.github.io/file-container/)
