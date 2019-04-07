window.addEventListener("load", function() {
	loadXML();
});

function loadXML() {
	var x = new XMLHttpRequest();
	x.open("get", "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MLGAR&NumMins=90", true);
	x.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			displayXML(x);
		}
	};
	x.send(null);
}

function displayXML(xml) {
	const doc = xml.responseXML;
	let table = '<tr><th>Due-In</th><th>Destination</th><th>Departure</th><th>Arrival At Destination</th><th>Origin</th></tr>'
	table += "<tr>"

	let duein = doc.getElementsByTagName("Duein");
	table += "<td>" + duein[0].innerHTML + "</td>";

	let destination = doc.getElementsByTagName("Destination");
	table += "<td>" + destination[0].innerHTML + "</td>";
	
	let origintime = doc.getElementsByTagName("Origintime");
	table += "<td>" + origintime[0].innerHTML + "</td>";

	let destinationtime = doc.getElementsByTagName("Destinationtime");
	table += "<td>" + destinationtime[0].innerHTML + "</td>";

	let origin = doc.getElementsByTagName("Origin");
	table += "<td>" + origin[0].innerHTML + "</td>";

	document.getElementById("xml_table").innerHTML = table;
}