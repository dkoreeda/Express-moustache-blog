console.log('script loaded');

$(document).ready(function(){


    const getData = (accessData) => {
        $.ajax({
           method: 'GET',
           url: accessData,
           success: function(data) {
              for (let i = 0; i < data.packages.length; i++) {
                handleResponse(data.packages[i]);
              }
              console.log(data);
           }
        });
    }

    // $('button').click(function(){
    //   if ($(this).hasClass('packageById')) {
    //       getData('/api/packages/:id');
    //   } else {
    //       getData('/api/packages/');
    //   }
    // });

    $('.inputID').click(function(){
      // console.log('hi');
      const package = $('input').val();
      console.log(package);
      $.ajax({
         method: 'GET',
         url: '/api/packages/' + package,
         success: function(data) {
            console.log('hi', data);
            handleResponse(data);
         }
      });
    });

    const appendPackage = (name, category, img) => {
      const div = $('<div>');
      const pName = $('<p class="name">');
      const pCateg = $('<p class="category">');
      const Image = $('<img>');

      pName.text(name);
      pCateg.text(category);
      Image.attr('src', img);

      div.append(pName);
      div.append(pCateg);
      div.append(Image);
      $('body').append(div);
    }

    const handleResponse = (data) => {
      const packageName = data.name;
      const packageCategory = data.category;
      const packageImg = data.img;
      appendPackage(packageName, packageCategory, packageImg)

    }

//     const data = (url) => {
//       if ($(this).hasClass('packageById')){
//         url = '/api/packages/';
//       } else {
//         url = '/api/packages/:id';
//       }
//     }
});
