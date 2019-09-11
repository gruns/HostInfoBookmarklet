# Host Info Bookmarklet

A simple bookmarklet to lookup information about the host of any page element.

Drag this link to your bookmarks bar:

[Host Info](javascript:void%20function(\){((\)=%3E{async%20function%20a(a\){const%20b=new%20URL(a\).hostname,c=await%20fetch(`https://api.exana.io/dns/${b}/a`\),d=await%20c.json(\);for(let%20b%20of%20d.answer\)if(%22A%22===b.type\){ipv4=b.rdata;break}return%20ipv4||null}async%20function%20b(a\){const%20b=await%20fetch(`https://ipinfo.io/${a}/json`\),c=await%20b.json(\);return%20g(c\),{owner:c.org,hostname:c.hostname,location:c.city%3F`${c.city},%20${c.country}`:`${c.country}`}}function%20c(a,b\){let%20c=null;c=b%3F%22\n%22+`${a}\n`+%22\n%22+`Location:%20${b.location}\n`+`Hostname:%20${b.hostname}\n`+`Owner:%20${b.owner}\n`:%22Failed%20to%20find%20an%20asset.%20Is%20the%20selected%20element%20an%20%3Ciframe%3E%3F%22,alert(c\)}function%20d(a\){let%20b=null;const%20c=a.getElementsByTagName(%22img%22\),e=a.getElementsByTagName(%22video%22\),f=a.currentStyle||window.getComputedStyle(a,!1\);if([%22img%22,%22video%22].includes(a.tagName.toLowerCase(\)\)\)b=a.src;else%20if(0%3Cc.length\)b=c[0].src;else%20if(0%3Ce.length\)b=e[0].src;else%20if(%22backgroundImage%22in%20f%26%26f.backgroundImage\)b=f.backgroundImage.slice(4,-1\).replace(/\%22/g,%22%22\);else%20for(let%20c%20of%20a.children.length\)if(b=d(c\),b\)break;return%20b}function%20e(\){const%20a=document.createElement(%22div%22\);return%20Object.assign(a.style,{top:0,left:0,width:%22100vw%22,height:%22100vh%22,position:%22fixed%22,zIndex:99999999,cursor:%22crosshair%22,opacity:.2,background:%22%23000%22}\),document.body.append(a\),a}function%20f(a\){return%20new%20Promise(b=%3E{a.addEventListener(%22click%22,c=%3E{Object.assign(a.style,{width:0,height:0}\);const%20d=document.elementFromPoint(c.clientX,c.clientY\),e=d.getBoundingClientRect(\);Object.assign(a.style,{width:%22100vw%22,height:%22100vh%22,cursor:%22progress%22}\),setTimeout((\)=%3E{b(d\)}\)}\)}\)}const%20g=console.log;(async(\)=%3E{const%20g=e(\);try{const%20e=await%20f(g\),h=d(e\);let%20i=null;const%20j=await%20a(h\);j%26%26(i=await%20b(j\)\),c(h,i\)}catch(a\){throw%20alert(a\),a}finally{g.parentNode.removeChild(g\)}}\)(\)}\)(\)}(\);)