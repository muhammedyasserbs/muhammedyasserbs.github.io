/* ============================================================
   ملف الكيس استادي المشترك — تعدّل هنا بس وكل الصفحات بتتحدث لوحدها
   ------------------------------------------------------------
   عشان تضيف كيس استادي جديد:
   1) اعمل نسخة من صفحة case-study-oils-store.html وسمّيها باسم المشروع
   2) ضيف عنصر جديد في أول القايمة دي (الأحدث دايمًا فوق)
   والباقي أوتوماتيك: الرئيسية بتعرض آخر 4، وصفحة الكيس استادي بتعرض الكل
   ============================================================ */

const CASES = [
       {
        url: "case-study-appliances-store.html",
        img: "https://i.postimg.cc/1RKfCvMc/case-appliances-cover.webp",
        alt: "متجر أجهزة منزلية وكهربائية إلكتروني في السعودية",
        tag: "منصة سلة · اجهزة منزلية",
        tagBg: "rgba(6,182,212,0.2)",
        tagColor: "#06B6D4",
        flag: "sa",
        title: "متجر أجهزة منزلية وكهربائية سعودي",
        desc: "بدأت مع المتجر من نقطة كان فيها البحث العضوي ضعيف؛ وركزت على الفهرسة وصفحات المنتجات والكلمات الشرائية.",
        result: "42.8 ألف ريال مبيعات من البحث العضوي و+544% نمو في الجلسات خلال شهرين",
        highlights: [
            { value: "42.8 ألف ريال", label: "مبيعات عضوية" },
            { value: "+544%", label: "نمو عضوي" }
        ],
        period: "أول شهرين مقارنة"
    },
    {
        url: "case-study-oils-store.html",
        img: "https://i.postimg.cc/6Qbw7xqq/xm374Xf-Wx-H32i-Qg-H6x-SF1f-Wb-C8Ns9GHrmadk-YDu-AQ3Y.webp",
        alt: "متجر زيوت طبيعية وعطارة إلكتروني في السعودية",
        tag: "منصة سلة · زيوت طبيعية",
        tagBg: "rgba(93,202,124,0.2)",
        tagColor: "#5DCA7C",
        flag: "sa",
        title: "متجر زيوت طبيعية وعطارة سعودي",
        desc: "المتجر كان خارج من نقل دومين وإعادة بناء هوية؛ فركزت على استعادة الظهور وتنظيم الصفحات والكلمات القريبة من الشراء.",
        result: "+106 ألف ريال مبيعات من البحث العضوي و+501% نمو في الزيارات خلال 6 شهور",
        highlights: [
            { value: "+106 ألف ريال", label: "مبيعات من البحث العضوي" },
            { value: "+501%", label: "نمو الزيارات" }
        ],
        period: "خلال 6 شهور"
    }
 /* مثال لإضافة كيس جديد — انسخ الكتلة دي وعدّلها وحطها فوق:
    ,{
        url: "case-study-XXXX.html",
        img: "لينك الصورة",
        alt: "وصف الصورة",
        tag: "متجر زد",
        flag: "sa",   // كود الدولة: sa السعودية / ae الإمارات / kw الكويت / qa قطر / bh البحرين / om عمان / ye اليمن
                      //            eg مصر / jo الأردن / iq العراق / sy سوريا / lb لبنان / ps فلسطين
                      //            ly ليبيا / sd السودان / ma المغرب / dz الجزائر / tn تونس / mr موريتانيا / so الصومال / dj جيبوتي / km جزر القمر
                      //            سيبها "" لو مش عايز علم
        tagBg: "rgba(6,182,212,0.2)",
        tagColor: "#06B6D4",
        title: "عنوان الكيس استادي",
        desc: "وصف قصير سطرين",
        result: "+250% النتيجة الرئيسية"
    }
    */
];

