import React, { useState, useEffect, useRef } from "react";
import "materialize-css/dist/css/materialize.min.css";
import styled from "styled-components";
import Navbar from "./../Components/Navbar";
import io from "socket.io-client";
import Peer from "simple-peer";

const VideoContainer = styled.div`
	margin: 50px auto;
`;
const ButtonContainer = styled.div`
	margin: 10px auto;
`;

const RemoteVideo = styled.video`
	transform: rotateY(180deg);
	border: 1px solid #cddfe7;
	margin: 10px;
	width: 100%;
	height: 100%;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`;

const LocalVideo = styled.video`
	transform: rotateY(180deg);
	margin: 10px;

	position: absolute;
	border: 1px solid #cddfe7;
	/* bottom: 60px; */
	/* right: 40px; */
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
`;

function VideoCall() {
	const socket = useRef();
	const [myId, setMyId] = useState("");
	const [isCounsellor, setIsCounsellor] = useState(false);
	const [stream, setStream] = useState();
	const [showVideo, setshowVideo] = useState(false);
	const [caller, setCaller] = useState("");
	const [counsellorId, setCounsellorId] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const userVideo = useRef();
	const incomingVideo = useRef();

	useEffect(() => {
		socket.current = io.connect("http://localhost:3000");
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then(stream => {
				setStream(stream);
				console.log(stream.getAudioTracks());
				if (userVideo.current) {
					userVideo.current.srcObject = stream;
					stream.getVideoTracks()[0].enabled = showVideo;
					stream.getAudioTracks()[0].enabled = true;
				}
			})
			.catch(ex => {
				alert("permissions denied");
				console.log(ex);
			});
		socket.current.on("myDetails", ({ socketId, counsellor }) => {
			setMyId(socketId);
			// console.log("isCounsellor", counsellor);
			if (counsellor) {
				setshowVideo(true);
				// flipVideo();
			}
		});

		socket.current.on("counsellor", id => {
			console.log(id);
			setCounsellorId(id);
		});

		socket.current.on("incoming", data => {
			console.log("incoming");

			setCaller(data.from);
			setCallerSignal(data.signal);
			console.log("receving call");
		});
	}, []);

	function flipVideo() {
		stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
	}
	function call(id) {
		console.log("called");

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", data => {
			socket.current.emit("callUser", { userToCall: id, signalData: data, from: myId });
		});

		peer.on("stream", stream => {
			if (incomingVideo.current) {
				console.log(stream);
				incomingVideo.current.srcObject = stream;
			}
		});

		socket.current.on("callAccepted", signal => {
			peer.signal(signal);
		});
	}

	function acceptCall() {
		console.log("acceptcall");
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", data => {
			socket.current.emit("acceptCall", { signal: data, to: caller });
		});

		peer.on("stream", stream => {
			incomingVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
	}
	return (
		<React.Fragment>
			<Navbar />
			<div className="row">
				<VideoContainer className="container row">
					<RemoteVideo playsInline ref={incomingVideo} id="remote-video" autoPlay className="col s10 no-padding" />;
					{stream && <LocalVideo playsInline muted ref={userVideo} id="local-video" autoPlay className="col s2 " style={{ padding: "0px" }} />}
				</VideoContainer>
			</div>

			<div className="row">
				<ButtonContainer className="container">
					<button
						className="waves-effect waves-light btn"
						onClick={() => {
							acceptCall(counsellorId);
						}}
					>
						accept
					</button>

					<button
						className="waves-effect waves-light btn"
						onClick={() => {
							call(counsellorId);
						}}
					>
						call
					</button>
					<button
						className="waves-effect waves-light btn"
						onClick={() => {
							console.log(stream.getVideoTracks()[0]);
							flipVideo();
						}}
					>
						show video
					</button>
					<button
						className="waves-effect waves-light btn"
						onClick={() => {
							console.log(stream.getAudioTracks()[0]);

							stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
						}}
					>
						mute
					</button>
					<button
						className="waves-effect waves-light btn"
						onClick={() => {
							socket.current.disconnect();
						}}
					>
						disconnect
					</button>
				</ButtonContainer>
			</div>
		</React.Fragment>
	);
}
export default VideoCall;
