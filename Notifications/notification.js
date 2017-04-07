function newNotification(){
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
			var n = new Notification('Title', { 
				body: 'I am the body text!',
				icon: '/path/to/MyVLEprofile.jpg	' // optional
			}); 
		});
	}
}