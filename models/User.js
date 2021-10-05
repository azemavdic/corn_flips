import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        name: { type: String },
        email: { type: String, required: [true, 'Upišite email'] },
        password: {
            type: String,
            required: [true, 'Upišite šifru'],
        },
        isProizvodnja: { type: Boolean, default: false },
        isKomercijala: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