/* أعلام كل الدول الخليجية والعربية (data-uri) — حط كود الدولة في خاصية flag بتاعة أي كيس */
const FLAGS = {
    sa: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAVFBMVEUAVDAeaEh2o4+KsJ8OXTs5el4IWTZ+qZZAf2QWYkFLhmxXjncnbk9tnYgvc1ZFgmhglH5QinG/1Muxy7+jwbSYuqyRtaYDVjOErZvg6ubT4dv7/PwhsBJvAAABnUlEQVQYGe3BSW7dMBAFwMex2ZxHifq+/z2DLLIzEDrIUlV4vV6vczYi3iJqNgxjNWe+G8qwQmYho42arZBR45hpNdaZ9vZ0e5+qS25Ib8RkR5raDJOHKBdOacMDhlJZJhhQiYJwmX5DxUgIRu+NjShxysBXWCmbEqloFa0ZKK4qUGaVnctxgqwmnDIsyRf5WesmpfLYe/URqycSuKqpxfZK2144dXdfR4LrAuSCCE3cRlujzafkS2gp7RW6dRdO2V4lxMzbJDJZKjPYm7ieKNetLAhQmIEvHMuSea/nqeqh7l1VJufdyddwpczUorr3ihdO5eRl025L1gsRmDm1ZW7bgi8UPCFKljw3TomkC2xy1SOB7nZh9t4/X0+rOlkeVgdb2Uuccm3QnGFlxQ2lTy1Ji74cEEoDbXJVBwuPUzxkyeoSkLr1yaa3PC7GnRA+tmhXqFQjlsAx1wcxAgsf9HhGDFasT2s5+bKSkRoiyKTxUw5/WAAi4rcItni9Xn9jA/5Npe+pDxF5/By77z001dcX/h8PAWHwer1eP/ILL3kYDinfdx8AAAAASUVORK5CYII=",   // السعودية
    ae: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoBAMAAACbTmAyAAAAElBMVEUAAAAAhD3////IEC6r1r+qqqqRmeBQAAAALUlEQVQ4y2MwhgNBvIBhVOFIVOiCFyApVMILRhUOJ4WheAGSQgb8YFThiFEIAL/lq1Xv0RoWAAAAAElFTkSuQmCC",   // الإمارات
    kw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoBAMAAACbTmAyAAAAJFBMVEUAAAAAej3OESb///+r07/vr7YAIxE7BAoAbTa5DiGBChcATCXRWgzTAAAAgElEQVQ4y+3OMQ2AMBQG4TdBUiYs/BawgAU8YKEjFpBQBzgkKZQy9d1MuPkbztaRZXZQ2G0Q2kChrRSizQzJZoZk84Jg84b+ZoHuZoHu5gO9zQptbvaCU7MffgkuzaqLava4IAb7HcIkBqMYDGLQHSwwicEoBoMYJIMZJjEYmdMJzhK90NmrvocAAAAASUVORK5CYII=",   // الكويت
    qa: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAfBAMAAACCMVcnAAAAMFBMVEX///+KFTiePFnevcfWrLj69ff37/G9eo6VK0u3boTDhZj16u706e2rWHGQIULHj58tUpMHAAAAVElEQVQ4y2NgQABWc0VBnIABBfA4EaeQzbORKIVshYKC1DWRaDcS7WtW+3vEBg+DEXEKg4uIM5FtEbHBw7BlBnUVEm81sZ4ZDR7qBA/R6XE0X2MAAJ40SYYXdLuPAAAAAElFTkSuQmCC",   // قطر
    bh: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAwCAMAAACxOw3FAAAAP1BMVEX////xrKf97+7hU0nbLyL519ToeHDaKRz/+fjfRDnztbDdNyv75eP2x8TsjYfvnpjncGjjXlTqgnrtlo/kZFvumEqSAAAAxUlEQVRIx72Xaw7DIAyDA2W8+m65/1mrTftZZVL20RzACsSOHZGbeh1jspbcV3YDC2hvU5TKdWcB321uLOC8BRDQr4X8Q0NzCqA/C8pDlxJM7GkZYaXYpaJxMAZYKSbi/FCKRBRwWsgOc23kUMzE4faWBlgLrRSZY6AtwK8DrRSbVHRaGxT9KCD7ZHgoMG1wYuPSw5fD9+GNVgq8YHtYAGxSrI3CRk9HET4s0XGOD5w9InGH0P4ZN6oU+PBhTzP4ePznvL0ACjpJoujwlI8AAAAASUVORK5CYII=",   // البحرين
    om: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAuBAMAAABNF4MvAAAAMFBMVEXfGiMAfjz////nVFqnMynqZmyUOyvtf4TzqKveIyvkPEThLDXwj5TrcHb3wsT84+QXNuhyAAAAkElEQVQ4y2NgQAZBSjgBWH4nEHNvIELhYoblE6YSYyLvAmaGW8Qo5Dw9fXIBMQoZImzsFhClcEdFKVG+XlF6LuI7UQqrzoceJsrqe/8DiLKaYV3zY6IUcvcwzCAqeOYUMHCXE6GQtQtEdBNWOHcCiFxLjGdgYLMxTsAwCkYBlcAUF5wAVWGiIE4wqnBUIfkKAYl3gSkztzPhAAAAAElFTkSuQmCC",   // عُمان
    ye: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAAD1BMVEXOESYAAAD///9AQEDaTFxBpdq5AAAAK0lEQVRIx2NgGAWjYCgCFyIBgxKRYFThqMJBpdCYSMAgSCQYVTiqcDApBACrHpoRBVZ+DQAAAABJRU5ErkJggg==",   // اليمن
    eg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAAMFBMVEX////OESYAAADaTFxAQEDUtE3z6cz9+/Xv4bj279r79+zhyoPPqzjavmfp16PBlAL2ZYIMAAAArklEQVRIx2MQJBIwjCocVTiYFBoTCRiwgOwHDMSBsnKilLEzlGUxFBChMH3VtMxVZUQYGF0+LbN8K2Ej2UPv7cp+G0qMwujv+VuJVXiVKIUx13OPEqPwaGxXxtUYYhTGZbQ9JUIh19Fr2dtyYxYQVMh5dmZq2Mw7EwgqZIvsyDnWMZWwQq4VLzo6+roIW80w83Vfx76ZRCQKzrSMtjQsNrsQCRiUiASjCkcVDiaFAG630XiA705LAAAAAElFTkSuQmCC",   // مصر
    jo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAMAAABevo0zAAAANlBMVEXOESbaS1uaDBwzXze/v7+/3c7zw8gAej3///8AAACaKyszBAnQOkrVkJf75+nhbnrql6DidIGSBFcwAAAApElEQVRIx7XTwQ7CIBAA0VEri0pb/f+f9WIM1dZEmM59X7Jh4Xi7qAEuCTIJMgkyCTIJMgkyCTIJMgkyCTIJMsl2ZRwa4leHlP8OZBJkcjkskNXgPE+PfrIey3nqX7waSjnnuwmS0oi5MoWiPsoOZ7P7Yctfrwznhja56ymakrkNsJ1bBXu4FbCP+wJ7uQ+wn1uABleBDvcGLe4FelyEzEXIXMQTxLVK4ZTNiYkAAAAASUVORK5CYII=",   // الأردن
    iq: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAOVBMVEUAAAC/3s5ss49BnW7ZTFsBAQECez3////NESVAQEApkFzw+PS02MYZiFCDv6Hg7+jQ59uby7PJ49bXZjfsAAAAwUlEQVRYw+3UwRKDIAxFUUgqtAlJ0P//2KI4jluVVZu7wGFz5rExvAcXHHTQQQcd7OBrcCEP7jdAPo5W5dPlHmhU26nab8u8lIrlAWgC6wegr43MVOkBaNKn7WCbOj8CTeb1ncuxsMADkK17JaWygwp4E7QmYWnUGqJuIJPA3YXcFCHcEwXBnOckIpQqkV5/MqZzCilxA7cqJby+UDSWeGQWI2frF15ivAwqZKt/+3O4Bn4GF6YwtMlBBx100MEOfgHqnVW/ET3jKgAAAABJRU5ErkJggg==",   // العراق
    sy: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAALVBMVEX///8Aej0AAADOESZAm21AQEDXPU7ojZf64+b31tr98/TqmaLeYW/tp6/ke4eNSid0AAAAi0lEQVRIx2MQJBIwjCocVTiYFLoQCRhoCDgn4GMhAfYCfCwkwJaAj4UEJlvgYyGBYnN8LBjgNQaDC9hZyKANJJaBi4UMHhsb2+FmIXva2DgBNwsJNBsbW+BmIYHN5sXWuFlIIG0CZxpuFgJwnGJgWLMAFwsJcIGIBbhYJIFQIgGDEpFgVOGowsGkEADVYM8oztYKiwAAAABJRU5ErkJggg==",   // سوريا
    lb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAP1BMVEX////TFiQAjD70xcg6pmoim1e54MpUsXzg8ejv+PJnu4wKkEWi1biPzKoVlU3F5dN+xZ11wZb6/fu8uKjiwL5o3ErxAAABLElEQVRYw+3Wy07EMAyF4fDXdu6Xlnn/Z2UxMwxISFQkK9Szrj7FiZvYvS2Ou8ALvMD/AW7n8n7yu82di2FuZSrkvtDrAoCuWmUcPDKWeKHtoE2VXOIC74gV9aZakDYWiIeS7F5xDRbmN1BAIakHfFzASd0LtCYlZtps80QLyaTxyjhmF+lfmBj7SHNiSEBOIg9XZa51Ek0EoNW7KCITRUef0x6LftnCZDMVhxrcN63QkKmSuwdUQACGlyBImLq2AC2idm+dLLsrPkx0dYkKCvlZdi4TR5K66x7VJ+UzQAoTh6JoccejY5w7upl56l/BkYa9tlI+H5gWlvx9suxJedyGOSzyat5jDxnkWMLtqTvnnKVop873t4nhc2S4bdvNn5gcrnHuAi/wAn/KB/YcE9r6VdGmAAAAAElFTkSuQmCC",   // لبنان
    ps: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAMAAABevo0zAAAAQlBMVEUAljnrTlWXUziUHCOr3L6qqqrlLjcAAADtLjj///8nhDgpCAnFPzhVcDjDJS5YERXzeoH83N7++Pj4sra1lJW2vqenz0V2AAAAqUlEQVRIx83Uaw6CMBBF4dtBZXyLyP63SnwhpfKHOTHeBXzJSaZVVbOTn/Yw6JszDLpXNEhmP0Ew+wVy2QNIZX9AKHsEMtkZSGTnIJA9AePZBejpto6sBN3bbWDfQL9cYdBTA4OB7DlwcfYsuDT7dyCd3P732dCHDT+91K0iK0BTcJMP9igUPOyEgiaRIJCbgUTuGDSJBKHcAaRy36BJJAjmPkAy9z5jOfXVcEVXexLjfgAAAABJRU5ErkJggg==",   // فلسطين
    ly: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAMAAABevo0zAAAAM1BMVEUAAACUlJShoaHU1NQKCgq1tbVHR0fnABMjnkb+/v4oKCjAwMCEhITo6OgVFRVcXFzu7u75/VnvAAAAaklEQVRIx+3TSw7AIAgEUESgRe3n/qetie0NZlENs3L1MgagDRwKMMAlwcissXxUNpzXPAmRGJ2gfs7jUbSzAFD9bSbOmgDgUQd3qXuWP4J6fwroy+YJOxT42vRqnLWVOPBps4MTYIBLgg8OLjDM5nxhtwAAAABJRU5ErkJggg==",   // ليبيا
    sd: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAMAAABevo0zAAAAPFBMVEXSEDQAUh0Ebiihxq6/v7/0w8w8VSsAAAD///8AcikqiEsNeDPV6NytITIAEwYAKA6DNC/3+vhdpXfJtK+w9OFnAAAAqklEQVRIx73UUQ6CMBBFUaZoxwcqqPvfqwaN2BJ+Oje+BZzkZgpd7uApX2BQaYZBpQyDQrMXkMzWZ5kGsWytm2mQubZ+R2QXIHFtVcs0mIbHMbINqDT2p8C24Gv3GwxqOMOg2rN3wPbsXbA1+38gnEwfhX428MOmP72xP0RWg8k8tvoHOzkK2tVR0NxJMJ5bgkBuAZo7CTK5KwjlfkFzJ0Eu9w2CuQtozu4JAZNEJ3ifkIYAAAAASUVORK5CYII=",   // السودان
    ma: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAAIVBMVEXBJy0FYDIxUjG2KSxgRC8ZWjF1PS5FTDCMNi2jLy1WRy8rLUoOAAAAyklEQVQYGe3BsW6CUBSA4V9pUDYiciVOeNvGdAPdnLRx6IqJ0ZH7BrZJwypJu5O+QdMXLfEBOGdy4vvo9TS8DB2/RGeYopNH6DiDzvIDFS+pMzT8cFCiMbyMUgTBvrV7ep3uWw0dXGxtYW1sbWHoEixKKqjwJw2dHibrBNx6sUXwfYog/zwj8d5TWM0yRHncBEWIrP4x7iVBVvE7Z4nMjI/Hq0M0jnaPq2l+RTI6GHDPFySDuIGgCJHUf7Q2CZI3br6QZNx49Hr39w+fRBxMPesapgAAAABJRU5ErkJggg==",   // المغرب
    dz: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAUVBMVEUAZjNJSDOfJDPGFDP+9PbgV3EvUjL////SEDTrkqJiPTOuHjPwrrrXKUl2NTP2ztX41tzzv8kYWzKMKzPUGTv86ezmd4zupLLohZftnq3aPVrdjsInAAAA+UlEQVRYw+2W2w6DIAyGQUHl6Pm093/QqTDGki0xthdLpHe9+VLo378l5GSUJ4MkYAIm4H2ABbU9n0SDA+ykqnyYhcGBNK+iMBoKzDwpW/RYsmY1Agb0PFWEpqwCArQHLpdxl1lzHVi4+iiabFx7ZazDGgJ0BapY2EJAgPb9YELaXYJ1BQI6BfqkHbgeDQjYOQG+Znk6UgjQfWEfzOGxp1ud7CqQHkAbgLUfmmH+lwq//uEM7nKO12V8HaJPijcvvFn+5Tbsuh9K54f0ww81xLF7vwC6AKw5Q9kpapqbzaw15yNw60nkrYe/l8PlwLEuh3TOJWAC3hL4BGQ8QncErwHBAAAAAElFTkSuQmCC",   // الجزائر
    tn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAASFBMVEXnABPuQ1H+7u/2mJ/rJTX/9/f//Pz////vVmPoChzsNkT95uj6xsr70NP5trvydX/4r7T83d/xZnH3pavzgYr1jpbpEyT0ho8+XwW+AAABRUlEQVQYGe3BN2KEMABFwa/4JEROe/+bWrAuXAuXzOj1er2amd2No9uN/sV5WH7ZI+upPFn+KKse+nAJvXN94LLriTxTzZ1u3Uw1Z7XbgbDq4tO0dmsAJjXrIvRelV+4xGmA6NWqh9ipWgOR2xhhVKMEfFQlYJi5LUBSmx6GLOm0wJAXbgV6NckBJlUj1aAuhi0tBAhq4oEkyXMZJC85bl4tDOAlGaA4o8rw1alFArKkRJj0tfCV1MIAnSQPFGdUGb6MWnhgVRWoBslLjptXi2zBqeqpBnUxbGmhsllNZrCnJBOBIRduATa1WYFN1QoMM7cCrGqTC2BUpULkEmegZDVKQMmqzi0AsTcFSGrmgLDq1k0pTwE49MBG1XvdfE+16ZGdKi7jcYxLpProoWT5wyY9dh6WX/bI+hdmd+PodqPX6/Vq9QN8fBBgzdwxhQAAAABJRU5ErkJggg==",   // تونس
    mr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAAKlBMVEUAqVzQHB9nYz3/1wABqFtFtkNmvDclsE6Rwyfa0A3v1AbJzRMSrFWzyRs/5rqIAAABDElEQVRIx2MQJBIwjCqks0IlIgGDAwNRgGWoKmQvIFIhRwN+hXBzOCfAzcaqMAFCHQ1NNguNgbDZsCqEWsi22NjYCqqJA6vCVihdaWw8HcqMwKowE+YwY2OYc6dhVXgYZrfVYpjNNlgV8ppBPb29egOElXwBq8KjxgFguoyBIR3MYIUKYAT45qWogRxljSNmgo1RooTD2BSHQl5jS4RdDKyTjS/gUMgz2dgWrpL1srHlAVyJosrY2BLiD4ayycbGy3GmHnZg7BmvbUsNy7gFZFgV4E5mp42RwB486ZGnGaHOAm/CZd0MU2cdgD+Fw1RaBzgQyAo8ETsXW81uPTBcCgDsCokuH0frmUGqEAAE/n6evkSO2wAAAABJRU5ErkJggg==",   // موريتانيا
    so: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1BAMAAAAkBnF3AAAAIVBMVEVBj97///+gx+9sqObu9f2u0PFZneLc6/qKuutPl+DK4PYgwzZnAAAAoklEQVQYGe3BsQ7BUBQG4D+uqvWvFqPeGIzXaFODuX0DTSQSUy1mvILNG/Qt3TRi7DmDwXC/D0HwU8ZBJyqhM9xCZz2BTpVBp0ihYkgHjYgsIXlYa5fkzlq7Qp8zv1r0yvmRoJ8p2EkdBC92Woju9OaQxfQayGp6U8hyeglkF2YVZxCNmN7GBQ+QDHgFTlxAEifw8gaSo4Nn9pBs0HkiCP7YG9+TElg+FrJjAAAAAElFTkSuQmCC",   // الصومال
    dj: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA1CAMAAADh9px2AAAAclBMVEX////x+PoesTXePUI+r4j6/fzJ7NFqsucSrSvXFBoyuEhxtul8vOr63d7l9ujh7/q22vOP2Jujz/GMw+z+9vas4rVKwV5py3nS6PjxqavncHTK4/brh4rC3/V80orkYWXsjpHZIyj40NH1wcLtlJbrio2p/9o0AAABQ0lEQVRYw63T21aDMBCF4U0RnFBoVbAK9qy+/yt6gSyFDITMzL7pVb5F/wDey0fTAThtjUEkL8YgkNTGIGCWcgCRPW1tQauU+L99bQxapJyA+pTwpkwJZqqUYKdIyYOKlJibNCXmJ0uJpX2UxqAkJQKLTongIlP6QKtL6YNppUrpHa7ctyqld/TqUv5rrIVg6lzF386pjASbzv2NKYlkTcrRic/b4B0z9iHzh+DGB5pL/3h3/iU/byg4746dc+7Ieq8rOA+89k/I/duCSACmLr13zD3v3ogkYOUuDdDevibxnjckA9v+Q666cbyCSAg2k18AyA9EYtDf+nirwJh4a8CoeGEwMl4IjI63DGbx8RZBSbwFUBZvFpTGmwHl8XhQEY8DVfF8UBlvCqrjTcC8ILIDs92ByBBMzkSGoFW8ATSL97sfwadg92g2yqMAAAAASUVORK5CYII=",   // جيبوتي
    km: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAwCAMAAACxOw3FAAAAYFBMVEUAljkhpFMKmkAvql0APaW14cYan0T////vM0D/0QBKtHLj9Ol6yJf2+/hdvIEAc2OX1a6o3LtAsWrM6tfOQD/cyAcASZYAiUcgiDl0ZjyoUD1GeDsAV4SzvxB8sh1LpyiqBuDeAAABbElEQVRIx63V6XqCMBSE4SELkwphs5td6P3fZX+QICn61IRzLuDVz0HFz8uT6AGYpUHU38IgINiNcLM0KNaN68l0Y3uzNCjRjT93uBu7m6XBg91bSU+TrgHg1LD4Vq0aPUnb1QCgWn8UbElyUIAOvj0EKkvSdwBg6/AShd2LdybZaAC1ZXNa37UvBQeSXJzubK8rlXQDgCbJ4FSotsPndwPASNJHR6cPZfbeAJQnOUZhHaWwG8CJJNvwLdmOUtQdH8GoJKOgYO+4scLNUfK7I7h+cvqWh/cP9+DF5OnuKABwcS4D7P4b5fPZZYEVSQ53R3m8NoKwJH19Z5SLc9mg5ubJ1uW1K5g8idtRMmuvoBpv/nxdnCsEw8fYJaPk125BdM3yFxBHKalNQKi2If3YqfLaFFz+Rietymt3YLi3L3Pg9l5vjCTYvxpJ8FjtHuyNkQQP16agQG0C9sZIgjK1KyhVG8HeSJ5krTHGmF/TW1lUSfWwjgAAAABJRU5ErkJggg=="   // جزر القمر
};

