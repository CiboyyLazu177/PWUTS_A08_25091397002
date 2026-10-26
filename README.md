# PWUTS_A08_25091397002 — Kopi Senja, Modul 1 (Menu & Katalog)

UTS Pemrograman Web (D4 MI 2025), Kelompok 8.
Nama: Lazuardi Wahyu Ferdiansyah, NIM 25091397002.

## Isi
| File | Keterangan |
|---|---|
| `index.html` | Homepage responsif: navbar (hamburger di layar kecil), hero, menu unggulan, footer, 2 gambar. Tautan navigasi memakai Ajax (`$.ajax`) untuk memuat halaman lain ke dalam layout utama. |
| `menu.html` | Halaman konten: filter kategori (kopi, non-kopi, makanan), pencarian langsung, modal detail produk (jQuery). |
| `pesan.html` | Halaman form: nama, no. HP, pilihan menu, jumlah, metode (dine-in/take away), catatan. Validasi jQuery per field, lalu data dikirim ke server HTTP (httpbin.org, server uji coba) lewat `$.post` setelah lolos validasi. |
| `css/style.css` | Gaya bersama, palet merah bata / krem / emas karamel sesuai proposal. |
| `js/main.js` | Data menu, navigasi Ajax, filter, modal, dan validasi. |
| `images/` | `hero.svg`, `outlet.svg`, `kopi-senja-building.png` (visual bangunan semi-vintage saat senja), dan `menu/` berisi foto 8 produk (kopi, non-kopi, makanan). |

## Aturan validasi form
Nama minimal 3 huruf; no. HP diawali 08 atau +62 dengan 10 sampai 14 digit; menu wajib dipilih; jumlah 1 sampai 20; metode wajib dipilih. Total perkiraan dihitung otomatis.

## Cara menjalankan
Karena memakai Ajax, buka lewat server lokal, bukan klik dua kali pada file:
- VS Code: ekstensi **Live Server**, klik kanan `index.html`, Open with Live Server
- atau di terminal: `python -m http.server 8000` lalu buka `http://localhost:8000`

## Pembagian modul
Modul 1 (Menu & Katalog) dikerjakan oleh Lazuardi Wahyu Ferdiansyah. Modul 2 (Keranjang & Pembayaran) dikerjakan Dinda Dewi Putri A. R., Modul 3 (Informasi & Pelanggan) dikerjakan M. Wildan Islami Pasha. Navbar dapat ditautkan ke modul lain saat digabung.
