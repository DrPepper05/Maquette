/* Shared "photo render" helper for the project landing pages.
 * Averages N renders with a jittered camera aperture (true bokeh depth of field)
 * and a jittered key light (soft shadows), then adds film grain.
 *
 * usage: PhotoStill.render({renderer, scene, camera, focus:Vector3, aperture:.12,
 *          light:DirectionalLight, lightJitter:1.5, samples:48, grain:.035, vignette:.25, onDone:fn})
 * The result is drawn onto a 2D canvas that replaces the WebGL canvas in the DOM.
 */
(function(){
  window.PhotoStill={render:function(o){
    var R=o.renderer,S=o.scene,C=o.camera,W=R.domElement.width,H=R.domElement.height;
    var acc=document.createElement('canvas');acc.width=W;acc.height=H;
    var g=acc.getContext('2d');
    acc.style.cssText=R.domElement.style.cssText||'';
    acc.className=R.domElement.className;acc.id=R.domElement.id+'2d';
    R.domElement.parentNode.insertBefore(acc,R.domElement.nextSibling);
    R.domElement.style.display='none';
    var N=o.samples||48,k=0,basePos=C.position.clone(),baseLight=o.light?o.light.position.clone():null;
    var fwd=new THREE.Vector3().subVectors(o.focus,basePos).normalize();
    var right=new THREE.Vector3().crossVectors(fwd,new THREE.Vector3(0,1,0)).normalize();
    var up=new THREE.Vector3().crossVectors(right,fwd).normalize();
    function ring(i){ // golden-angle disc sampling
      var r=Math.sqrt((i+.5)/N),a=i*2.399963;return [r*Math.cos(a),r*Math.sin(a)];}
    function step(){
      var d=ring(k),ap=o.aperture||.1;
      C.position.copy(basePos).addScaledVector(right,d[0]*ap).addScaledVector(up,d[1]*ap);
      C.lookAt(o.focus);
      if(o.light){var j=o.lightJitter||1;o.light.position.copy(baseLight).add(new THREE.Vector3(d[1]*j,d[0]*j*.5,-d[0]*j))}
      R.render(S,C);
      g.globalAlpha=1/(k+1);g.drawImage(R.domElement,0,0);
      k++;
      if(k<N){requestAnimationFrame(step)}else{finish()}
    }
    function finish(){
      g.globalAlpha=1;
      if(o.bloom){ // soft highlight glow ("pro-mist" look): blur a contrast-boosted copy and screen it back
        var cp=document.createElement('canvas');cp.width=W;cp.height=H;var cg=cp.getContext('2d');cg.drawImage(acc,0,0);
        g.save();g.globalCompositeOperation='screen';g.globalAlpha=o.bloom.amount||.3;g.filter='blur('+(o.bloom.radius||26)+'px) contrast(1.8) brightness(.85)';g.drawImage(cp,0,0);g.restore();
      }
      var gr=o.grain==null?.035:o.grain;
      if(gr>0){
        var im=g.getImageData(0,0,W,H),d=im.data,s=1337;
        for(var i=0;i<d.length;i+=4){s=(s*1664525+1013904223)>>>0;var n=((s>>>16)/65535-.5)*255*gr*2;
          d[i]+=n;d[i+1]+=n;d[i+2]+=n}
        g.putImageData(im,0,0);
      }
      var v=o.vignette==null?.25:o.vignette;
      if(v>0){var rg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);
        rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(1,'rgba(0,0,0,'+v+')');g.fillStyle=rg;g.fillRect(0,0,W,H)}
      window.__done=true;if(o.onDone)o.onDone(acc);
    }
    step();
  }};
})();
