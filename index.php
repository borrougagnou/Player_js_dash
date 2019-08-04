<?php
  Header set X-Content-Type-Options "nosniff";
?>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Filly Movie</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="font-awesome-animation.min.css">
  <style>
	html, body {
		margin:		0px;
		padding:	0px;
		background:	#222;
		color:		#ccc;
		font-family:	arial;
	}
	
	a {
		color:		#82bf56;
		text-decoration:none;
	}

	video {
		width:		100%   !important;
		height:		auto   !important;
		border:		6px solid #101010;
		border-radius:	10px;
		background:	url(offline.jpeg) no-repeat center center;
	}
	.left {
		float:		left;
	}

	#divvid {
		width:		70%;
		margin:		30px;
	}

	#divchat {
		width:		25%;
		padding-top:	15px;
	}

	#chat{
		border:		1px solid #2d2d2d;
		padding:	20px;
		width:		90%;
		height:		85%;
		margin-top:	15px;
		border-radius:	7px;
	}
  </style>
</head>

<body>
  <div>
    <div class="left" id="divvid">
      <video id="videoplayer" data-dashjs-player controls>
	<!--
	 <source src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" type="video/mp4">

         <source src="http://ip:8080/stream.ogg" type="video/ogg">
	-->
	<!--
	 FOR VLC -> Streaming -> choose HTTP ->  add and type "/stream.ogg" -> Profile: Theora + Vorbis (OGG) -> next -> stream
	 useful: https://www.youtube.com/watch?v=yAL_QROXNvg
	-->
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="left" id="divchat">
      <iframe width="99%" height="99%" src="http://163.172.133.140:2086" id="chat"></iframe>
    </div>
  </div>
  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
  <script>
	(function(){
		/*
		var url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
		var player = dashjs.MediaPlayer().create();
		player.initialize(document.querySelector("#videoPlayer"), url, true);
		*/
		const player = dashjs.MediaPlayer().create();
		const video = document.querySelector('video');
		const url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
		player.initialize(video, url, true);
		player.on('streamInitialized', () => {
			const qualities = player.getBitrateInfoListFor('video');
			const qualityIndex = qualities[0].qualityIndex;
			// const qualityIndex = qualities[qualities.length - 1].qualityIndex;
			player.setQualityFor('video', qualityIndex);
			console.log(qualities);
			alert(qualities);
			console.log(qualityIndex);
			alert(qualityIndex);
		});
	})();
  </script>
</body>
