function Portal(sites)
{
  this.el = document.createElement("pre");
  this.sites = sites;
  
  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    this.install();
    this.el.innerHTML = window.location.hash ? this.redirect() : this.directory();
  }
  
  this.directory = function()
  {
    var html = ""
    
    for(id in this.sites){
      var site = this.sites[id]
      html += `${id}) <a href='${site}'>${site}</a>\n`
    }
    html += `\n<a href='#random' onClick="window.location.reload()">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a>`
  
    return html
  }
  
  this.location = function()
  {
    return window.location.hash.replace("#","").trim();
  }
  
  this.locate = function()
  {
    var hash = this.location();
    
    if(hash == "random"){
      return Math.floor(Math.random()*this.sites.length)
    }
    
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

    var html = ""
    
    html = `Redirecting to ${target}
    <meta http-equiv="refresh" content="30; url=${target}">
<a href='' onClick="window.location.reload()">Directory</a> | <a href='#${target}' onClick="window.location.reload()">Skip</a> | <a href='#random' onClick="window.location.reload()">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a>`
    return html
  }
}