function Portal(sites)
{
  this.el = document.createElement("div");
  this.sites = sites;
  
  this.install = function()
  {
    document.body.appendChild(this.el)
  }
  
  this.start = function()
  {
    if(window.location.hash){
      this.redirect();
      return;
    }
    
    this.directory();
  }
  
  this.directory = function()
  {
    return "hello"
  }
  
  this.location = function()
  {
    return "hello"
  }
  
  this.locate = function()
  {
    var hash = window.location.hash.replace("#","").trim();
    for(var id in this.sites){
      var site = this.sites[id];
      if(site.indexOf(hash) >-1){
        return parseInt(id)
      }
    }
    return -1
  }
  
  this.next = function(loc)
  {
    return loc == this.sites.length-1 ? this.sites[0] : this.sites[loc+1];
  }
  
  this.redirect = function()
  {
    var location = this.locate();
    var target = this.next(location);
    
    console.log(location,target)
  }
}