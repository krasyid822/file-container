const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));
app.use('/uploads', express.static('uploads'));

// Paths
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
const foldersDataFile = path.join(dataDir, 'folders.json');
const filesDataFile = path.join(dataDir, 'files.json');

// Ensure directories exist
fs.ensureDirSync(uploadsDir);
fs.ensureDirSync(dataDir);

// Initialize data files if they don't exist
function initializeDataFiles() {
    if (!fs.existsSync(foldersDataFile)) {
        fs.writeJsonSync(foldersDataFile, {});
    }
    if (!fs.existsSync(filesDataFile)) {
        fs.writeJsonSync(filesDataFile, []);
    }
}

initializeDataFiles();

// Utility functions
function loadFoldersData() {
    try {
        return fs.readJsonSync(foldersDataFile);
    } catch (error) {
        console.error('Error loading folders data:', error);
        return {};
    }
}

function saveFoldersData(data) {
    try {
        fs.writeJsonSync(foldersDataFile, data, { spaces: 2 });
    } catch (error) {
        console.error('Error saving folders data:', error);
    }
}

function loadFilesData() {
    try {
        return fs.readJsonSync(filesDataFile);
    } catch (error) {
        console.error('Error loading files data:', error);
        return [];
    }
}

function saveFilesData(data) {
    try {
        fs.writeJsonSync(filesDataFile, data, { spaces: 2 });
    } catch (error) {
        console.error('Error saving files data:', error);
    }
}

function sanitizeFolderName(name) {
    return name.replace(/[^a-zA-Z0-9\-_\s]/g, '').trim();
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.body.folder;
        if (!folder) {
            return cb(new Error('Folder tidak boleh kosong'));
        }
        
        const folderPath = path.join(uploadsDir, sanitizeFolderName(folder));
        fs.ensureDirSync(folderPath);
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        // Keep original filename with timestamp to avoid conflicts
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}_${timestamp}${ext}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    },
    fileFilter: function (req, file, cb) {
        // Check if folder exists and is valid
        const foldersData = loadFoldersData();
        const folder = req.body.folder;
        
        if (!folder || !foldersData[folder]) {
            return cb(new Error('Folder tidak valid atau tidak ditemukan'));
        }
        
        cb(null, true);
    }
});

// Routes

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get list of folders
app.get('/api/folders', (req, res) => {
    try {
        const foldersData = loadFoldersData();
        const folders = Object.keys(foldersData);
        res.json(folders);
    } catch (error) {
        res.status(500).json({ error: 'Error loading folders' });
    }
});

// Create new folder
app.post('/api/folder', async (req, res) => {
    try {
        const { name, password } = req.body;
        
        if (!name || !password) {
            return res.status(400).json({ error: 'Nama folder dan sandi harus diisi' });
        }
        
        const sanitizedName = sanitizeFolderName(name);
        if (!sanitizedName) {
            return res.status(400).json({ error: 'Nama folder tidak valid' });
        }
        
        const foldersData = loadFoldersData();
        
        if (foldersData[sanitizedName]) {
            return res.status(400).json({ error: 'Folder sudah ada' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create folder data
        foldersData[sanitizedName] = {
            name: sanitizedName,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        // Create physical folder
        const folderPath = path.join(uploadsDir, sanitizedName);
        fs.ensureDirSync(folderPath);
        
        // Save data
        saveFoldersData(foldersData);
        
        res.json({ success: true, folder: sanitizedName });
        
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).json({ error: 'Error creating folder' });
    }
});

// Upload files
app.post('/api/upload', upload.array('files'), (req, res) => {
    try {
        const folder = req.body.folder;
        const files = req.files;
        
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Tidak ada file yang diupload' });
        }
        
        const filesData = loadFilesData();
        
        // Add file information to database
        files.forEach(file => {
            const fileInfo = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                name: file.originalname,
                filename: file.filename,
                folder: folder,
                size: file.size,
                mimetype: file.mimetype,
                uploadDate: new Date().toISOString(),
                path: file.path
            };
            
            filesData.push(fileInfo);
        });
        
        saveFilesData(filesData);
        
        res.json({ 
            success: true, 
            message: `${files.length} file berhasil diupload`,
            files: files.map(f => f.originalname)
        });
        
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Error uploading files: ' + error.message });
    }
});

// Get files and folders
app.get('/api/files', (req, res) => {
    try {
        const requestedFolder = req.query.folder || '';
        const foldersData = loadFoldersData();
        const filesData = loadFilesData();
        
        // Get folders (only at root level for now)
        let folders = [];
        if (!requestedFolder) {
            folders = Object.keys(foldersData);
        }
        
        // Get files in the requested folder
        let files = [];
        if (requestedFolder) {
            files = filesData.filter(file => file.folder === requestedFolder);
        }
        
        res.json({ folders, files });
        
    } catch (error) {
        console.error('Error loading files:', error);
        res.status(500).json({ error: 'Error loading files' });
    }
});

// Download file
app.get('/api/download', (req, res) => {
    try {
        const { folder, file: fileName } = req.query;
        
        if (!folder || !fileName) {
            return res.status(400).json({ error: 'Folder dan nama file harus diisi' });
        }
        
        const filesData = loadFilesData();
        const fileInfo = filesData.find(f => f.folder === folder && f.name === fileName);
        
        if (!fileInfo) {
            return res.status(404).json({ error: 'File tidak ditemukan' });
        }
        
        const filePath = path.join(uploadsDir, folder, fileInfo.filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File fisik tidak ditemukan' });
        }
        
        res.download(filePath, fileInfo.name);
        
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: 'Error downloading file' });
    }
});

