const api='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c355b54828379ffd70496e45d1fd90a8&page=';
const imgMovie='https://image.tmdb.org/t/p/w1280';
const search='https://api.themoviedb.org/3/search/movie?api_key=c355b54828379ffd70496e45d1fd90a8&query="';
const form=document.getElementById('form');
const input=document.getElementById('search');
const main=document.getElementById('main')
const next=document.getElementById('next');
const prev=document.getElementById('prev');
const num=document.getElementById('num')
let i=1;
getMovie(api);

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const words=input.value;
  if(words && words!=="") {
      getMovie(search + words);
  words.value="";
  }
  else
      window.location.reload();

})

next.addEventListener('click',()=>{
prev.removeAttribute('disabled')
    i++
    let temp=api+i
    getMovie(temp)
    console.log(temp)
})

prev.addEventListener('click',()=>{
    if(i==1)
        prev.setAttribute('disabled','disabled')
    i--
        let temp=api+i
    getMovie(temp)
    console.log(temp)
})

function showMovies(movies){

    num.innerText=i;
    if(i==1)
        prev.setAttribute('disabled','disabled')
    main.innerHTML="";
    movies.forEach((item)=>{

        const {title,vote_average,poster_path,overview}=item
    const movie=document.createElement('div');
        movie.classList.add('movie');
        movie.innerHTML=`  <img src="${imgMovie+poster_path}">

        <div class="movie-info">

            <h3>${title}</h3>
            <span class="${setRate(vote_average)}">
           ${vote_average}
        </span>
        </div>
        <div class="overview">
            <h3>overView</h3>
        ${overview}
        </div>`
        main.append(movie)

    })
}

function setRate(rate){
    if(rate>8)
        return 'green'
    else if(rate>=5)
        return 'orang'
    else return 'red'
}
async function getMovie(url){
    const res= await fetch(url);
    const data=await res.json()
 showMovies(data.results)
}



