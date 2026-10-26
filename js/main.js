/* Kopi Senja - Modul 1: Menu & Katalog (jQuery) */
var MENU = [
 {id:1,nama:'Kopi Susu Senja',kat:'kopi',harga:18000,img:'images/menu/kopi-susu-senja.jpg',best:true,desk:'Espresso, susu segar, dan gula aren. Menu andalan Kopi Senja.'},
 {id:2,nama:'Americano',kat:'kopi',harga:16000,img:'images/menu/americano.jpg',best:false,desk:'Espresso dengan air panas atau es, rasa bersih dan tegas.'},
 {id:3,nama:'Caramel Latte',kat:'kopi',harga:24000,img:'images/menu/caramel-latte.jpg',best:true,desk:'Latte lembut dengan saus karamel buatan sendiri.'},
 {id:4,nama:'Matcha Latte',kat:'nonkopi',harga:25000,img:'images/menu/matcha-latte.jpg',best:false,desk:'Matcha Jepang dengan susu, tanpa kafein kopi.'},
 {id:5,nama:'Es Teh Melati',kat:'nonkopi',harga:14000,img:'images/menu/es-teh-melati.jpg',best:true,desk:'Teh melati dingin, ringan dan wangi.'},
 {id:6,nama:'Croissant',kat:'makanan',harga:20000,img:'images/menu/croissant.jpg',best:false,desk:'Croissant mentega, dipanggang setiap pagi.'},
 {id:7,nama:'Roti Bakar Cokelat',kat:'makanan',harga:17000,img:'images/menu/roti-bakar-cokelat.jpg',best:false,desk:'Roti tebal dengan selai cokelat dan keju.'},
 {id:8,nama:'Cokelat Panas',kat:'nonkopi',harga:22000,img:'images/menu/cokelat-panas.jpg',best:false,desk:'Cokelat pekat dengan susu panas.'}
];
var NAMA_KAT={kopi:'Kopi',nonkopi:'Non-kopi',makanan:'Makanan'};
var cache={};
var JUDUL_AWAL=document.title;
function rp(n){return 'Rp '+n.toLocaleString('id-ID');}
function kartu(m,tombol){
 return '<article class="card"><div class="foto"><img src="'+m.img+'" alt="'+m.nama+'" width="800" height="600" loading="lazy"></div><div class="isi">'+
  (m.best?'<span class="badge">Favorit</span>':'')+'<h3>'+m.nama+'</h3><span class="harga">'+rp(m.harga)+'</span>'+tombol+'</div></article>';
}
/* ---------- Beranda ---------- */
function initHome(){
 var h='';
 $.each(MENU,function(i,m){ if(m.best) h+=kartu(m,'<button class="btn" data-pilih="'+m.id+'">Pesan</button>'); });
 $('#unggulan').html(h);
}
/* ---------- Halaman Menu ---------- */
function initMenu(){
 var kat='semua';
 function render(){
  var q=$('#cari').val().toLowerCase().trim(),h='',n=0;
  $.each(MENU,function(i,m){
   if((kat==='semua'||m.kat===kat)&&m.nama.toLowerCase().indexOf(q)>-1){
    n++; h+=kartu(m,'<button class="btn" data-detail="'+m.id+'">Lihat detail</button>');
   }
  });
  $('#katalog').html(h); $('#kosong').toggle(n===0);
 }
 $('#kategori').on('click','.chip',function(){
  $('.chip').removeClass('on'); $(this).addClass('on'); kat=$(this).data('kat'); render();
 });
 $('#cari').on('input',render);
 $('#katalog').on('click','[data-detail]',function(){
  var m=MENU.filter(function(x){return x.id==$(this).data('detail');},this)[0];
  $('#m-foto').empty().append($('<img>',{src:m.img,alt:m.nama})); $('#m-kat').text(NAMA_KAT[m.kat]); $('#m-nama').text(m.nama);
  $('#m-desk').text(m.desk); $('#m-harga').text(rp(m.harga));
  $('#m-pesan').attr('data-pilih',m.id);
  $('#modal').addClass('open'); $('#m-tutup').focus();
 });
 $('#m-tutup').on('click',function(){$('#modal').removeClass('open');});
 $('#modal').on('click',function(e){if(e.target===this)$(this).removeClass('open');});
 $(document).on('keydown.modal',function(e){if(e.key==='Escape')$('#modal').removeClass('open');});
 render();
}
/* ---------- Halaman Pesan (form + validasi) ---------- */
function initPesan(){
 $.each(MENU,function(i,m){$('#menu').append('<option value="'+m.id+'">'+m.nama+' ('+rp(m.harga)+')</option>');});
 if(window.pilihMenu) $('#menu').val(window.pilihMenu);
 window.pilihMenu=null; /* reset supaya tidak terbawa ke kunjungan berikutnya */
 function hitung(){
  var m=MENU.filter(function(x){return x.id==$('#menu').val();})[0], j=parseInt($('#jumlah').val(),10)||0;
  $('#total').text(rp(m&&j>0?m.harga*j:0));
 }
 $('#menu,#jumlah').on('input change',hitung); hitung();

 /* Aturan per field: return pesan error, atau '' kalau valid */
 var aturan={
  nama:function(){
   var v=$.trim($('#nama').val());
   if(v.length<3) return 'Nama minimal 3 karakter.';
   return /^[A-Za-z .'-]+$/.test(v)?'':'Nama hanya boleh berisi huruf.';
  },
  hp:function(){
   return /^(08|\+62)[0-9]{8,12}$/.test($.trim($('#hp').val()))?'':'Nomor HP harus diawali 08 atau +62, 10 sampai 14 digit.';
  },
  menu:function(){ return $('#menu').val()?'':'Pilih satu menu.'; },
  jumlah:function(){
   var j=parseInt($('#jumlah').val(),10);
   return (j>=1&&j<=20)?'':'Jumlah harus antara 1 dan 20.';
  },
  metode:function(){ return $('input[name=metode]:checked').val()?'':'Pilih dine-in atau take away.'; }
 };
 function cekField(f){
  var pesan=aturan[f]();
  $('[data-for="'+f+'"]').text(pesan);
  $('#'+f).toggleClass('invalid',!!pesan);
  return !pesan;
 }
 function cekSemua(){
  var ok=true;
  $.each(aturan,function(f){ if(!cekField(f)) ok=false; });
  return ok;
 }
 /* validasi hanya field yang sedang diisi */
 $('#nama,#hp,#menu,#jumlah').on('blur change',function(){ cekField(this.id); });
 $('input[name=metode]').on('change',function(){ cekField('metode'); });

 $('#form-pesan').on('submit',function(e){
  e.preventDefault();
  if(!cekSemua()){ $('.invalid').first().focus(); return; }
  var form=this, $btn=$(form).find('button[type=submit]').prop('disabled',true).text('Mengirim...');
  var m=MENU.filter(function(x){return x.id==$('#menu').val();})[0];
  var ringkas='<strong>'+$('<i>').text($.trim($('#nama').val())).html()+'</strong>. Pesanan '+$('#jumlah').val()+'x '+m.nama+' ('+$('input[name=metode]:checked').val()+'). Total '+$('#total').text()+'.';
  /* kirim ke server HTTP (httpbin.org = server uji coba) setelah lolos validasi */
  $.post($(form).attr('action'),$(form).serialize())
   .done(function(){
    $('#sukses').removeClass('gagal').html('Terima kasih, '+ringkas+' Pesanan sudah terkirim ke server.').show().focus();
    form.reset(); hitung();
   })
   .fail(function(){
    $('#sukses').addClass('gagal').html('Pesanan belum terkirim ke server. Cek koneksi internet lalu coba lagi.').show().focus();
   })
   .always(function(){ $btn.prop('disabled',false).text('Kirim pesanan'); });
 });
}
/* ---------- Navigasi Ajax ---------- */
var inits={home:initHome,menu:initMenu,pesan:initPesan};
function muat(page,url){
 $(document).off('keydown.modal');
 $('nav a').removeClass('active').filter('[data-page="'+page+'"]').addClass('active');
 $('#nav').removeClass('open'); $('#toggle').attr('aria-expanded','false');
 if(page==='home'){ $('#konten').html(cache.home); inits.home(); document.title=JUDUL_AWAL; window.scrollTo(0,0); return; }
 $('#konten').html('<div class="wrap" style="padding:40px 20px">Memuat...</div>');
 $.ajax({url:url,dataType:'html'})
  .done(function(html){ $('#konten').html(html); inits[page](); window.scrollTo(0,0); document.title='Kopi Senja | '+(page==='menu'?'Menu':'Pesan'); })
  .fail(function(){ $('#konten').html('<div class="wrap" style="padding:40px 20px">Halaman gagal dimuat. Jalankan lewat server lokal (lihat README), bukan dibuka langsung dari file.</div>'); });
}
$(function(){
 cache.home=$('#konten').html(); initHome();
 $(document).on('click','a[data-page]',function(e){
  e.preventDefault();
  window.pilihMenu=($(this).attr('id')==='m-pesan')?$(this).attr('data-pilih'):null;
  muat($(this).data('page'),$(this).attr('href'));
 });
 $(document).on('click','[data-pilih]:not(a)',function(){ window.pilihMenu=$(this).data('pilih'); muat('pesan','pesan.html'); });
 $('#toggle').on('click',function(){ var o=$('#nav').toggleClass('open').hasClass('open'); $(this).attr('aria-expanded',o); });
});