// Delete file or folder
app.delete('/api/delete', async (req, res) => {
    try {
        const { type, name, folder, password } = req.body;
        
        if (!type || !name || !password) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }
        
        const foldersData = loadFoldersData();
        
        if (type === 'folder') {
            // Delete folder
            if (!foldersData[name]) {
                return res.status(404).json({ error: 'Folder tidak ditemukan' });
            }
            
            // Verify password
            const isValidPassword = await bcrypt.compare(password, foldersData[name].password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Sandi salah' });
            }
            
            // Delete physical folder and all its contents
            const folderPath = path.join(uploadsDir, name);
            if (fs.existsSync(folderPath)) {
                fs.removeSync(folderPath);
            }
            
            // Remove folder from data
            delete foldersData[name];
            saveFoldersData(foldersData);
            
            // Remove all files in this folder from files data
            const filesData = loadFilesData();
            const updatedFilesData = filesData.filter(f => f.folder !== name);
            saveFilesData(updatedFilesData);
            
            res.json({ success: true, message: 'Folder berhasil dihapus' });
            
        } else if (type === 'file') {
            // Delete file
            if (!folder) {
                return res.status(400).json({ error: 'Folder harus diisi untuk menghapus file' });
            }
            
            if (!foldersData[folder]) {
                return res.status(404).json({ error: 'Folder tidak ditemukan' });
            }
            
            // Verify password
            const isValidPassword = await bcrypt.compare(password, foldersData[folder].password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Sandi salah' });
            }
            
            const filesData = loadFilesData();
            const fileInfo = filesData.find(f => f.folder === folder && f.name === name);
            
            if (!fileInfo) {
                return res.status(404).json({ error: 'File tidak ditemukan' });
            }
            
            // Delete physical file
            const filePath = path.join(uploadsDir, folder, fileInfo.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            
            // Remove file from data
            const updatedFilesData = filesData.filter(f => f.id !== fileInfo.id);
            saveFilesData(updatedFilesData);
            
            res.json({ success: true, message: 'File berhasil dihapus' });
            
        } else {
            res.status(400).json({ error: 'Tipe tidak valid' });
        }
        
    } catch (error) {
        console.error('Error deleting:', error);
        res.status(500).json({ error: 'Error deleting: ' + error.message });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File terlalu besar (maksimal 100MB)' });
        }
    }
    
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 File Container Server running at http://localhost:${PORT}`);
    console.log(`📁 Upload directory: ${uploadsDir}`);
    console.log(`💾 Data directory: ${dataDir}`);
});

module.exports = app;
