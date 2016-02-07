var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

// var context = {title: "My New Post", body: "This is my first post!", section1: "Some more ish."};
// var html    = template(context);

// $('#handle').append(html);

function Posts (opts){
  this.title = opts.title;
  this.body = opts.body;
  this.section1 = opts.section1;
}

Posts.all = [];
var postsParse;
var html;
$.ajax({
  type: 'GET',
  url: '/postsdata.json',
  success: function(postsData, textStatus, request){
    var dataToStore = postsData;
    console.log(postsData);
    localStorage.postsData = JSON.stringify(dataToStore);
    console.log(localStorage);
    postsParse = JSON.parse(localStorage.postsData);
    console.log(postsParse);
    Posts.loadAll();
    console.log(Posts.all);
    Posts.loadPosts();
  },
  error: function (request, textStatus, errorThrown) {
    console.log(textStatus);
  }
});


Posts.loadAll = function() {
  Posts.all = postsParse.map(function(ele) {
    return new Posts(ele);
  });
};


Posts.loadPosts = function() {
  Posts.all.forEach(function(a){
    $('#handle').append(a.toHtml());
  });
};


Posts.prototype.toHtml = function() {
  return template(this);
};

// Posts.loadPosts();
