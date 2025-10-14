---
name: "[UI İyileştirmesi] Arama Sırasında Yükleme Animasyonu Ekle"
about: Arama işlemi sırasında arayüzde bir geri bildirim olmaması, uygulamanın yavaş
  bağlantılarda donmuş gibi görünmesine neden oluyor.
title: enhancement, ui
labels: ''
assignees: ''

---

Arama işlemi başladığında (handleSearch fonksiyonu tetiklendiğinde) aktif hale gelecek bir loading state'i (useState ile) eklenmeli.

loading durumu true olduğunda, hava durumu kartı veya hata mesajı yerine basit bir yükleme animasyonu (spinner) gösterilmeli.

API'den cevap geldiğinde (başarılı ya da hatalı), loading durumu tekrar false yapılarak animasyon kaldırılmalı ve sonuç gösterilmeli.

Kabul Kriterleri:

Kullanıcı "Ara" butonuna bastığı andan itibaren veri ekrana gelene kadar bir yükleme animasyonu görmelidir.

Bu özellik, hem başarılı sonuçlarda hem de hata durumlarında doğru çalışmalıdır.
