---
name: " Uygulama Açıldığında Otomatik Konum Bulma"
about: Kullanıcı deneyimini (UX) önemli ölçüde iyileştirmek için, uygulama ilk açıldığında
  kullanıcının mevcut konumunu otomatik olarak tespit edip ilgili şehrin hava durumunu
  göstermesi hedeflenmektedir.
title: feature, ux
labels: ''
assignees: ''

---

Uygulama ilk yüklendiğinde (useEffect hook'u ile) tarayıcının Geolocation API'ını kullanarak kullanıcıdan konum izni istenmeli.

Kullanıcı izin verirse, enlem (latitude) ve boylam (longitude) koordinatları alınmalı.

Alınan bu koordinatlar, OpenWeatherMap API'ının koordinata göre arama yapan endpoint'ine gönderilerek hava durumu verisi çekilmeli.

Kullanıcı izin vermezse veya konum alınamazsa, uygulama mevcut haliyle (manuel şehir girişi) çalışmaya devam etmeli.

Kabul Kriterleri:

Uygulama açıldığında kullanıcıya konum izni sorulmalıdır.

İzin verildiğinde, kullanıcının bulunduğu yerin hava durumu otomatik olarak ekranda gösterilmelidir.
