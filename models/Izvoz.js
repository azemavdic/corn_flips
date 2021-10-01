import mongoose, { Schema } from 'mongoose';

const IzvozSchema = new mongoose.Schema({
    naziv: { type: String, required: [true, 'Upišite naziv kupca'] },
    narudzba: { type: String, required: [true, 'Upišite datum narudžbe'] },
    isporuka: { type: String, required: [true, 'Upišite datum isporuke'] },
    zavrsen: { type: Boolean },
});

export default mongoose.models.Izvoz || mongoose.model('Izvoz', IzvozSchema);
