import dogs from './dogs.json';

const dogsList = [];

dogs.forEach(obj => {
  dogsList.push(obj);
})

const copyDogsList = Array.from(dogsList);

const dogsListEletkor = copyDogsList.sort((a, b) => {
  if (a.eletkor !== b.eletkor) {
    return a.eletkor - b.eletkor;
  }
  
  return a.nev.localeCompare(b.nev);
});

console.table(dogsList);
console.table(dogsListEletkor);
console.log("-----------------------------");

const labradorSortString = copyDogsList.filter(dog => dog.fajta === "Labrador").map(dog => `${dog.nev}(${dog.eletkor} éves)`);
console.table(labradorSortString);

const labradorSortObject = copyDogsList.filter(dog => dog.fajta === "Labrador").map(dog => ({
  nev: dog.nev,
  eletkor: dog.eletkor
}));

console.table(labradorSortObject);

console.log("-----------------------------");

const idosGazdik = copyDogsList.filter(dog => dog.eletkor > 10).map(dog => dog.gazda_neve);
console.table(idosGazdik);

console.log("-----------------------------");

const fajtakLista = copyDogsList.reduce((fajta, dog) => {
  fajta[dog.fajta] = (fajta[dog.fajta] || 0) + 1;
  return fajta;
},{});

console.table(fajtakLista);

console.log("-----------------------------");

console.log(copyDogsList.reduce((sum, dog) => sum + dog.eletkor, 0) / copyDogsList.length);

console.log("-----------------------------");

const originalBody = document.getElementById('originalBody');
const tablazatHead = document.getElementById('tablazatHead');
const tablazatBody = document.getElementById('tablazatBody');
const cimLabel = document.getElementById('cimLabel');
const listaCim = document.getElementById('listaCim');
const elsoB = document.getElementById('1/b');
const elsoAGomb = document.getElementById('elsoAGomb');
const elsoBGomb = document.getElementById('elsoBGomb');
const elsoB2Gomb = document.getElementById('elsoB2Gomb');
const elsoCGomb = document.getElementById('elsoCGomb');
const elsoDGomb = document.getElementById('elsoDGomb');
const elsoEGomb = document.getElementById('elsoEGomb');

document.addEventListener("DOMContentLoaded", () => {

  dogsList.forEach(dog => {
    originalBody.innerHTML += `
      <tr>
        <td>${dog.id}</td>
        <td>${dog.nev}</td>
        <td>${dog.eletkor}</td>
        <td>${dog.fajta}</td>
        <td>${dog.gazda_neve}</td>
  `
  });

});

elsoAGomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";

  cimLabel.innerHTML = "Életkor szerint rendezve a kutyák";
  tablazatHead.innerHTML += `
      <tr>
        <th>Id</th>
        <th>Név</th>
        <th>Életkor</th>
        <th>Fajta</th>
        <th>Gazda neve</th>
      </tr>
    `

  dogsListEletkor.forEach(dog => {
    
    tablazatBody.innerHTML += `
      <tr>
        <td>${dog.id}</td>
        <td>${dog.nev}</td>
        <td>${dog.eletkor}</td>
        <td>${dog.fajta}</td>
        <td>${dog.gazda_neve}</td>
      </tr>
  `
  });
})

elsoBGomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";
  cimLabel.innerHTML = "";

  listaCim.innerHTML = "Labrador kutyák csak stringként listában";

  labradorSortString.forEach(dog => {
    
    elsoB.innerHTML += `
      <li>${dog}</li>
  `
  });
})

elsoB2Gomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";

  cimLabel.innerHTML = "Labrador kutyák csak névvel és életkorral";
  tablazatHead.innerHTML += `
      <tr>
        <th>Név</th>
        <th>Életkor</th>
      </tr>
    `

  labradorSortObject.forEach(dog => {
    
    tablazatBody.innerHTML += `
      <tr>
        <td>${dog.nev}</td>
        <td>${dog.eletkor}</td>
      </tr>
  `
  });
})

elsoCGomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";

  cimLabel.innerHTML = "10-nél idősebb kutyák gazdáinak nevei";
  tablazatHead.innerHTML += `
      <tr>
        <th>Gazda neve</th>
      </tr>
    `

  idosGazdik.forEach(dog => {
    
    tablazatBody.innerHTML += `
      <tr>
        <td>${dog}</td>
      </tr>
  `
  });
})

elsoDGomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";

  cimLabel.innerHTML = "Fajták csoportosítva és megszámolva";
  tablazatHead.innerHTML += `
      <tr>
        <th>Fajta</th>
        <th>Darab</th>
      </tr>
    `

  Object.entries(fajtakLista).forEach((value) => {
    
    tablazatBody.innerHTML += `
      <tr>
        <td>${value[0]}</td>
        <td>${value[1]}</td>
      </tr>
    `
  });
})

elsoEGomb.addEventListener('click', () => {
  tablazatHead.innerHTML = "";
  tablazatBody.innerHTML = "";
  listaCim.innerHTML = "";
  elsoB.innerHTML = "";

  cimLabel.innerHTML = "A kutyák átlag életkora";
  tablazatHead.innerHTML += `
      <tr>
        <th>Átlag életkor</th>
      </tr>
    `

    tablazatBody.innerHTML += `
      <tr>
        <td>${copyDogsList.reduce((sum, dog) => sum + dog.eletkor, 0) / copyDogsList.length}</td>
      </tr>
    `
});