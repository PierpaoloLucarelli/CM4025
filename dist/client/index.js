!function(e){function t(a){if(r[a])return r[a].exports;var i=r[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.WINDOW_WIDTH=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,t.WINDOW_HEIGHT=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,t.WORLD_SIZE={width:1600,height:1200},t.ASSETS_URL="../assets"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isDown=function(e,t){return e.input.keyboard.isDown(t)},t.createText=function(e,t){return e.add.text(t.x,t.y,"",{fontSize:"12px",fill:"#FFF",align:"center"})},t.getCookie=function(e){for(var t=e+"=",r=document.cookie.split(";"),a=0;a<r.length;a++){for(var i=r[a];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return null}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,a){return{socket:a,sprite:(0,i.default)(e,t,r),playerName:null,speed:0,speedText:null,username:(0,n.getCookie)("username"),drive:function(e){var t={W:Phaser.Keyboard.W,S:Phaser.Keyboard.S,A:Phaser.Keyboard.A,D:Phaser.Keyboard.D};0!==this.speed&&this.emitPlayerData(),s(e,t.W)&&this.speed<=u?this.speed+=o:this.speed>=o&&(this.speed-=o),s(e,t.S)&&this.speed>=-400?this.speed-=o:this.speed<=-o&&(this.speed+=o),s(e,t.A)?this.sprite.body.angularVelocity=this.speed/1e3*-10:s(e,t.D)?this.sprite.body.angularVelocity=this.speed/1e3*10:this.sprite.body.angularVelocity=0,this.sprite.body.velocity.x=this.speed*Math.cos(.01745*(this.sprite.body.angle-360)),this.sprite.body.velocity.y=this.speed*Math.sin(.01745*(this.sprite.body.angle-360)),e.world.bringToTop(this.sprite),this.updatePlayerName(),this.updatePlayerStatusText("speed",this.sprite.body.x-57,this.sprite.body.y-39,this.speedText)},emitPlayerData:function(){a.emit("move-player",{x:this.sprite.body.x,y:this.sprite.body.y,angle:this.sprite.body.rotation,playerName:{name:this.playerName.text,x:this.playerName.x,y:this.playerName.y},speed:{value:this.speed,x:this.speedText.x,y:this.speedText.y}})},updatePlayerName:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.username,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.sprite.body.x-57,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.sprite.body.y-59;this.playerName.text=String(e),this.playerName.x=t,this.playerName.y=a,r.world.bringToTop(this.playerName)},updatePlayerStatusText:function(e,t,a,i){var n=e[0].toUpperCase()+e.substring(1);this[e]<0?this.newText=0:this.newText=this[e],i.x=t,i.y=a,i.text=n+": "+parseInt(this.newText),r.world.bringToTop(i)}}};var a=r(7),i=function(e){return e&&e.__esModule?e:{default:e}}(a),n=r(1),s=function(e,t){return e.input.keyboard.isDown(t)},o=40,u=1e3},function(e,t,r){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=r(0),o=r(4),u=function(e){return e&&e.__esModule?e:{default:e}}(o),l=r(1),p=function(e){function t(e){a(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,s.WINDOW_WIDTH,s.WINDOW_HEIGHT,Phaser.AUTO));return r.state.add("Game",u.default),r.state.add("User",e),r.state.start("Game",e),r}return n(t,e),t}(Phaser.Game),d=(0,l.getCookie)("username");$.get("/user/"+d,function(e){new p(e)})},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),u=r(0),l=r(1),p=(a(l),r(5)),d=a(p),y=r(6),c=a(y),f=r(2),h=a(f),m=r(8),x=a(m),b=r(9),g=a(b),_=r(10),v=a(_),T=r(11),O=a(T),P=r(12),w=a(P),N=null,S={},M=function(e){function t(){i(this,t);var e=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.player={},e}return s(t,e),o(t,[{key:"preload",value:function(){this.user=this.state.states.User,(0,d.default)(this.game)}},{key:"create",value:function(){console.log(this.user);var e=u.WORLD_SIZE.width,t=u.WORLD_SIZE.height;(0,c.default)(this.game),N=io("localhost:8000"),this.player=(0,h.default)(Math.random()*e,Math.random()*t/2,this.game,N),this.player.playerName=(0,l.createText)(this.game,this.player.sprite.body),this.player.speedText=(0,l.createText)(this.game,this.player.sprite.body),(0,x.default)(N,this.player),(0,g.default)(N,S,this.game),(0,O.default)(N,this.player),this.game.camera.x=this.player.sprite.x-400,this.game.camera.y=this.player.sprite.y-300,this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL}},{key:"update",value:function(){this.player.drive(this.game);var e=this.player.sprite.x-400,t=this.player.sprite.y-300;this.game.camera.x+=.08*(e-this.game.camera.x),this.game.camera.y+=.08*(t-this.game.camera.y),(0,w.default)(S),this.detectCollisions()}},{key:"detectCollisions",value:function(){var e=this.getCarTip();for(var t in S){var r=S[t].sprite.getBounds();if(e[0]>=r.x&&e[0]<=r.x+r.width&&e[1]>=r.y&&e[1]<=r.y+r.height){var a={id:this.player.socket.id,username:this.player.username};(0,v.default)(N,a,t)}}}},{key:"getCarTip",value:function(){var e=this.player.sprite;return[e.body.x+Math.cos(e.body.rotation*e.width/2),e.body.y+Math.sin(e.body.rotation*e.width/2)]}}]),t}(Phaser.State);t.default=M},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=function(e){e.load.crossOrigin="Anonymous",e.stage.backgroundColor="#1E1E1E",e.load.image("asphalt",a.ASSETS_URL+"/sprites/terrain/terrain.png"),e.load.image("car",a.ASSETS_URL+"/sprites/car/car.png")};t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),i=a.WORLD_SIZE.width,n=a.WORLD_SIZE.height,s=function(e){e.physics.startSystem(Phaser.Physics.P2JS),e.stage.disableVisibilityChange=!0,e.physics.p2.setImpactEvents(!0),e.world.setBounds(0,0,i,n),o(e)},o=function(e){for(var t=[],r=0;r<=i/64+1;r++)for(var a=0;a<=n/64+1;a++){var s=e.add.sprite(64*r,64*a,"asphalt");t.push(s)}};t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,r){var a=r.add.sprite(e,t,"car");return r.physics.p2.enable(a,!1),a};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){e.on("connect",function(){e.emit("new-player",{x:t.sprite.body.x,y:t.sprite.body.y,angle:t.sprite.rotation,playerName:{name:t.playerName.text,x:t.playerName.x,y:t.playerName.y},speed:{value:t.speed,x:t.speed.x,y:t.speed.y}})})};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(2),i=function(e){return e&&e.__esModule?e:{default:e}}(a),n=function(e,t){return e.add.text(t.x,t.y,"",{fontSize:"12px",fill:"#FFF",align:"center"})},s=function(e,t,r){e.on("update-players",function(a){var s={};for(var o in a){var u=a[o];if(void 0===t[o]&&o!==e.id){var l=(0,i.default)(u.x,u.y,r);l.playerName=n(r,l),l.speedText=n(r,l),l.updatePlayerName(u.playerName.name,u.playerName.x,u.playerName.y),t[o]=l}s[o]=!0,o!==e.id&&(t[o].target_x=u.x,t[o].target_y=u.y,t[o].target_rotation=u.angle,t[o].playerName.target_x=u.playerName.x,t[o].playerName.target_y=u.playerName.y,t[o].speedText.target_x=u.speed.x,t[o].speedText.target_y=u.speed.y,t[o].speed=u.speed.value)}for(var p in t)s[p]||(t[p].sprite.destroy(),t[p].playerName.destroy(),t[p].speedText.destroy(),delete t[p])})};t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t,r){e.emit("collision",{win_username:t.username,win_id:t.id,loose_id:r})};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){e.on("death",function(){alert("ded"),t.sprite.destroy(),t.playerName.destroy(),t.speedText.destroy()})};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){for(var t in e){var r=e[t];if(void 0!==r.target_x){r.sprite.body.x+=.3*(r.target_x-r.sprite.body.x),r.sprite.body.y+=.3*(r.target_y-r.sprite.body.y);var a=r.target_rotation,i=(a-r.sprite.body.rotation)/(2*Math.PI);i-=Math.round(i),i*=2*Math.PI,r.sprite.body.rotation+=.3*i,r.playerName.x+=.3*(r.playerName.target_x-r.playerName.x),r.playerName.y+=.3*(r.playerName.target_y-r.playerName.y),r.speedText.x+=.3*(r.speedText.target_x-r.speedText.x),r.speedText.y+=.3*(r.speedText.target_y-r.speedText.y),r.updatePlayerStatusText("speed",r.speedText.x,r.speedText.y,r.speedText)}}};t.default=a}]);