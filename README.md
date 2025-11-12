# Panduan Instalasi Website Sate TaichanKu

Website ini adalah website penjualan Sate Taichan modern dengan tema orange yang dibangun menggunakan HTML, CSS, JavaScript (Frontend) dan PHP, MySQL (Backend).

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
1. **Server Web Lokal** (seperti XAMPP, WAMP, MAMP, atau Laragon). Panduan ini menggunakan XAMPP sebagai contoh.
2. **Text Editor** (seperti Visual Studio Code, Sublime Text, atau Atom).

## Langkah 1: Menyiapkan Folder Proyek

1. Ekstrak atau salin folder `taichanku` ke dalam direktori `htdocs` (jika menggunakan XAMPP) atau `www` (jika menggunakan WAMP).
2. Path lengkapnya biasanya akan menjadi `C:/xampp/htdocs/taichanku`.

## Langkah 2: Membuat Database

1. Buka XAMPP Control Panel dan pastikan **Apache** dan **MySQL** sudah berjalan.
2. Buka browser Anda dan akses `http://localhost/phpmyadmin`.
3. Klik tab **Database**.
4. Di bagian "Create database", masukkan nama `taichanku_db` dan klik **Create**.
5. Pilih database `taichanku_db` yang baru saja Anda buat dari daftar di sidebar kiri.
6. Klik tab **Import**.
7. Klik tombol **Choose File** dan navigasikan ke folder proyek Anda (`htdocs/taichanku`), lalu pilih file `database/taichanku_db.sql`.
8. Klik tombol **Go** di bagian bawah untuk menjalankan script. Script ini akan membuat semua tabel yang diperlukan dan mengisinya dengan data produk awal.

## Langkah 3: Konfigurasi Koneksi Database (Opsional)

File konfigurasi koneksi database berada di `api/db_connect.php`. Secara default, file ini dikonfigurasi untuk server XAMPP standar:
- Username: `root`
- Password: (kosong)

Jika konfigurasi MySQL Anda berbeda, buka file `api/db_connect.php` dan sesuaikan variabel `$username` dan `$password`.

## Langkah 4: Menjalankan Website

1. Pastikan server Apache dan MySQL pada XAMPP Anda tetap berjalan.
2. Buka browser Anda.
3. Akses alamat `http://localhost/taichanku`.

Website Sate TaichanKu seharusnya sudah tampil dengan sempurna. Data produk di halaman "Menu" akan dimuat secara dinamis dari database yang telah Anda buat.

## Struktur Folder
