import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const IzvozSchema = Schema(
    {
        naziv: { type: String, required: [true, 'Upišite naziv kupca'] },
        narudzba: { type: String, required: [true, 'Upišite datum narudžbe'] },
        proizvodnja: {
            type: String,
            possibleValues: ['ne', 'utoku', 'da'],
            default: 'ne',
        },
        isporuka: {
            type: String,
            // immutable: true,
            required: [true, 'Upišite datum isporuke'],
        },
        zavrsen: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Izvoz || mongoose.model('Izvoz', IzvozSchema);
