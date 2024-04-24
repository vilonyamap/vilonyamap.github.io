/* script.js */

document.addEventListener('DOMContentLoaded', function() {
    // DOM hazır olduğunda çalışacak kodlar buraya gelecek
    console.log('DOM yüklendi!');
});

var pages = document.getElementsByClassName('page');
  for(var i = 0; i < pages.length; i++)
    {
      var page = pages[i];
      if (i % 2 === 0)
        {
          page.style.zIndex = (pages.length - i);
        }
    }

  document.addEventListener('DOMContentLoaded', function(){
    for(var i = 0; i < pages.length; i++)
      {
        //Or var page = pages[i];
        pages[i].pageNum = i + 1;
        pages[i].onclick=function()
          {
            if (this.pageNum % 2 === 0)
              {
                this.classList.remove('flipped');
                this.previousElementSibling.classList.remove('flipped');
              }
            else
              {
                this.classList.add('flipped');
                this.nextElementSibling.classList.add('flipped');
              }
           }
        }
  })
  
  
  // Not Ekleme Butonu
const addNoteBtn = document.getElementById('addNoteBtn');

// Not Ekleme Penceresi
const noteModal = document.getElementById('noteModal');
const closeBtn = document.getElementsByClassName('close')[0];
const noteTextarea = document.getElementById('noteTextarea');
const saveNoteBtn = document.getElementById('saveNoteBtn');

// Not Ekleme Butonuna Tıklama Olayı
addNoteBtn.addEventListener('click', function() {
    noteModal.style.display = 'block'; // Pencereyi göster
});

// Kapatma Butonuna Tıklama Olayı
closeBtn.addEventListener('click', function() {
    noteModal.style.display = 'none'; // Pencereyi gizle
});

// Kaydet Butonuna Tıklama Olayı
saveNoteBtn.addEventListener('click', function() {
    const noteText = noteTextarea.value.trim(); // Boşlukları kaldır
    if (noteText !== '') {
        const newPage = document.createElement('div');
        newPage.className = 'page';
        newPage.innerHTML = `<p>${noteText}</p>`;
        document.getElementById('pages').appendChild(newPage); // Kitap sayfasına notu ekle
        noteModal.style.display = 'none'; // Pencereyi gizle
        saveNoteToFile(noteText); // Notu dosyaya kaydet
    } else {
        alert('Lütfen bir not girin.');
    }
});

// Notu dosyaya kaydetme fonksiyonu
function saveNoteToFile(noteText) {
    // AJAX kullanarak notu dosyaya kaydetme işlemi gerçekleştirilecek
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'notes.txt', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Not dosyaya başarıyla kaydedildi!');
        }
    };
    xhr.send(`note=${encodeURIComponent(noteText)}`);
}
// Firebase Firestore'a yazma işlemi için referans alınması
const db = firebase.firestore();

// Veritabanına yeni bir belge (document) ekleme
function addNote() {
    // Eklenecek veri
    const noteData = {
        title: "Test Notu",
        content: "Bu bir test notudur."
    };

    // Veritabanına ekleme işlemi
    db.collection("notes").add(noteData)
        .then((docRef) => {
            console.log("Not başarıyla eklendi:", docRef.id);
        })
        .catch((error) => {
            console.error("Not eklenirken hata oluştu:", error);
        });
}

// Test için not ekleme işlemini çağırma
addNote();
