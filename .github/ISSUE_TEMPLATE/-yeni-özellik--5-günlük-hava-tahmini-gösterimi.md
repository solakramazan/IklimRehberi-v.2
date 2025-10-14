---
name: "[Yeni Özellik] 5 Günlük Hava Tahmini Gösterimi"
about: Uygulamanın işlevselliğini artırmak amacıyla, anlık hava durumu bilgilerinin
  yanı sıra gelecek 5 güne ait hava tahminlerinin de gösterilmesi planlanmaktadır.
title: feature, ui
labels: ''
assignees: ''

---

OpenWeatherMap API'ının 5 günlük tahmin verisi sağlayan endpoint'i araştırılmalı ve kullanılmalı.

Mevcut API isteği, bu yeni endpoint'ten veri çekecek şekilde güncellenmeli veya ek bir istek yapılmalı.

Gelen 5 günlük veri (her gün için sıcaklık, hava durumu ikonu vb.) işlenerek useState içerisinde saklanmalı.

Arayüzde, anlık hava durumu kartının altında, her bir günü temsil eden küçük kartlardan oluşan yeni bir bölüm tasarlanmalı ve bu bölümde tahmin verileri gösterilmeli.

Kabul Kriterleri:

Başarılı bir aramadan sonra, gelecek 5 günün hava tahmini (tarih, sıcaklık, ikon) ekranda listelenmelidir.

Arayüz, bu yeni bilgiyi gösterecek şekilde temiz ve anlaşılır olmalıdır.
