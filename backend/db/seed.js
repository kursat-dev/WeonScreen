'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seed() {
    const client = await pool.connect();
    try {
        console.log('Seeding default data…');

        // --- Admin user ---
        const adminUsername = 'admin@kolej.com';
        const adminPassword = '1111';
        const existing = await client.query(
            'SELECT id FROM users WHERE username = $1',
            [adminUsername]
        );

        if (existing.rows.length === 0) {
            const hash = await bcrypt.hash(adminPassword, 12);
            await client.query(
                `INSERT INTO users (username, password_hash, role)
         VALUES ($1, $2, 'admin')`,
                [adminUsername, hash]
            );
            console.log('✅  Admin user created:', adminUsername);
        } else {
            console.log('ℹ️   Admin user already exists, skipping.');
        }

        // --- Default announcements ---
        const annCount = await client.query('SELECT COUNT(*) FROM announcements');
        if (parseInt(annCount.rows[0].count, 10) === 0) {
            await client.query(`
        INSERT INTO announcements (title, content) VALUES
          ('Yeni Eğitim Yılı', '2026-2027 Eğitim ve Öğretim yılı tüm hızıyla devam ediyor. Başarılar dileriz!'),
          ('Kantin Bilgilendirmesi', 'Kantinimizde bugünden itibaren taze sıkılmış portakal suyu servisi başlamıştır.')
      `);
            console.log('✅  Default announcements created.');
        }

        // --- Default ticker messages ---
        const tickerCount = await client.query('SELECT COUNT(*) FROM ticker_messages');
        if (parseInt(tickerCount.rows[0].count, 10) === 0) {
            await client.query(`
        INSERT INTO ticker_messages (message) VALUES
          ('Eğitimde Teknoloji ve Gelecek RoboTekno ile Sizlerle!'),
          ('Hoş Geldiniz Değerli Misafirlerimiz'),
          ('Başarı Bir Yolculuktur, Bir Varış Noktası Değildir')
      `);
            console.log('✅  Default ticker messages created.');
        }

        // --- Default weekly menu (5 rows, one per weekday) ---
        const menuCount = await client.query('SELECT COUNT(*) FROM cafeteria_menu');
        if (parseInt(menuCount.rows[0].count, 10) === 0) {
            // Insert Mon-Fri of the current week
            const today = new Date();
            const monday = new Date(today);
            monday.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Monday

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
                const dateStr = d.toISOString().split('T')[0];
                const m = weekMenu[i];
                await client.query(
                    `INSERT INTO cafeteria_menu (date, soup, main_course, side_dish, dessert)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (date) DO NOTHING`,
                    [dateStr, m.soup, m.main_course, m.side_dish, m.dessert]
                );
            }
            console.log('✅  Default cafeteria menu created for current week.');
        }

        console.log('✅  Seed complete.');
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
