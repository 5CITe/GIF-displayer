const GIPHY_KEY = 'u8IBDJK7KyBPch1HVAdOUm7kuNCxiqKD';
(function () {
  let counter=0;
  $( document ).ready( main() );
  
    function giphySearch(keyword) {
        return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=10`)
        .then(response => response.json());
    }
    function trendSearch(counter){
        return fetch(`http://api.giphy.com/v1/gifs/trending?offset=${counter}&api_key=${GIPHY_KEY}&limit=10`)
        .then(response => response.json());
    }

  
    function appendImage(img) {
      let $div = $('<div class="img-wrapper"></div>');
      $('<div class="inner"></div>').append(img).appendTo($div);
      $('#thumbs').append($div)
    }
  
  
    
    (function listenOnFormSubmit() {
      $('#searchForm').submit((ev) => {
        ev.preventDefault();
        let $input = $('#searchInput');
  
        search($input.val());
      });
    })();

    (function trendOnClick() {
      $('#trendButton').click((ev) => {
        ev.preventDefault();
        counter+=10;
        
  
        main();
      });
    })();
    
  
    async function search(searchKeyword) {
      const result = await giphySearch(searchKeyword)
      $('#thumbs').html('');
      result.data.forEach(data => {
          console.log(result);
          let img=new Image();
          img.src=data.images.original.url;
          appendImage(img);
      });
    }
     async function main(){
      const result = await trendSearch(counter)
      result.data.forEach(data => {
          console.log(result);
          let img=new Image();
          img.src=data.images.original.url;
          appendImage(img);
      });
    }
    
  })();