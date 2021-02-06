// ================================
// Puerto
// ================================

process.env.PORT = process.env.PORT || 3000;

// ================================
// Entorno
// ================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================
// BBDD
// ================================

let urlDb = process.env.NODE_ENV === 'dev' ? 
'mongodb://localhost:27017/cafe' :
process.env.MONGO_URL;

process.env.URLDB = urlDb;