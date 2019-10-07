var sidebar = {}

sidebar = {
   move: function move() {
    var client = document.getElementsByClassName('client')[0];
    var speed = 8;
    var right = 0;
    requestAnimationFrame(sidebar.move)
    client.style.right = right +'px';

    if(right >= 208){
      cancelAnimationFrame(sidebar.move);
      console.log(right)
    }else{
      requestAnimationFrame(sidebar.move);
      right += speed
    }


  }
}

export default sidebar