const RESULT_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform:scaleX(-1)"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

/* limit = 0 يعرض الكل، أي رقم تاني يعرض آخر X */
function renderCases(containerId, limit) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    const list = limit > 0 ? CASES.slice(0, limit) : CASES;
    grid.innerHTML = list.map((c, i) => {
        const highlights = Array.isArray(c.highlights) && c.highlights.length
            ? c.highlights
            : [{ value: c.result, label: 'النتيجة الرئيسية' }];
        const metrics = highlights.map(metric => `
            <span class="portfolio-result-metric">
                <b>${metric.value}</b>
                <small>${metric.label}</small>
            </span>`).join('');
        const period = c.period ? `<span class="portfolio-result-period">${c.period}</span>` : '';

        return `
        <a href="${c.url}" class="portfolio-card fade-up visible" style="transition-delay:${(i * 0.1).toFixed(1)}s;position:relative;overflow:visible;">
            ${c.flag && FLAGS[c.flag] ? `<span class="card-flag" style="position:absolute;top:-16px;right:-14px;z-index:5;width:58px;height:58px;border-radius:50%;overflow:hidden;border:2px solid rgba(59,130,246,0.35);background:#0F172A;box-shadow:0 4px 14px rgba(0,0,0,0.45);display:block;"><img src="${FLAGS[c.flag]}" alt="علم الدولة" style="width:100%;height:100%;object-fit:cover;display:block;"></span>` : ``}
            <div class="portfolio-thumb" style="border-radius:16px 16px 0 0;">
                <img src="${c.img}" alt="${c.alt}" loading="lazy">
                <div class="portfolio-overlay"><span class="portfolio-tag" style="background:${c.tagBg};color:${c.tagColor};">${c.tag}</span></div>
            </div>
            <div class="portfolio-body">
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <div class="portfolio-result" role="group" aria-label="أبرز نتيجة: ${c.result}">
                    <span class="portfolio-result-kicker"><span class="portfolio-result-icon" aria-hidden="true">${RESULT_SVG}</span>أبرز نتيجة</span>
                    <span class="portfolio-result-metrics">${metrics}</span>
                    ${period}
                </div>
                <span class="card-more">اقرأ تفاصيل الحالة ${ARROW_SVG}</span>
            </div>
        </a>`;
    }).join("");
}
