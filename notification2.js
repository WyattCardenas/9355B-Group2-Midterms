function notifyMe() {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }
  else if (Notification.permission === "granted") {
    notify();
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        notify();
      }
    });
  }
  
  function notify() {
    var notification = new Notification('TITLE OF NOTIFICATION', {
      icon: 'http://www.thereviewsarein.com/wp-content/uploads/2014/11/LA-Lakers-Logo.png',
      body: "Lakers notification <3",
    });

    notification.onclick = function () {
      window.open("http://myclass.myvirtuallearning.org/");      
    };
    setTimeout(notification.close.bind(notification), 7000); 
  }

}
notifyMe();