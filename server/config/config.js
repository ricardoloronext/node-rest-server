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
'mongodb+srv://cafe-user:123456_@cluster0.qrtll.mongodb.net/cafe';

process.env.URLDB = urlDb;