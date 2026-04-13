'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Announcement = require('../models/Announcement');
const Ticker = require('../models/Ticker');
const Menu = require('../models/Menu');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // --- 1. Admin User ---
        const adminEmail = 'admin@kolej.com';
        const adminPassword = '1111';
        
        const existingUser = await User.findOne({ username: adminEmail });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(adminPassword, 12);
            await User.create({
                username: adminEmail,
                password_hash: hashedPassword,
                role: 'admin'
            });
            console.log('✅ Admin user created:', adminEmail);
        } else {
            console.log('ℹ️ Admin user already exists, skipping.');
        }

        // --- 2. Default Announcements ---
        const annCount = await Announcement.countDocuments();
        if (annCount === 0) {
            await Announcement.create([
                { title: 'Yeni Eğitim Yılı', content: '2026-2027 Eğitim ve Öğretim yılı tüm hızıyla devam ediyor. Başarılar dileriz!' },
                { title: 'Kantin Bilgilendirmesi', content: 'Kantinimizde bugünden itibaren taze sıkılmış portakal suyu servisi başlamıştır.' }
            ]);
            console.log('✅ Default announcements created.');
        }

        // --- 3. Default Ticker Messages ---
        const tickerCount = await Ticker.countDocuments();
        if (tickerCount === 0) {
            await Ticker.create([
                { message: 'Eğitimde Teknoloji ve Gelecek RoboTekno ile Sizlerle!' },
                { message: 'Hoş Geldiniz Değerli Misafirlerimiz' },
                { message: 'Başarı Bir Yolculuktur, Bir Varış Noktası Değildir' }
            ]);
            console.log('✅ Default ticker messages created.');
        }

        // --- 4. Default Weekly Menu ---
        const menuCount = await Menu.countDocuments();
        if (menuCount === 0) {
            const today = new Date();
            const monday = new Date(today);
            monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
            monday.setHours(0,0,0,0);

            const weekMenu = [
                { soup: 'Yayla Çorbası', main_course: 'Dana Rosto', side_dish: 'İç Pilav', dessert: 'Mevsim Salatası' },
                { soup: 'Süzme Mercimek Çorbası', main_course: 'Tavuk Haşlama', side_dish: 'Bulgur Pilavı', dessert: 'Yoğurt' },
                { soup: 'Ezogelin Çorbası', main_course: 'İzmir Köfte', side_dish: 'Pirinç Pilavı', dessert: 'Cacık' },
                { soup: 'Domates Çorbası', main_course: 'Mantı', side_dish: 'Su Böreği', dessert: 'Revani' },
                { soup: 'Tarhana Çorbası', main_course: 'Fırında Çipura', side_dish: 'Sebze Sote', dessert: 'Tahin Helvası' },
            ];

            for (let i = 0; i < 5; i++) {
                const d = new Date(monday);
                d.setDate(monday.getDate() + i);
                await Menu.create({
                    date: d,
                    ...weekMenu[i]
                });
            }
            console.log('✅ Default cafeteria menu created for current week.');
        }

        console.log('✅ Seed complete.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
