function Portal(sites)
{
  this.el = document.createElement("div");
  this.sites = sites;
  
  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    this.install();
    this.el.innerHTML = window.location.hash && window.location.hash.length > 4 ? this.redirect() : this.directory();
  }

  this.readme = function()
  {
    return `<p class='readme'>This webring is an attempt to inspire artists & developers to build their own website and share traffic among each other. The ring welcomes personalized websites such as <b>diaries, wikis & portfolios</b> — To add yourself to the ring, submit a <a href='https://github.com/XXIIVV/webring/edit/master/index.html' target='_blank'>Pull Request</a>.</p>`
  }

  this.buttons = function()
  {
    return `<p class='buttons'><a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }
  
  this.directory = function()
  {
    var html = ""
    
    for(var id in this.sites){
      var site = this.sites[id]
      html += `<ln>${id}) <a href='${site}'>${site.split("//")[1]}</a></ln>`
    }
    return `<list>${html}</list>\n${this.readme()}${this.buttons()}`
  }

  this.reload = function()
  {
    setTimeout(()=>{ window.location.reload() },500)
  }

  this.navigate = function(target)
  {
    setTimeout(() => {
      window.location.href = target
    },3000)
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
    this.navigate(target)
    return `<p>Redirecting to <b>${target}</b></p><meta http-equiv="refresh" content="3; url=${target}">
    <p class='buttons'><a href='#' onClick="portal.reload('')">Directory</a> | <a href='#${target}' onClick="portal.reload('random')">Skip</a> | <a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }
}
