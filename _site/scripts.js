// https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743
(function() {
  var youtube = document.querySelectorAll( ".youtube-video" );

  for (var i = 0; i < youtube.length; i++) {
    // thumbnail image source.
    // var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg"; 
    var source = "/images/youtube-placeholder.jpg"; 

    // Load the image asynchronously
    var image = new Image();
    image.src = source;
    image.addEventListener( "load", function() {
        youtube[ i ].appendChild( image );
    }( i ) );

    youtube[i].addEventListener( "click", function() {

      var iframe = document.createElement( "iframe" );
  
          iframe.setAttribute( "frameborder", "0" );
          iframe.setAttribute( "allowfullscreen", "" );
          iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
  
          this.innerHTML = "";
          this.appendChild( iframe );
    } );
  }
})();

fetch(window.location.origin+"/api.json")
.then(res => res.json())
.then(out => {
  window.posts = out
})

function selectRandom() {

  if (window.posts) {
    window.location.href = window.location.origin + window.posts[Math.floor(Math.random()*window.posts.length)].url;
  } else {
    fetch(window.location.origin+"/api.json")
    .then(res => res.json())
    .then((out) => {
      var randomURL = out[Math.floor(Math.random()*out.length)];
      window.location.href = window.location.origin + randomURL.url;
    })
    .catch(err => { throw err });
  }
}
