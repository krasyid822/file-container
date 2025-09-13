# 📋 JSON File Storage System

## 🎯 Overview

File Container menggunakan sistem **JSON File Storage** yang menyimpan data sebagai file JSON terpisah di repository GitHub, bukan di localStorage browser. Sistem ini memungkinkan:

- ✅ **Unlimited Storage** - Tidak terbatas oleh browser storage limit
- ✅ **Auto-Splitting** - Otomatis buat file JSON baru ketika mencapai 20MB
- ✅ **Cross-Device Access** - Data tersedia di semua perangkat
- ✅ **Version Control** - File JSON ter-track oleh Git
- ✅ **Collaborative** - Multiple users bisa akses data yang sama

## 📁 File Structure

```
docs/
├── data/
│   ├── index.json          # Master index of all data files
│   ├── files-001.json      # First data file (max 20MB)
│   ├── files-002.json      # Second data file (auto-created)
│   ├── files-003.json      # Third data file (auto-created)
│   └── files-XXX.json      # Additional files as needed
├── index.html              # Main application
└── README.md              # This documentation
```

## 🔧 How It Works

### 1. Data Index (`index.json`)
```json
{
  "version": "2.0",
  "lastUpdate": "2025-09-13T00:00:00.000Z",
  "dataFiles": [
    {
      "filename": "files-001.json",
      "fileNumber": 1,
      "currentSize": 15728640,
      "maxSize": 20971520,
      "active": true,
      "created": "2025-09-13T00:00:00.000Z"
    }
  ],
  "totalDataFiles": 1,
  "totalFolders": 5,
  "totalFiles": 25,
  "totalSizeBytes": 15728640
}
```

### 2. Data Files (`files-XXX.json`)
```json
{
  "version": "2.0",
  "metadata": {
    "created": "2025-09-13T00:00:00.000Z",
    "lastUpdate": "2025-09-13T00:00:00.000Z",
    "fileNumber": 1,
    "maxSizeBytes": 20971520,
    "currentSizeBytes": 15728640
  },
  "folders": {
    "Documents": {
      "name": "Documents",
      "password": "hashed_password",
      "createdAt": "2025-09-13T00:00:00.000Z"
    }
  },
  "files": [
    {
      "id": "unique_file_id",
      "name": "document.pdf",
      "folder": "Documents",
      "size": 1048576,
      "mimetype": "application/pdf",
      "uploadDate": "2025-09-13T00:00:00.000Z",
      "base64Data": "data:application/pdf;base64,..."
    }
  ]
}
```

## ⚡ Auto-Splitting Process

### When a new file is uploaded:

1. **Calculate total size** of current active data file
2. **Check if adding new file** would exceed 20MB limit
3. **If yes**: Create new data file (`files-002.json`, `files-003.json`, etc.)
4. **Update index.json** with new file information
5. **Distribute files** across multiple data files efficiently

### Example Split Scenario:

```
Initial State:
├── files-001.json (19.5MB) - Full, ready to split

After Upload (2MB file):
├── files-001.json (19.5MB) - Unchanged
├── files-002.json (2MB)    - New file created
```

## 🌐 GitHub Pages Integration

### Advantages:
- **Free Hosting** - GitHub Pages is completely free
- **Global CDN** - Fast access worldwide
- **SSL Certificate** - HTTPS by default
- **Version Control** - All changes tracked by Git
- **Custom Domain** - Optional custom domain support

### Limitations:
- **Read-Only** - GitHub Pages can't write files
- **Demo Mode** - Write operations shown as simulation
- **Manual Updates** - New data files need manual Git commit

## 🔄 Data Synchronization

### For Production Use:

1. **GitHub API Integration** - Use GitHub API for write operations
2. **Authentication** - GitHub token for repository access
3. **Automated Commits** - Auto-commit new data files
4. **Conflict Resolution** - Handle concurrent modifications

### Current Demo Implementation:

- ✅ **Read Operations** - Load all JSON files successfully
- ✅ **UI Updates** - Show changes in real-time
- ⚠️ **Write Operations** - Simulated (not persistent)
- ⚠️ **Data Persistence** - Requires manual file updates

## 📊 Performance Optimization

### Lazy Loading:
- Only load needed data files
- Cache frequently accessed data
- Progressive loading for large datasets

### Memory Management:
- Release unused file data from memory
- Efficient JSON parsing
- Minimal DOM updates

### Network Optimization:
- Parallel loading of multiple data files
- Compression for large JSON files
- Smart caching strategies

## 🛠️ Development Setup

### For Backend Integration:

```javascript
// Example: GitHub API Integration
async function saveToGitHub(filename, data) {
  const response = await fetch(`https://api.github.com/repos/user/repo/contents/docs/data/${filename}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Update ${filename}`,
      content: btoa(JSON.stringify(data, null, 2)),
      sha: await getFileSHA(filename) // Get current file SHA
    })
  });
  return response.json();
}
```

### For Local Development:

```bash
# Clone repository
git clone https://github.com/user/file-container.git
cd file-container

# Serve locally
python -m http.server 8000
# or
npx serve docs

# Access application
open http://localhost:8000
```

## 🔒 Security Considerations

### Data Protection:
- **Password Hashing** - SHA-256 for folder passwords
- **Input Validation** - Sanitize all user inputs
- **File Type Validation** - Check uploaded file types
- **Size Limits** - Prevent oversized uploads

### Access Control:
- **GitHub Repository** - Private repos for sensitive data
- **Branch Protection** - Protect main branch from direct pushes
- **API Rate Limits** - Respect GitHub API limitations
- **Token Security** - Secure storage of GitHub tokens

## 📈 Monitoring & Analytics

### Storage Metrics:
- Total data files count
- Individual file sizes
- Storage distribution
- Growth trends

### Performance Metrics:
- Load times per data file
- Network transfer sizes
- Cache hit rates
- Error rates

### Usage Analytics:
- Most accessed folders
- File upload/download patterns
- User activity trends
- Peak usage times

## 🚀 Future Enhancements

### Planned Features:
- 🔄 **Real-time Sync** - Live updates across devices
- 🗜️ **Compression** - Gzip/Brotli for JSON files
- 🔍 **Search** - Full-text search across all files
- 📊 **Analytics Dashboard** - Usage statistics and insights
- 👥 **Multi-user** - Collaborative folder management
- 🔐 **Enhanced Security** - End-to-end encryption

### Technical Improvements:
- 💾 **Intelligent Caching** - Smart cache invalidation
- ⚡ **Performance** - WebWorkers for large file processing
- 📱 **PWA Features** - Offline support and app-like experience
- 🔌 **Plugin System** - Extensible architecture

---

**This JSON File Storage System provides unlimited, scalable storage for File Container while maintaining the simplicity and accessibility of GitHub Pages hosting.** 🎉
